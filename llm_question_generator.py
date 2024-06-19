'''
this file target is to generate questions to the quiz
'''

import json
import random
import os

class LLMQuestionGenerator:
    def __init__(self, oracle, topics, data_handler, json_file_path):
        self.oracle = oracle
        self.topics = topics
        self.data_handler = data_handler
        self.json_file_path = json_file_path

    def generate_questions_for_topic(self, topic):
        generated_questions = []
        generate_prompt = (
            "Given a passage generate multiple choice question based on this passage"
            " and write the correct answer\n passage: {0} . Give your response in this format:"
            " first line is the question, all four lines right after it is the four possible answers"
            " and the fifth line is the right answer. do no give title to any of the lines; give numerical index to only the four possible answers"
        )

        passages = self.data_handler.get_all_passages_by_topic(topic)

        for _ in range(10):  # Generate 10 questions per topic
            passage = random.choice(passages)
            response = self.oracle.query_llm(generate_prompt, [passage])
            question = self.parse_response(response)
            generated_questions.append(question)

        return generated_questions

    def generate_and_save_questions(self):
        # if os.path.exists("precomputed_quiz_questions.json"):
        #     return
        all_questions = {}

        for topic in self.topics:
            questions = self.generate_questions_for_topic(topic)
            all_questions[topic] = questions

        # Save all the generated questions to a JSON file
        with open(self.json_file_path, 'w') as file:
            json.dump(all_questions, file, indent=2)

    def parse_response(self, response):
        # Split the response into lines
        question_with_answers = {}
        lines = [line.strip() for line in response.split('\n') if line.strip()]

        # Extracting the question
        question_with_answers["question"] = lines[0]

        # Extracting the answer choices
        question_with_answers["possible answers"] = lines[1:5]

        # Extracting the correct answer
        question_with_answers["correct answer"] = lines[-1]

        return question_with_answers


### 2. Script to generate and save questions using LLMQuestionGenerator:


if __name__ == '__main__':
    from llm_oracle import LLMOracle
    from data_handler import DataHandler

    oracle = LLMOracle()
    data_handler = DataHandler(r"C:\Users\rafi1\OneDrive\מסמכים\graduation_project\quiz_app_NILI\tagged_results.json")
    topics = data_handler.get_all_topics()

    questions_file = "precomputed_quiz_questions.json"
    question_generator = LLMQuestionGenerator(oracle, topics, data_handler, questions_file)

    question_generator.generate_and_save_questions()
    print(f"Questions have been generated and saved to {questions_file}")

'''
this file target is the creation, management, and interaction of
quiz sessions for users based on precomputed quiz questions stored in a JSON file
'''
from llm_oracle import LLMOracle
from data_handler import DataHandler
import random
import json

class UserSession:
    def __init__(self, precomputed_questions_file):
        with open(precomputed_questions_file, 'r') as file:
            self.precomputed_questions = json.load(file)

    def get_precomputed_question(self, topic):
        questions = self.precomputed_questions.get(topic, [])
        if questions:
            return random.choice(questions)
        else:
            raise ValueError(f"No precomputed questions found for topic: {topic}")


    def separated_question_from_answers(self, whole_question):
        question = whole_question.get("question")
        possible_answers = whole_question.get("possible answers")
        correct_answer = whole_question.get("correct answer")
        return question, possible_answers, correct_answer

    # Check if the user answered correctly

    def check_user_answer(self, correct_answer, user_answer):
        return correct_answer.strip().lower() == user_answer.strip().lower()

    # print the whole question to the user and get his answer, print if the user answered correctly
    def quiz_to_user(self, whole_question):
        question, possible_answers, correct_answer = self.separated_question_from_answers(whole_question)

        print(question)
        for answer in possible_answers:
            print(answer)

        user_answer = input("Your answer: ").strip()
        if self.check_user_answer(correct_answer, user_answer) is True:
            print("Correct!")
        else:
            print(f"Wrong.The correct answer was: {correct_answer}")

# if __name__ == '__main__':
#
#     precomputed_questions_file = "precomputed_quiz_questions.json"
#     user_session = UserSession(precomputed_questions_file)
#     data_handler = DataHandler(r"C:\Users\rafi1\OneDrive\מסמכים\graduation_project\quiz_app_NILI\tagged_results.json")
#     topics = data_handler.get_all_topics()
#     while True:
#         print("Available topics:")
#         for i, topic in enumerate(topics, start=1):
#             print(f"{i}. {topic}")
#
#         topic_choice = int(input("Enter the number of your choice: ")) - 1
#         chosen_topic = topics[topic_choice]
#
#         question = user_session.get_precomputed_question(chosen_topic)
#
#         user_session.quiz_to_user(question)
#
#         response = input("Do you want to continue? (yes/no): ").strip().lower()
#         if response != 'yes':
#             print("See you next time!")
#             break

from llm_oracle import LLMOracle
from data_handler import DataHandler
import random


class UserSession:
    def __init__(self, oracle: LLMOracle, data_handler: DataHandler):
        self.oracle = oracle
        self.data_handler = data_handler

    # the oracle generate question to to user based on a paragraph
    def genreate_question_by_topic(self, topic):
        generate_prompt = "Given a passage generate multiple choice question based on this passage" \
                          " and write the correct answer\n passage: {0} . Give your response in this format:" \
                          " first line is the question, all four lines right after it is the four possible answers" \
                          " and the fifth line is the right answer. do no give title to any of the lines, give numerial index to only the four possible answers"

        passages = self.data_handler.get_all_passages_by_topic(topic)
        passage = random.choice(passages)
        response = self.oracle.query_llm(generate_prompt, [passage])
        # return the respons in format of dict, question, list of possible answers and the right one
        return self.parse_response(response)

    # return a dict of the whole question
    def parse_response(self, response):
        # Split the response into lines
        question_with_answers = {}
        possible_answers = []
        # lines = response.strip().split('\n')
        lines = [line.strip() for line in response.split('\n') if line.strip()]

        # Extracting the question
        question_with_answers["question"] = lines[0]

        # Extracting the answer choices
        question_with_answers["possible answers"] = lines[1:5]

        # Extracting the correct answer
        question_with_answers["correct_answer"] = lines[-1]

        return question_with_answers

    def separated_question_from_answers(self, whole_question):
        question = whole_question.get("question")
        possible_answers = whole_question.get("possible answers")
        correct_answer = whole_question.get("correct_answer")
        return question, possible_answers, correct_answer

    # using the oracle to check if the user answered correctly
    def check_user_answer(self, whole_question, user_answer):
        list_arg_llm = []
        list_arg_llm.append(user_answer)
        list_arg_llm.append(whole_question.get("correct_answer"))
        result = self.oracle.query_llm(
            "compare these two answers, return yes if they mean the same thing, otherwise return no. Do not include any additional text: {0} {1} ",
            list_arg_llm)
        normalized_result = result.split()[-1].strip().lower()
        if normalized_result == "yes":
            return True
        else:
            return False

    # print the whole question to the user and get his answer, print if the user answered correctly
    def quiz_to_user(self, whole_question):
        question = whole_question.get("question")
        possible_answers = whole_question.get("possible answers")

        print(question)
        for answer in possible_answers:
            print(answer)

        user_answer = input("Your answer: ").strip()
        if self.check_user_answer(whole_question, user_answer) is True:
            print("Correct!")
        else:
            print("Wrong.")

# if __name__ == '__main__':
#
#     oracle = LLMOracle()
#     data_handler = DataHandler(r"C:\Users\rafi1\OneDrive\מסמכים\graduation_project\quiz_app_NILI\tagged_results.json")
#     user_session = UserSession(oracle, data_handler)
#     topics = data_handler.get_all_topics()
#     data_handler.list_to_json_file(topics, 'topics.json')
#     # Format the list of topics into a string for display to the user
#     topics_str = "\n".join(f"{index + 1}. {topic}" for index, topic in enumerate(topics))
#
#     while True:
#
#         topic_choice = input(
#             f"Here is the list of topics, choose one:\n{topics_str}\nEnter the number of your choice: ")
#         topic_index = int(topic_choice) - 1
#         chosen_topic = topics[topic_index]
#         question = user_session.genreate_question_by_topic(chosen_topic)
#         user_session.quiz_to_user(question)
#
#         # Ask the user if they want to continue
#         response = input("Do you want to continue? (yes/no): ").strip().lower()
#         if response != 'yes':
#             print("see you next time!")
#             break

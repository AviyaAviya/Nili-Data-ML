import os
import json
from utils.llm_oracle import LLMOracle
import random
class DataHandler:
    def __init__(self, data_jsonl_filename):
        self.data_jsonl_filename = data_jsonl_filename
        self._check_file_existence()

    def _check_file_existence(self):
        if not os.path.exists(self.data_jsonl_filename):
            raise FileNotFoundError(f"The file {self.data_jsonl_filename} does not exist.")

    def _read_jsonl_into_list_of_dicts(self):
        with open(self.data_jsonl_filename, 'r') as file:
            data_list = [json.loads(line) for line in file]
        return data_list

    def _get_dict_by_key_value(self, dict_list, key, value):
        for d in dict_list:
            if d.get(key) == value:
                return d
        return None


    def get_all_passages_by_topic(self, topic):
        data_list = self._read_jsonl_into_list_of_dicts()
        result = []
        for dict in data_list:
            if topic in dict["topics"]:
                result.append(dict["text"])
        return result

    def get_all_pasages_by_url(self,url):
        data_list = self._read_jsonl_into_list_of_dicts()
        result = []
        for dict in data_list:
            if url == dict["url"]:
                result.append(dict["text"])
        return result

    def get_all_topics(self):
        data_list = self._read_jsonl_into_list_of_dicts()
        topics_set = set()  # Use a set to collect unique topics
        for d in data_list:
            topics_set.update(d.get("topics", []))  # Add all topics from the current passage
        return list(topics_set)

class UserSession:
    def __init__(self, oracle:LLMOracle, data_handler:DataHandler):
        self.oracle = oracle
        self.data_handler = data_handler

    def genreate_question_by_topic(self, topic):
        generate_prompt = "Given a passage generate multiple choice question based on this passage" \
                          " and write the correct answer\n passage: {0} . Give your response in this format:" \
                          " first line is the question, all four lines right after it is the four possible answers" \
                          " and the fifth line is the right answer. do no give title to any of the lines, give numerial index to only the four possible answers"


        passages = self.data_handler.get_all_passages_by_topic(topic)
        passage= random.choice(passages)
        response = self.oracle.query_llm(generate_prompt,[passage])
        return self.parse_response(response)

    def parse_response(self,response):
        # Split the response into lines
        question_with_answers = []
        possible_answers =[]
        #lines = response.strip().split('\n')
        lines = [line.strip() for line in response.split('\n') if line.strip()]

        # Extracting the question
        question = lines[0]

        # Extracting the answer choices
        for line in lines[1:5]:
            possible_answers.append(line)

        # Extracting the correct answer
        correct_answer = lines[-1]
        question_with_answers.append({
            "question": question,
            "possible answers": possible_answers,
            "correct_answer": correct_answer
        })
        return question_with_answers

    def quiz_to_user(self,whole_question):
        question = whole_question[0].get("question")
        possible_answers = whole_question[0].get("possible answers")

        print(question)
        for answer in possible_answers:
            print(answer)

        user_answer = input("Your answer: ").strip()
        list_arg_llm= []
        list_arg_llm.append(user_answer)
        list_arg_llm.append(whole_question[0].get("correct_answer"))
        result = self.oracle.query_llm("compar this two answers, return yes if they are the same meaning, otherwise return no: {0} {1}",list_arg_llm)
        #if user_answer == whole_question[0].get("correct_answer").strip():
        if result == "yes":
            print("Correct!")
        else:
            print("Wrong.")


if __name__== '__main__':

   oracle = LLMOracle()
   data_handler = DataHandler(r"C:\Users\rafi1\OneDrive\מסמכים\graduation_project\Nili-Data-ML\tagged_results.jsonl")
   user_session = UserSession(oracle,data_handler)
   #answer= user_session.genreate_question_by_topic("Israel's Diplomatic Response")
   #user_session.quiz_to_user(answer)
   #print(answer)
   topics = data_handler.get_all_topics()
   # Format the list of topics into a string for display to the user
   topics_str = "\n".join(f"{index + 1}. {topic}" for index, topic in enumerate(topics))

   while True:

       topic_choice = input(
           f"Here is the list of topics, choose one:\n{topics_str}\nEnter the number of your choice: ")
       topic_index = int(topic_choice) - 1
       chosen_topic = topics[topic_index]
       answer = user_session.genreate_question_by_topic(chosen_topic)
       user_session.quiz_to_user(answer)

       # Ask the user if they want to continue
       response = input("Do you want to continue? (yes/no): ").strip().lower()
       if response != 'yes':
           print("see you next time!")
           break
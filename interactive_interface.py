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


if __name__== '__main__':

   oracle = LLMOracle()
   data_handler = DataHandler(r"C:\Users\rafi1\OneDrive\מסמכים\graduation_project\Nili-Data-ML\tagged_results.jsonl")
   user_session = UserSession(oracle,data_handler)
   answer= user_session.genreate_question_by_topic("Israel's Diplomatic Response")
   print(answer)
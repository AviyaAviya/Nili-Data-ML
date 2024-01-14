from langchain.embeddings import OpenAIEmbeddings
from langchain.chat_models import ChatOpenAI, ChatAnthropic

from langchain.prompts import PromptTemplate
from langchain.schema import HumanMessage
import os
api_key = os.getenv("OPENAI_API_KEY")
import json


class LLMOracle:
    def __init__(self, chat_model_name="gpt-3.5-turbo", temperature=.5):
        self.chat_model_name = chat_model_name
        self.temperature = temperature

    def query_llm(self, template_fstring, arguments_list=[]):
        formatted_string = template_fstring.format(*arguments_list)
        llm = ChatOpenAI(model=self.chat_model_name, temperature=self.temperature, request_timeout=120)
        user_prompt = PromptTemplate.from_template("# Input\n{text}")
        human_message = HumanMessage(content=user_prompt.format(text=formatted_string))
        answer = llm([human_message])

        return answer.content

    def embed_text(self, text):
        embeddings = OpenAIEmbeddings(openai_api_key=api_key, request_timeout=120)
        query_result = embeddings.embed_query(text)
        return query_result

class DataReader:
    def __init__(self, json_file_name):
        self.json_file_name = json_file_name
        self.data = []
        self.read_json_file()


    def read_json_file(self):
        try:
            with open(self.json_file_name, 'r') as file:
                # Load JSON data from the file
                data = json.load(file)

                # Assuming the JSON file contains a list of dictionaries
                if isinstance(data, list):
                    self.data = data
                else:
                    print("Invalid JSON format. Expected a list of dictionaries.")
        except FileNotFoundError:
            print(f"File '{self.json_file_name}' not found.")
        except json.JSONDecodeError:
            print(f"Error decoding JSON in file '{self.json_file_name}'.")

    def get_all_passages(self):
        passages = []
        for item in self.data:
            # Assuming 'passage' is the key containing list of passages separated by commas
            if 'passages' in item:
                passages.extend(item['passages'])

        return passages

    def get_all_urls(self):
        urls = []
        for item in self.data:
            # Assuming 'url' is the key containing the URL
            if 'url' in item:
                urls.append(item['url'])

        return urls

    def get_passage_url_tuples(self):
        passages_urls = []
        for item in self.data:
            # Assuming 'url' is the key containing the URL
            if 'url' in item:
                url = item['url']
                # Assuming 'passage' is the key containing passages separated by commas
                if 'passages' in item:
                    # Create tuples of (passage, url) and add them to the list
                    passages_urls.extend([(passage, url) for passage in item['passages']])

        return passages_urls




if __name__ == '__main__':
    #oracle = LLMOracle()
    #answer = oracle.query_llm("whats up?")
    #print(api_key)
    #print(answer)
    data_reader = DataReader("content_for_ques.json")
    all_urls = data_reader.get_all_urls()
    all_passages = data_reader.get_all_passages()
    passage_url_tuples = data_reader.get_passage_url_tuples()
    print("lalala")


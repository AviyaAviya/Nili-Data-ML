from langchain.embeddings import OpenAIEmbeddings
from langchain.chat_models import ChatOpenAI, ChatAnthropic

from langchain.prompts import PromptTemplate
from langchain.schema import HumanMessage
import os
import json
api_key = os.getenv("OPENAI_API_KEY")
import re
import random
import csv
import json
from tqdm import tqdm
from utils.llm_oracle import LLMOracle
#
# class LLMOracle:
#     def __init__(self, chat_model_name="gpt-3.5-turbo", temperature=.5):
#         self.chat_model_name = chat_model_name
#         self.temperature = temperature
#
#     def query_llm(self, template_fstring, arguments_list=[]):
#         formatted_string = template_fstring.format(*arguments_list)
#         llm = ChatOpenAI(model=self.chat_model_name, temperature=self.temperature, request_timeout=120)
#         user_prompt = PromptTemplate.from_template("# Input\n{text}")
#         human_message = HumanMessage(content=user_prompt.format(text=formatted_string))
#         answer = llm([human_message])
#
#         return answer.content
#
#     def embed_text(self, text):
#         embeddings = OpenAIEmbeddings(openai_api_key=api_key, request_timeout=120)
#         query_result = embeddings.embed_query(text)
#         return query_result





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

class TopicTagger:

    infer_topics_template = (
        "You are expert specializing in the history of the middleEast and Israel, you are an ardent Zionist , and a great lover of the "
        "the state of israel. Given the following topics list, and the following text output the topics that are relevant to the text."
        " Output only a list of the relevent topics, dont output abything else\n"
        "Topics:{0}\n "
        "Text: {1} "
    )


    def __init__(self, data_reader: DataReader, oracle: LLMOracle, possible_topic_list):
        self.data_reader = data_reader
        self.oracle = oracle
        self.topics = possible_topic_list

    def _extract_text_to_list(self, text):
        # Split the text into lines
        lines = text.split('\n')

        # Remove any empty lines
        lines = [line.strip() for line in lines if line.strip()]

        # Check if lines are numbered or not
        if re.match(r'^\d+\.', lines[0]):
            # Extract numbered items
            items = [re.sub(r'^\d+\.\s*', '', line) for line in lines]
        else:
            # Extract non-numbered items
            items = [line.lstrip('- ').lstrip() for line in lines]

        return items

    def _get_inferred_topics(self, template, segment_text):
        answer = self.oracle.query_llm(template, [segment_text])
        # answer = answer.lstrip('- ').lstrip()
        # return [topic.strip() for topic in answer.split("\n-")]
        answer = self._extract_text_to_list(answer)
        return answer





    def _concatenate_strings(self, input_data):
        if isinstance(input_data, list):
            concatenated_string = ' '.join(input_data)
        elif isinstance(input_data, str):
            concatenated_string = input_data
        else:
            # Handle other cases or raise an exception as needed
            raise ValueError("Input must be a list of strings or a single string")

        return concatenated_string


    def tag_passage(self, passage_text):
        all_topics = "\n".join(self.topics)
        answer = self.oracle.query_llm(self.infer_topics_template,[all_topics,passage_text])
        answer = answer.replace("Relevant topics:", "")
        answer = answer.replace("Relevant Topics:", "")
        topics_list = self._extract_text_to_list(answer)
        return topics_list

    def tag_passages(self):
        counter =0
        result_list = []
        url_passages_tuple = self.data_reader.get_passage_url_tuples()
        for passage,url in url_passages_tuple:
            if counter>=100:
                break
            counter +=1
            topics = self.tag_passage(passage)
            result_list.append({"text":passage,"url":url,"topics":topics})
        return result_list





    def get_random_topic(self, list_of_topics):
        return random.choice(topics)






    def get_paragraphs_by_topic(self, result_list, target_topic):
        matching_paragraphs = []
        for entry in result_list:
            text = entry.get("text", "")
            topics = entry.get("topics", [])

            if target_topic in topics:
                matching_paragraphs.append({"text": text})

        return matching_paragraphs

def save_result_to_jsonl(result, output_file):
    # Check if the file already exists
    file_exists = os.path.exists(output_file)

    # Open the file in append mode if it exists, otherwise in write mode
    with open(output_file, 'a' if file_exists else 'w') as jsonl_file:
        jsonl_file.write(json.dumps(result) + '\n')


def passage_exist(paragarph,jsonl_path):
    # Check if the paragraph already exists in the file
    result_list = []
    if not os.path.exists(jsonl_path):
        return False
    with open(jsonl_path, 'r') as file:

        for line in file:
            # Load each line as a JSON object
            json_obj = json.loads(line)
            result_list.append(json_obj)
        for row in result_list:
            if row['text'] == paragarph:
                return True
    return False


if __name__ == '__main__':
    oracle = LLMOracle()
    #answer = oracle.query_llm("whats up?")
    #print(api_key)
    #print(answer)
    data_reader = DataReader("content_for_ques.json")
    #passage_url_tuples = data_reader.get_passage_url_tuples()
    topics = [
        "Terror Organization Responsible for October 7th",
        "Population in Gaza",
        "War Budget and Its Cost to the State of Israel to Date",
        "Crimes Against Humanity Committed on October 7th",
        "Military's Counter-response",
        "Israel's Diplomatic Response",
        "Global Responses to October 7th",
        "Social Media Discourse on October 7th",
        "History of Jewish Settlements"
    ]
    tagger = TopicTagger(data_reader,oracle,topics)
    topic = tagger.get_random_topic(topics)
    path_output_jsonl = "tagged_results.jsonl"
    #result_list = tagger.tag_passages()
    #targeted_paragraph = tagger.get_paragraphs_by_topic(result_list,topic)
    url_passages_tuples = tagger.data_reader.get_passage_url_tuples()

    for passage, url in url_passages_tuples:
        try:
            if not passage_exist(passage,path_output_jsonl):
                topics = tagger.tag_passage(passage)
                result = {"text": passage, "url": url, "topics": topics}
                save_result_to_jsonl(result,path_output_jsonl)
        except Exception as e:
            # Handle exceptions
            print(f"Error processing passage: {e}")
            break

    #tagger.save_results_to_json(result_list, output_file="tagged_results.json")



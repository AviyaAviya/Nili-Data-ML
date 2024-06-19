'''
this file target is to tag paragraphs from the json file named "content for questions"
its create anouther json file with the tagged parageaphs named "tagged_result"
'''
import os

api_key = os.getenv("OPENAI_API_KEY")
import re
import random

from json_reader import DataReader
from  data_handler import DataHandler
from llm_oracle import LLMOracle
import json


class TopicTagger:
    infer_topics_template = (
        "You are expert specializing in the history of the middleEast and Israel, you are an ardent Zionist , and a great lover of the "
        "the state of israel. Given the following topics list, and the following text output the topics that are relevant to the text."
        " Output only a list of the relevent topics, dont output anything else\n"
        "Topics:{0}\n "
        "Text: {1} "
    )

    # get possible list from wthich the oracle will choose the relevant according to the json file in the data reader
    def __init__(self, data_reader: DataReader, oracle: LLMOracle, possible_topic_list,
                 output_file="tagged_results.json"):
        self.data_reader = data_reader
        self.oracle = oracle
        self.topics = possible_topic_list
        self.output_file = output_file

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
        answer = self._extract_text_to_list(answer)
        return answer

    # choose the relvent topics according to the paragraphs
    def tag_passage(self, passage_text):
        all_topics = "\n".join(self.topics)
        answer = self.oracle.query_llm(self.infer_topics_template, [all_topics, passage_text])
        answer = answer.replace("Relevant topics:", "")
        answer = answer.replace("Relevant Topics:", "")
        topics_list = self._extract_text_to_list(answer)
        return topics_list

    def get_random_topic(self, list_of_topics):
        return random.choice(list_of_topics)

    # json of the tagged paragrafhs, list of dicts of text, url,topic
    def save_results_to_json(self, data_object):
        with open(self.output_file, 'w') as json_file:
            json.dump(data_object, json_file, indent=2)

    # prevent duplicate paragraphs in the output json file
    def passage_exist(self, paragraph):
        # Check if the paragraph already exists in the JSON file
        if not os.path.exists(self.output_file):
            return False

        with open(self.output_file, 'r') as file:
            data = json.load(file)  # Load the entire JSON file

        for entry in data:
            if entry['text'] == paragraph:
                return True
        return False

    def process_passages(self):
        if os.path.exists(self.output_file):
            return
        url_passages_tuples = self.data_reader.get_passage_url_tuples()
        result_list = []

        for passage, url in url_passages_tuples:
            try:
                if not self.passage_exist(passage):
                    topics = self.tag_passage(passage)
                    result = {"text": passage, "url": url, "topics": topics}
                    result_list.append(result)
            except Exception as e:
                print(f"Error processing passage: {e}")
                break

        self.save_results_to_json(result_list)



if __name__ == '__main__':
    oracle = LLMOracle()
    data_reader_content = DataReader("content_for_ques.json")
    #TODO get the topics from db
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
    tagger = TopicTagger(data_reader_content, oracle, topics)
    tagger.process_passages()

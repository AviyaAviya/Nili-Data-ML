'''
this file tagret is to  managing and manipulating JSONL data related to passages and topics.
This class facilitates efficient handling of JSONl data by providing methods to read, filter,
 and manipulate the data based on specific criteria.

'''

import json
import os
class DataHandler:
    def __init__(self, data_json_filename):
        self.data_json_filename = data_json_filename
        self._check_file_existence()

    def _check_file_existence(self):
        if not os.path.exists(self.data_json_filename):
            raise FileNotFoundError(f"The file {self.data_json_filename} does not exist.")

    def _read_json_into_list_of_dicts(self):
        with open(self.data_json_filename, 'r', errors='ignore') as file:
            try:
                data_list = json.load(file)
            except json.JSONDecodeError:
                raise ValueError("The file does not contain valid JSON.")
        return data_list

    def _get_dict_by_key_value(self, dict_list, key, value):
        for d in dict_list:
            if d.get(key) == value:
                return d
        return None

    def get_all_passages_by_topic(self, topic):
        data_list = self._read_json_into_list_of_dicts()
        result = []
        for dict in data_list:
            if topic in dict["topics"]:
                result.append(dict["text"])
        return result

    def get_all_pasages_by_url(self, url):
        data_list = self._read_json_into_list_of_dicts()
        result = []
        for dict in data_list:
            if url == dict["url"]:
                result.append(dict["text"])
        return result

    def get_all_topics(self):
        data_list = self._read_json_into_list_of_dicts()
        topics_set = set()  # Use a set to collect unique topics
        for d in data_list:
            for topic in d.get("topics", []):
                topic = topic.strip()  # Remove leading and trailing whitespace
                if topic and topic != "Topics:":  # Check if topic is non-empty and not equal to "Topics:"
                    topics_set.add(topic)  # Add the topic to the set
        return list(topics_set)

    def topics_to_json_file(self, topics_list, file_path):

        with open(file_path, 'w') as json_file:
            json.dump(topics_list, json_file, indent=4)

    def get_all_topics_with_ids(self):
        data_list = self._read_json_into_list_of_dicts()
        topics_with_ids = {}
        current_id = 1

        for d in data_list:
            for topic in d.get("topics", []):
                topic = topic.strip()  # Remove leading and trailing whitespace
                if topic and topic != "Topics:" and topic not in topics_with_ids:
                    topics_with_ids[topic] = current_id
                    current_id += 1

        formatted_topics = [{'id': topic_id, 'topic': topic} for topic, topic_id in topics_with_ids.items()]
        return formatted_topics



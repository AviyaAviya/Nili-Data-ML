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

class TopicTagger:

    infer_topics_template = (
        "You are expert specializing in the history of the middleEast and Israel, you are an ardent Zionist , and a great lover of the "
        "the state of israel. Given the following topics list, and the following text output the topics that are relevant to the text."
        " Output only a list of the relevent topics, dont output abything else\n"
        "Topics:{0}\n "
        "Text: {1} "
    )


    def __init__(self, data_reader: DataReader , oracle: LLMOracle,possible_topic_list):
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
            if counter>=50:
                break
            counter +=1
            topics = self.tag_passage(passage)
            result_list.append({"text":passage,"url":url,"topics":topics})
        return result_list


    def save_results_to_json(self, result_list, counter, output_file="tagged_results.json"):
        # Create a dictionary containing both result_list and the current counter
        progress_info = {"result_list": result_list, "counter": counter}

        with open(output_file, 'w') as json_file:
            json.dump(progress_info, json_file, indent=2)

    def get_random_topic(self, list_of_topics):
        return random.choice(topics)



    # def tag_sample_refs(source_csv="refs_sample.csv", dest_csv="sample_refs_tagged.csv"):
    #     def ref_exists(file_path, ref):
    #         # Check if the Ref already exists in the file
    #         with open(file_path, 'r') as csvfile:
    #             reader = csv.DictReader(csvfile)
    #             for row in reader:
    #                 if row['Ref'] == ref:
    #                     return True
    #         return False
    #
    #     def save_progress_info(file_path, current_index):
    #         progress_info = {"current_index": current_index}
    #
    #         with open(file_path.replace(".csv", "_progress.json"), 'w') as progress_file:
    #             json.dump(progress_info, progress_file)
    #
    #     trefs = load_refs_from_csv(source_csv)
    #     data_handler = TopicsData("embedding_all_toc.jsonl")
    #     oracle = LLMOracle()
    #     vector_space = TopicsVectorSpace(data_handler, oracle)
    #     verifier = TopicVerifier(data_handler, oracle)
    #     tagger = TopicTagger(vector_space, verifier, oracle)
    #
    #     fieldnames = ['Ref', 'LLM Original Topics', 'Nearest Sefaria Slugs']
    #
    #     # Check if destination file exists
    #     if os.path.exists(dest_csv):
    #         # If it exists, open in append mode
    #         mode = 'a'
    #     else:
    #         # If it doesn't exist, create a new file
    #         mode = 'w'
    #
    #     # Load progress information from a file
    #     try:
    #         with open(dest_csv.replace(".csv", "_progress.json"), "r") as progress_file:
    #             progress_info = json.load(progress_file)
    #             start_index = progress_info.get("current_index", 0)
    #     except (FileNotFoundError, json.JSONDecodeError):
    #         # Handle the case where the file doesn't exist or is corrupted
    #         start_index = 0
    #
    #     with open(dest_csv, mode, newline='') as csvfile:
    #         writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    #
    #         # If it's a new file, write the header
    #         if mode == 'w':
    #             writer.writeheader()
    #
    #         for tref in tqdm(trefs[start_index:], desc="Tagging Refs", unit="Ref", initial=start_index):
    #             # Check if the Ref already exists in the file
    #             if not ref_exists(dest_csv, tref):
    #                 try:
    #                     model_topics, verified_slugs = tagger.tag_ref(tref)
    #                     writer.writerow({
    #                         fieldnames[0]: tref,
    #                         fieldnames[1]: ', '.join(model_topics),
    #                         fieldnames[2]: ', '.join(verified_slugs)
    #                     })
    #
    #                     # Save progress information after processing each reference
    #                     save_progress_info(dest_csv, trefs.index(tref) + 1)
    #                 except Exception as e:
    #                     print(f"Problem with ref: {tref}, Exception: {e}")
    #
    #     # Save the final progress information
    #     save_progress_info(dest_csv, len(trefs))

    def get_paragraphs_by_topic(self, result_list, target_topic):
        matching_paragraphs = []
        for entry in result_list:
            text = entry.get("text", "")
            topics = entry.get("topics", [])

            if target_topic in topics:
                matching_paragraphs.append({"text": text})

        return matching_paragraphs

if __name__ == '__main__':
    oracle = LLMOracle()
    #answer = oracle.query_llm("whats up?")
    #print(api_key)
    #print(answer)
    data_reader = DataReader("content_for_ques.json")
    passage_url_tuples = data_reader.get_passage_url_tuples()
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
    #result_list = tagger.tag_passages()
    #targeted_paragraph = tagger.get_paragraphs_by_topic(result_list,topic)
    counter = 0  # Initialize counter

    # Load progress information from a file
    try:
        with open("progress_info.json", "r") as progress_file:
            progress_info = json.load(progress_file)
            result_list = progress_info.get("result_list", [])
            counter = progress_info.get("counter", 0)
    except (FileNotFoundError, json.JSONDecodeError):
        # Handle the case where the file doesn't exist or is corrupted
        pass

    # Continue the function from where it left off
    #TODO MABYE THIS TOO WILL HAVE INTERUPTION IN THE MIDDLE
    url_passages_tuple = tagger.data_reader.get_passage_url_tuples()
    for passage, url in url_passages_tuple[counter:]:
        try:
            # Your existing code for processing each passage
            topics = tagger.tag_passage(passage)
            result_list.append({"text": passage, "url": url, "topics": topics})
            counter += 1

            # Save progress information periodically (every 5 passages in this example)
            if counter % 5 == 0:
                tagger.save_results_to_json(result_list, counter)
        except Exception as e:
            # Handle exceptions and save progress information before exiting
            tagger.save_results_to_json(result_list, counter)
            print(f"Error processing passage: {e}")
            break

    # Save the final result
    tagger.save_results_to_json(result_list, counter)
    #tagger.save_results_to_json(result_list, output_file="tagged_results.json")



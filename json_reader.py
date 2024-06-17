'''
this file target is to read the json file " content for questions"

'''
import  json
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
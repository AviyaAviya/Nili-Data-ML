import csv

#elements in HTML
from bs4 import BeautifulSoup
#get requests
import requests
import json




#remove unrelevant data in <p> by class name
def remove_short_elements(list_of_elements ,num_of_words):
    filtered_list = []
    for element in list_of_elements:
        if len(element.get_text().split()) > num_of_words:
            filtered_list.append(element)
    return filtered_list


#get the data from url by get request
def scrape_html(url):
    response = requests.get(url)
    #take block from file html starting from specific line
    #block = islice(response.text, 1588)
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        source_html = str(soup)
        #return the data in html file
        return (source_html)
    else:
        print(f"Failed to fetch URL. Status code: {response.status_code}")

#like this the json file will look, for each url will be dict, in each dict will be 2 keys - url and paragraph
'''
[
    {
        "url": "wiki...",
        "passages": [p1, p2, p3...]
    
    },
            "url": "wiki...",
        "passages": [p1, p2, p3...]
    
    }
]
'''


#def save_results_to_json(data_object, output_file="content_for_ques.json"):
#    with open(output_file, 'w') as json_file:
#        json.dump(data_object, json_file, indent=2)

class UrlsContentScraper:

    def __init__(self, urls_csv, extraction_logic):
        urls_list =  [row[0] for row in csv.reader(open(urls_csv))]
        self.urls = urls_list
        self.extraction_logic = extraction_logic



    def get_list_of_urls_dicts(self):
        list_of_url_dicts= []
        for url in self.urls:

            list_of_url_dicts.append(self.extraction_logic(url))
        return list_of_url_dicts

def wiki_extraction_logic(url):
    url_dict = {}
    url_dict["url"] = url
    passages_list = []
    html = scrape_html(url.strip())
    soup = BeautifulSoup(html, 'html.parser')
    content_elements = soup.find_all("p")
    content_elements = [element for element in content_elements if element.get_text() != "" and not element.get_text().isspace()]
    content_elements = remove_short_elements(content_elements,15)
    for element in content_elements:
        #putting in list all relevant data
        passages_list.append(element.get_text())
    url_dict["passages"] = passages_list
    return url_dict

'''
def insta_extraction_logic(url):
def tele_extraction_logic(url):
def idf_extraction_logic(url):
def news_extraction_logic(url):
'''


if __name__ == '__main__':
    #list that will contain all the dicts, dict for each url
    data_object = []
    wiki_scraper = UrlsContentScraper("data_links.csv", wiki_extraction_logic)
    data_object.append(wiki_scraper.get_list_of_urls_dicts())
    #save_results_to_json(data_object,output_file="tagged_results.json")
    print(data_object)





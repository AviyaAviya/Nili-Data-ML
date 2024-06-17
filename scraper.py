'''
this file target is to create the json file "content_ fot_questions" by scraping data from source by its url
specifcly here inserted for now wiki links, the json file output will be list of dict where each dict include
one key and value =the url, and key-passages and value= a list of all the paragraphs of the url
'''

import csv
import json
# elements in HTML
from bs4 import BeautifulSoup
# get requests
import requests
import json_reader


# scrape data from links
class UrlsContentScraper:
    # get a csv file of links and algorithem of scrapin for the specif links
    def __init__(self, urls_csv, extraction_logic):
        urls_list = [row[0] for row in csv.reader(open(urls_csv))]
        self.urls = urls_list
        self.extraction_logic = extraction_logic

    # return list of dict of urls
    def get_list_of_urls_dicts(self):
        list_of_url_dicts = []
        for url in self.urls:
            list_of_url_dicts.append(self.extraction_logic(url))
        return list_of_url_dicts


# create json file of the scraped data
def save_results_to_json(data_object, output_file="content_for_ques.json"):
    with open(output_file, 'w') as json_file:
        json.dump(data_object, json_file, indent=2)


# remove unrelevant data in <p> by class name
def remove_short_elements(list_of_elements, num_of_words):
    filtered_list = []
    for element in list_of_elements:
        if len(element.get_text().split()) > num_of_words:
            filtered_list.append(element)
    return filtered_list


# get the data from url by get request
def scrape_html(url):
    response = requests.get(url)
    # take block from file html starting from specific line
    # block = islice(response.text, 1588)
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        source_html = str(soup)
        # return the data in html file
        return (source_html)
    else:
        print(f"Failed to fetch URL. Status code: {response.status_code}")


# return a dict which contain key =url and value=list of the passages belong to the url
def wiki_extraction_logic(url):
    url_dict = {}
    url_dict["url"] = url
    passages_list = []
    html = scrape_html(url.strip())
    soup = BeautifulSoup(html, 'html.parser')
    content_elements = soup.find_all("p")
    content_elements = [element for element in content_elements if
                        element.get_text() != "" and not element.get_text().isspace()]
    content_elements = remove_short_elements(content_elements, 15)
    for element in content_elements:
        # putting in list all relevant data
        passages_list.append(element.get_text())
    url_dict["passages"] = passages_list
    return url_dict


# TODO if we want to extract data from other sources, we need different scraping alogirhtm for each
'''
def insta_extraction_logic(url):
def tele_extraction_logic(url):
def idf_extraction_logic(url):
def news_extraction_logic(url):
'''

if __name__ == '__main__':
    # list that will contain all the dicts, dict for each url
    wiki_scraper = UrlsContentScraper("wiki_links.csv", wiki_extraction_logic)
    data_object=wiki_scraper.get_list_of_urls_dicts()
    save_results_to_json(data_object, output_file="content_for_ques.json")
    print(data_object)

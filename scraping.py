import csv
from bs4 import BeautifulSoup
import requests
import json
def page_urls_list_from_csv(urls_csv):
    return [row[0] for row in csv.reader(open(urls_csv))]
def remove_elements_by_tag(soup, tag_name):
    elements_to_remove = soup.find_all(tag_name)
    for element in elements_to_remove:
        element.decompose()
def remove_elements_by_class(soup, class_name):
    elements_to_remove = soup.find_all(class_=class_name)
    for element in elements_to_remove:
        element.decompose()
def scrape_html(url):
    response = requests.get(url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        source_html = str(soup)
        return (source_html)
    else:
        print(f"Failed to fetch URL. Status code: {response.status_code}")

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
###

if __name__ == '__main__':
    data_object = []
    urls = page_urls_list_from_csv("data_links.csv")
    for url in urls:
        url_dict = {}
        url_dict["url"] = url
        passages_list = []
        html = scrape_html(url.strip())
        soup = BeautifulSoup(html, 'html.parser')
        remove_elements_by_class(soup, "flagicon")

        content_elements = soup.find_all("p")
        content_elements = [element for element in content_elements if element.get_text() != "" and not element.get_text().isspace()]
        for element in content_elements:
            print(element.get_text())
            passages_list.append(element.get_text())
        url_dict["passages"] = passages_list
        data_object.append(url_dict)
    with open("content_for_ques_json", 'w') as json_file:
        json.dump(data_object, json_file, indent=2)
        # print(soup.get_text())
    print("a")
import requests
from bs4 import BeautifulSoup
from urllib.parse import urlparse

PAGE_LIMIT = 1

def scrape_websites():
    all_links = []
    pages = open('data/links.txt', 'r').read().split('\n')

    for url in pages:
        r = requests.get(url)
        soup = BeautifulSoup(r.text, 'html.parser')
        poss_art = [a['href'] for a in soup.find_all("a", href=True)]
        
        articles = ['https://' + urlparse(url).netloc + i for i in list(filter(lambda a: '/news/articles' in a, poss_art))][:4]
        all_links.extend(articles)

    contents = {}
    for link in all_links:
        contents[link] = requests.get(link).text
    
    return contents
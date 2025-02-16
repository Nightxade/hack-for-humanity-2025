import requests
from bs4 import BeautifulSoup

PAGE_LIMIT = 1
PREFIX = "https://www.bbc.com"

def scrape_websites():
    all_links = []
    pages = ["https://www.bbc.com/news/topics/c6lpr12gep3t", "https://www.bbc.com/news/topics/cwlw3xz0115t","https://www.bbc.com/news/topics/cyqpkren475t"]

    for url in pages:
        r = requests.get(url)
        soup = BeautifulSoup(r.text, 'html.parser')
        poss_art = [a['href'] for a in soup.find_all("a", href=True)]
        
        articles = [PREFIX + i for i in list(filter(lambda a: '/news/articles' in a, poss_art))]
        all_links.extend(articles)

    contents = {}
    for link in all_links:
        contents[link] = requests.get(link).text
    
    return contents
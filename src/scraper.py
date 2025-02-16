import requests
from bs4 import BeautifulSoup


def scrape_websites():
    topics = ["humanitarian", "human%20rights", "health", "disease", "conflict", "war", "environmental"]
    area = ["global", "united%20states", "bay%20area"]
    all_links = {}

    for i in topics:
        for t in area:
            url = f'https://news.google.com/search?q={i}%20{t}%20news&hl=en-US&gl=US&ceid=US%3Aen'
            r = requests.get(url)
            soup = BeautifulSoup(r.content, 'html.parser')
            temp = 0
            for item in soup.find_all('a', class_="WwrzSb"):
                all_links['news.google.com' + item['href'][1:]] = i
                if temp == 2:
                    break
                else:
                    temp += 1

    return all_links
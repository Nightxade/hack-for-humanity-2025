from src.chat import article_summary
import json
from src.scraper import scrape_websites
import requests

link = "www.bbc.com/news/articles/c5y0gl51e7mo"
# links = {link: {"category": "Natural disaster", "content": requests.get("https://" + link).text}}
# a = article_summary(open('private/openai-api', 'r').read().strip(), links[link]['content'])
# links[link].pop('content')
# print(a)
# links[link].update(json.loads(a))
# print(links)

print(requests.get("https://" + link).text)

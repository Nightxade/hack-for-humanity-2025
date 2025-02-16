from src.scraper import scrape_websites
from src.chat import article_summary

links = {} #dict - {key: link, value: category}
gptresponse = [] #list - each value is the gpt response for a link, weird type

#60k tokens, don't run it for fun TwT
def get_daily_update():
    links = scrape_websites()
    k = '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'
    for i in links.keys():
        gptresponse.append(article_summary(k, i))
import requests
from bs4 import BeautifulSoup

urls = [
    "https://www.cnn.com/us/crime-and-justice",
    "https://www.bbc.com/news/topics/cyqpkren475t",
    "https://www.bbc.com/news/topics/cwlw3xz0115t",
    "https://www.bbc.com/news/topics/c6lpr12gep3t",
    "https://www.wsj.com/news/collection/corporate-social-responsibility-report-de7b3d79"
]

def get_article_text(article_url):
    response = requests.get(article_url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, "html.parser")
        paragraphs = soup.find_all("p")
        return "\n".join([p.get_text(strip=True) for p in paragraphs])
    return "Failed to retrieve article text"

for url in urls:
    print(f"Scraping: {url}")
    response = requests.get(url)
    
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, "html.parser")
        
        articles = soup.find_all("a", href=True)
        article_links = [a["href"] for a in articles if "article" in a["href"]]
        
        print(f"Article texts from {url}:")
        for idx, article_link in enumerate(article_links[:10], start=1): # limit 10 articles
            full_url = article_link if article_link.startswith("http") else url + article_link
            print(f"\nArticle {idx}: {full_url}")
            print(get_article_text(full_url))
        print("\n" + "-"*100 + "\n") # limit 100 lines
    else:
        print(f"Failed to retrieve {url}")
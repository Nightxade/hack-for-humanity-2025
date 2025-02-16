from requests_html import HTMLSession
session = HTMLSession()

topics = ["humanitarian", "human%20rights", "health", "disease", "conflict", "war", "environmental"]
area = ["global", "united%20states", "bay%20area"]
links = []

for i in topics:
    for t in area:
        url = f'https://news.google.com/search?q={i}%20{t}%20news&hl=en-US&gl=US&ceid=US%3Aen'
        r = session.get(url)
        r.html.render(sleep = 1)
        links += r.html.find('')

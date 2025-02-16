from src.scraper import scrape_websites
from src.chat import article_summary
from datetime import datetime, timezone
from sqlalchemy import func
import json
from src.models import Event
from src import db, app
from tqdm import tqdm

# links = {} #dict - {key: link, value: category}
today = datetime.now(timezone.utc).date()

openai_key = open('private/openai-api', 'r').read().strip()

#60k tokens, don't run it for fun TwT
def get_daily_update():
    links = scrape_websites()
    links = {k: {"content": v} for k,v in links.items()}

    for i in tqdm(links.keys()):
        links[i].update(json.loads(article_summary(openai_key, links[i]['content'])))

    return links


def update_database():
    with app.app_context():
        # check if database needs update
        date = db.session.execute(db.select(func.max(Event.pull_date))).scalar()
        if date == today:
            return

    links = get_daily_update()
    # links = {"google.com": {"latitude": 0, "longitude": 0, "city": "Santa Clara", "country": "US", "title": "A", "content": "B", "date": "2025-01-01", "category": "Natural disaster"}}

    with app.app_context():
        for i in links.keys():
            links[i]['date'] = datetime.strptime(links[i]['date'], "%Y-%m-%d").date()
            links[i]['pull_date'] = today
            links[i]['link'] = i

            event = Event(**links[i])
            db.session.add(event)
        db.session.commit()
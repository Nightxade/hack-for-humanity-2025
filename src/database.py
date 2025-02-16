from src.scraper import scrape_websites
from src.chat import article_summary
from datetime import datetime, timezone
from sqlalchemy import insert, func
import json
from src.models import Event
from src import db, app

links = {} #dict - {key: link, value: category}
today = datetime.now(timezone.utc).date()

#60k tokens, don't run it for fun TwT
def get_daily_update():
    global links

    links = scrape_websites()
    links = {k: {"category": v} for k,v in links}

    k = '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'
    for i in links.keys():
        links[i].update(json.loads(article_summary(k, i)))


def update_database():
    with app.app_context():
        # get unique index for id
        index = db.session.execute(db.select(func.max(Event.id))).scalar()
        if index is None:
            index = 1
        
        for i in links.keys():
            links[i]['date'] = datetime.strptime(links[i]['date'], "%Y-%m-%d").date()
            links[i]['pull_date'] = today
            links[i]['link'] = i
            links[i]['id'] = index

            index += 1

            event = Event(**links[i])
            db.session.add(event)
        db.session.commit()
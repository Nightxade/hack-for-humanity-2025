from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Event
from src import db

database_url = 'sqlite:///app.db'
engine = create_engine(database_url)
Session = sessionmaker(bind=engine)
session = Session()

get_data = engine.execute("SELECT * FROM events.db")
data = [
    Event(
        id=row.id,
        latitude=row.latitude,
        longitude=row.longitude,
        city=row.city,
        state=row.state,
        country=row.country,
        title=row.title,
        content=row.content,
        category=row.category,
        date=row.date,
        link=row.link
    )
    for row in get_data
]

session.add_all(data)
session.commit()
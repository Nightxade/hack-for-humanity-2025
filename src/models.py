from sqlalchemy.orm import mapped_column
from src import db

class Event(db.Model):
    __tablename__ = "event"
    
    id = mapped_column(db.Integer, primary_key=True)
    latitude = mapped_column(db.Float)
    longitude = mapped_column(db.Float)

    city = mapped_column(db.String)
    state = mapped_column(db.String(10))
    country = mapped_column(db.String(50))
    
    title = mapped_column(db.String)
    content = mapped_column(db.String)
    category = mapped_column(db.String(30))
    date = mapped_column(db.Date())
    link = mapped_column(db.String)

    
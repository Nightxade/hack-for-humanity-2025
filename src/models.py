from sqlalchemy import Column, Integer, String, types
from sqlalchemy.orm import mapped_column
from database import db

class Event(db.Model):
    __tablename__ = "event"
    
    id = mapped_column(Integer, primary_key=True)
    latitude = mapped_column(types.Float())
    longitude = mapped_column(types.Float())

    city = mapped_column(String())
    state = mapped_column(String(10))
    country = mapped_column(String(50))
    
    title = mapped_column(String())
    content = mapped_column(String())
    category = mapped_column(String(30))
    date = mapped_column(types.Date())
    link = mapped_column(String())

    
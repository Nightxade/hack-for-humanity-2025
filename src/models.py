from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import mapped_column
from database import db

class Event(db.Model):
    __tablename__ = "event"
    
    id = mapped_column(Integer, primary_key=True)
    latitude = mapped_column(Integer)
    longitude = mapped_column(Integer)
    
    title = mapped_column(String())
    content = mapped_column(String())
    category = mapped_column(String(30))
    date
    link

    
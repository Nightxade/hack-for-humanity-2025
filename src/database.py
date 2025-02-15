from sqlalchemy.orm import DeclarativeBase
from flask_sqlalchemy import SQLAlchemy
from src import app

class Base(DeclarativeBase):
    pass

db = SQLAlchemy(app, model_class=Base)
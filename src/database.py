from sqlalchemy.orm import DeclarativeBase
from flask_sqlalchemy import SQLAlchemy
from src import app

class Base(DeclarativeBase):
    pass

db = SQLAlchemy(app, model_class=Base)
db.init_app(app)

with app.app_context():
    db.create_all()
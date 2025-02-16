from flask import Flask
from flask_cors import CORS
from openai import OpenAI

app = Flask(__name__)
CORS(app)

#---CONFIG---#
import src.config as cfg
# app.config.from_object(cfg.ConfigProduction) # production
# app.config.from_object(cfg.ConfigTest) # test
app.config.from_object(cfg.ConfigDev) # dev

#---DATABASE---#
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    pass

db = SQLAlchemy(model_class=Base)
db.init_app(app)

with app.app_context():
    db.create_all()

#---VIEWS---#
from src import views
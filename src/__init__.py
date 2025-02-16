from flask import Flask
from flask_cors import CORS

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

#---UPDATE DB---#
from apscheduler.schedulers.background import BackgroundScheduler
from src.database import update_database

scheduler = BackgroundScheduler()
job = scheduler.add_job(update_database, 'interval', hours=6)
scheduler.start()

#---VIEWS---#
from src import views # DO NOT REMOVE THIS MAKES THE FLASK ENDPOINTS ACCESSIBLE
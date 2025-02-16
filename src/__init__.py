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
from src.database import Base
from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy(model_class=Base)
db.init_app(app)

with app.app_context():
    db.create_all()

#---VIEWS---#
from src import views
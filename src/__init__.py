from flask import Flask, session, render_template
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

#---CONFIG---#
# app.config.from_object('config.ConfigProduction') # production
# app.config.from_object('config.ConfigTest') # test
app.config.from_object('config.ConfigDev') # dev

# db = SQLAlchemy(app)

#---VIEWS---#
from src import views


#---DATABASE---#
from src import database
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

#---CONFIG---#
# app.config.from_object('config.ConfigProduction') # production
# app.config.from_object('config.ConfigTest') # test
app.config.from_object('src.config.ConfigDev') # dev

#---VIEWS---#
from src import views


#---DATABASE---#
# from src import database


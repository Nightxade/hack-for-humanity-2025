from flask import Flask

app = Flask(__name__)

#---CONFIG---#
# app.config.from_object('config.ConfigProduction') # production
# app.config.from_object('config.ConfigTest') # test
app.config.from_object('config.ConfigDev') # dev

#---VIEWS---#
from src import views


#---DATABASE---#
from src import database


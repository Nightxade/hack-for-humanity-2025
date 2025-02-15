class Config(object):
    DEBUG = False
    TESTING = False
    SQLALCHEMY_DATABASE_URI = 'sqlite:///app.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = True

class ConfigProduction(Config):
    pass

class ConfigDev(Config):
    DEBUG = True

class ConfigTest(Config):
    TESTING = True
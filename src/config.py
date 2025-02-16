class Config(object):
    DEBUG = False
    TESTING = False
    SQLALCHEMY_DATABASE_URI = 'sqlite:///events.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

class ConfigProduction(Config):
    pass

class ConfigDev(Config):
    DEBUG = True

class ConfigTest(Config):
    TESTING = True
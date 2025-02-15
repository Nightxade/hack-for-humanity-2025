class Config(object):
    DEBUG = False
    TESTING = False

class ConfigProduction(Config):
    pass

class ConfigDev(Config):
    DEBUG = True

class ConfigTest(Config):
    TESTING = True
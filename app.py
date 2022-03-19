from flask import Flask
from models import db

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JSON_SORT_KEYS'] = False
  
db.init_app(app)
@app.before_first_request
def create_table():
    db.create_all()

from routes import *
from api import *

if __name__ == "__main__":
    app.run(debug=True)
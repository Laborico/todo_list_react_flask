from app import app
from flask import render_template, request

@app.route("/")
def my_index():
    return render_template("index.html", flask_token="Hello   world")
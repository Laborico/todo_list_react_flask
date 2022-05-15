from app import app
from flask import render_template

@app.route("/")
@app.route("/home")
@app.route("/signup")
@app.route("/login")
def home():
    return render_template("index.html")
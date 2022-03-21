from app import app
from flask import render_template

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/login")
def loginpage():
    return render_template("index.html")
    
@app.route("/signup")
def signuppage():
    return render_template("index.html")
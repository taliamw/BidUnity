from flask import render_template
from app import app

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login')
def login():
    return 'Login page'

@app.route('/register')
def register():
    return 'Register page'

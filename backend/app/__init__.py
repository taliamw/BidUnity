from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_security import Security, SQLAlchemyUserDatastore

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'  # Change this to a random value for security
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://username:password@host/database_name'  # Replace placeholders

db = SQLAlchemy(app)

from app.models import User  # Import User model

# Create Flask-Security object
security = Security(app, SQLAlchemyUserDatastore(db, User, None))

# Import routes (after app is created)
from app import routes

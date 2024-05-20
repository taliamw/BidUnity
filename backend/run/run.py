from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_mysqldb import MySQL

app = Flask(__name__)
CORS(app)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'bidunity'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'  # Fetch results as dictionaries

mysql = MySQL(app)

@app.route('/submit-form', methods=['POST'])
def submit_form():
    try:
        # Extract form data from the request
        data = request.json
        username = data['username']
        password = data['password']
        email = data['email']

        # Create a cursor to execute SQL queries
        cur = mysql.connection.cursor()

        # Execute an insert query
        cur.execute("INSERT INTO users (username, password, email) VALUES (%s, %s, %s)", (username, password, email))

        # Commit changes to the database
        mysql.connection.commit()

        # Close cursor
        cur.close()

        # Return success message
        return jsonify({'message': 'Form submitted successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        # Handle GET request
        return jsonify({'message': 'GET request received'})
    elif request.method == 'POST':
        # Handle POST request
        try:
            # Extract username and password from the request
            data = request.json
            username = data['username']
            password = data['password']

            # Create a cursor to execute SQL queries
            cur = mysql.connection.cursor()

            # Query the database for the user's information
            cur.execute("SELECT * FROM users WHERE username = %s", (username,))
            user = cur.fetchone()

            # Check if a user with the provided username exists and if the password matches
            if user:
               if password == user['password']:
                return jsonify({'message': 'Login successful'})
               else:
                return jsonify({'message': 'Invalid password'}), 401
            else:
                return jsonify({'message': 'User not found'}), 401
        except Exception as e:
            return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)

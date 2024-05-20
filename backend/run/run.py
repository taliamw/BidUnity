from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_mysqldb import MySQL

app = Flask(__name__)
CORS(app)
app.config['MYSQL_HOST'] = 'localhost'  # MySQL host
app.config['MYSQL_USER'] = 'username'   # MySQL username
app.config['MYSQL_PASSWORD'] = 'password'  # MySQL password
app.config['MYSQL_DB'] = 'database_name'  # MySQL database name

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
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
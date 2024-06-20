'''
this file target is to set up a Flask web application to display a quiz on the web.
 It integrates with the data handler and the LLM oracle to generate quiz questions based on topics,
  and it exposes multiple API endpoints to retrieve topics and questions.

'''

from flask import Flask, jsonify, request
from user_session import UserSession
from data_handler import DataHandler
from llm_oracle import LLMOracle
import pg

app = Flask(__name__)

conn = pg.DB(dbname='your_database', host='your_host', port=5432, user='your_user', passwd='your_password')


# API endpoint to fetch user details
@app.route('/users', methods=['GET'])
def get_users():
    sql_query = "SELECT username, email FROM users;"
    result = conn.query(sql_query)

    # Process the results and return as JSON response
    users = []
    for row in result.getresult():
        user = {'username': row['username'], 'email': row['email']}
        users.append(user)

    return jsonify(users)


# API endpoint to add a new user
@app.route('/users', methods=['POST'])
def add_user():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')

    # Perform SQL insert to add a new user
    sql_query = f"INSERT INTO users (username, email) VALUES ('{username}', '{email}');"
    conn.insert(sql_query)

    return jsonify({'message': 'User added successfully'})


if __name__ == '__main__':
    app.run(debug=True)

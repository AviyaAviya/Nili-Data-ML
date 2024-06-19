'''
this file target is to represent individual users within the application.
 It encapsulates the data associated with a user, specifically their username and password, and
 track the score

'''
class User:
    def __init__(self, username, password):
        self.username = username
        self.password = password
        self.score = 0
    def save_to_db(self):
        pass
        # Code to save the user data to a database goes here
        # You can use database libraries like SQLAlchemy to interact with the database
        # Example: connection.execute("INSERT INTO users (username, password) VALUES (?, ?)", (self.username, self.password))

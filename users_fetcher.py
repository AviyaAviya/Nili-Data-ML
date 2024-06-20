import pg

# Connect to the PostgreSQL database
conn = pg.DB(dbname='users', host='localhost', port=5432, user='postgres', passwd='123456')

# Example SQL query to fetch user details
sql_query = "SELECT username, email, age FROM users;"
result = conn.query(sql_query)

# Process the results or execute other queries (e.g., insert, update, delete) as needed

# Close the database connection
conn.close()

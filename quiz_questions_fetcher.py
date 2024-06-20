import pg

# Connect to the PostgreSQL database
conn = pg.DB(dbname='quiz', host='localhost', port=5432, user='postgres', passwd='123456')

# Example SQL query to fetch quiz questions
sql_query = "SELECT question, answer_1, answer_2, answer_3, answer_4 FROM quiz_questions;"
result = conn.query(sql_query)

# Process the results
for row in result.getresult():
    # Access columns by index or column name
    question = row[0]
    answer_1 = row['answer_1']
    answer_2 = row['answer_2']
    answer_3 = row['answer_3']
    answer_4 = row['answer_4']

    # Perform operations with the fetched data
    print(f"Question: {question}")
    print(f"Answers: {answer_1}, {answer_2}, {answer_3}, {answer_4}")

# Close the database connection
conn.close()

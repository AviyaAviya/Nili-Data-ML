'''
this file target is to set up a Flask web application to display a quiz on the web.
 It integrates with the data handler and the LLM oracle to generate quiz questions based on topics,
  and it exposes multiple API endpoints to retrieve topics and questions.

'''

from flask import Flask, jsonify
from user_quiz import UserSession
from data_handler import DataHandler
from llm_oracle import LLMOracle

app = Flask(__name__)

data_handler = DataHandler(r"C:\Users\rafi1\OneDrive\מסמכים\graduation_project\quiz_app_NILI\tagged_results.json")
oracle = LLMOracle()
user_session = UserSession(oracle, data_handler)
topics = data_handler.get_all_topics_with_ids()



# TODO לחפש קליינט יותר מקצועי ולהתאים אותו אלינו
# TODO לסדר את הפורמט בו מוצגות השאלות , כרגע זה תשובה נכונה ואז תשובות אפשריות ואז השאלה עצמה
# TODO להוסיף אנדפוינט לקבלת תשובת יוזר והחזרה האם התשובה נכונה


# root
@app.route('/', methods=['GET'])
def hello_world():
    return jsonify("welcom to the trivia game!")


# get all topics
@app.route('/topics', methods=['GET'])
def get_topics():
    return jsonify({'topics': topics})


#  get a specific question by ID of topic
@app.route('/topics/<int:topic_id>', methods=['GET'])
def get_question(topic_id):

    whole_question = {}
    topic = [topic for topic in topics if topic['id'] == topic_id]
    if len(topic) == 0:
        return jsonify({'error': 'Topic not found'}), 404

    question = user_session.genreate_question_by_topic(topic[0].get("topic"))
    question, possible_answers, correct_answer = user_session.separated_question_from_answers(question)
    whole_question['question'] = question
    whole_question['possible_answers'] = question
    whole_question['correct_answer'] = question
    response = {
        '1. question': whole_question['question'],
        '2. possible_answers': whole_question['possible_answers'],
        '3. correct_answer': whole_question['correct_answer']
    }

    return jsonify(response)

    # return jsonify({'question': question, 'possible answers': possible_answers, 'correct answer': correct_answer})


#  get a couple of question of the topic via ID
@app.route('/topics/<int:topic_id>/many', methods=['GET'])
def get_questions(topic_id):
    whole_questions = []
    topic = [topic for topic in topics if topic['id'] == topic_id]
    if len(topic) == 0:
        return jsonify({'error': 'Topic not found'}), 404

        # Clear previous questions
    whole_questions.clear()
    # Generate and display 3 questions one after the other

    for i in range(3):
        question = user_session.genreate_question_by_topic(topic[0].get("topic"))
        question, possible_answers, correct_answer = user_session.separated_question_from_answers(question)

        whole_questions.append({
            '1. question': question,
            '2. possible_answers': possible_answers,
            '3. correct_answer': correct_answer
        })

    return jsonify({'questions': whole_questions})


if __name__ == '__main__':
    app.run(debug=True)

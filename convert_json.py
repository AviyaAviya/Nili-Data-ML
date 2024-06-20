import json

# Load the JSON data
with open('precomputed_quiz_questions.json', 'r') as file:
    data = json.load(file)

# Conversion function
def convert_to_js_format(data):
    js_data = {
        "title": "Quiz on iron swords war in israel",
        "questions": []
    }

    for category, questions in data.items():
        for question in questions:
            new_question = {
                "q": question["question"],
                "a": question["possible answers"],
                "followup": f"Correct answer is {question['correct answer']}."
            }
            js_data["questions"].append(new_question)

    return js_data

# Convert the data
converted_data = convert_to_js_format(data)

# Write to trivia.js in JavaScript format
with open('trivia.js', 'w') as file:
    file.write("export const trivia = ")
    json.dump(converted_data, file, indent=2)

print("Conversion complete. Check the trivia.js file.")

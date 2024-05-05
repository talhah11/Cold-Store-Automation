from flask import Flask, jsonify
import csv
import random
from datetime import datetime
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/random_row')
def random_row():
    with open('Data.csv', 'r') as f:
        reader = csv.reader(f)
        # Skip the header row
        next(reader)
        rows = [row for row in reader]
        # Get the current hour in 24-hour format
        current_hour = datetime.now().hour
        # Choose a random row based on the current hour
        random_row = random.choice([row for row in rows if int(row[1].split(':')[0]) == current_hour])
        # Return the row as a JSON object
        return jsonify(random_row)

@app.route('/get_data')
def get_columns():
    with open('Data.csv', 'r') as f:
        # Convert the csv.reader object to a list
        rows = list(csv.reader(f))
        # Get the header row
        header = rows[0]
        # Get the third and ninth columns
        column_1 = [row[0] for row in rows[1:]]
        column_2 = [row[1] for row in rows[1:]]
        column_3 = [row[2] for row in rows[1:]]
        column_4 = [row[3] for row in rows[1:]]
        column_5 = [row[4] for row in rows[1:]]
        column_8 = [row[7] for row in rows[1:]]
        column_9 = [row[8] for row in rows[1:]]
        # Combine the column names and values into a dictionary
        columns = { 'Peak': column_1, 'Time': column_2, 'Temperature': column_3, 'Humidity': column_4, 'CO2': column_5, 'External': column_8, 'Energy': column_9}
        # Return the columns as a JSON object
        return jsonify(columns)

if __name__ == '__main__':
    # Run the app on port 5001
    app.run(port=5001)

import joblib
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load the XGBoost model
# upload your own ensemble model
model = joblib.load('your_ensemble_model.joblib') 

# Define the endpoint to make predictions
@app.route('/predict', methods=['GET'])
def predict():
    # Get the input data from the request query parameters
    inputData = request.args.get('inputData')

    # Parse the input data as a 2D array
    inputData = eval(inputData)

    # Make predictions using the XGBoost model
    predictions = model.predict(inputData)

    # Convert the predictions to a JSON string and return it
    return jsonify(predictions.tolist())

if __name__ == '__main__':
    # Start the server
    app.run()

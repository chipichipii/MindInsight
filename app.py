from flask import Flask, request, jsonify
from flask_cors import CORS

from Predict import predict_levels  # import function

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Mental Health Prediction API is running"

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json
        answers = data["answers"]

        result = predict_levels(answers)

        return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(debug=True)
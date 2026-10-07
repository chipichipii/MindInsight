# MindInsight 🧠

MindInsight is an AI-powered mental wellness screening system that uses a multi-output Artificial Neural Network (ANN) to predict Depression, Anxiety and Stress levels from Depression Anxiety Stress Scale (DASS) questionnaire responses.

## Features
- Depression, Anxiety and Stress prediction
- Multi-output ANN model
- Personalized recommendations
- Weekly trend analysis
- Digital Mental Health Twin
- Interactive dashboard
- Flask backend with a Next.js frontend

## Tech Stack
- **Backend:** Python, Flask
- **Machine Learning:** TensorFlow, Keras, Scikit-learn, Pandas, NumPy
- **Frontend:** Next.js, React, TypeScript
- **Dataset:** DASS questionnaire data

## How It Works
1. The user answers 27 questionnaire questions.
2. Responses are processed and scaled.
3. The ANN model predicts Depression, Anxiety and Stress levels together.
4. Results are shown with visual insights and recommendations.

## Screenshots

### 1. Home Page
![Home page](MindInsight_SS/Home.png)

The landing page introduces MindInsight as an AI-powered mental health insight dashboard. A sample wellness card previews the stress, anxiety and mood scores users can expect, along with a 30-day trend chart. Users can start the assessment, open the demo, or switch between light and dark mode.

### 2. Assessment Questionnaire
![Assessment question](MindInsight_SS/question.png)

A guided 27-question assessment, split into sections such as "About You". Each screen shows one question with a progress bar, a question counter and a completion percentage. Users can move back and forth with Previous/Next or cancel at any time.

### 3. Results Dashboard
![Results dashboard](MindInsight_SS/result1.png)

The results page summarises depression, anxiety and stress as scores out of 5, each with a severity label (e.g. Moderate). A score comparison bar chart and a weekly trend graph show how the three areas compare.

### 4. Personalized Insights & Digital Mental Health Twin
![Personalized insights and digital twin](MindInsight_SS/result2.png)

Each area gets a short, tailored insight, such as breathing exercises for anxiety. The "Digital Mental Health Twin" feature matches the user's responses to a similar behavioural profile and lists the traits common to people with similar patterns, such as high emotional sensitivity and frequent overthinking.

### 5. Twin Comparison & Recommendations
![Twin comparison and recommendations](MindInsight_SS/result3.png)

The user's scores are shown side by side with their twin's, with a short explanation of what the comparison means. Below that are practical wellness recommendations, such as relaxation techniques, a consistent sleep schedule and journaling. The page ends with options to retake the assessment or return home, and a disclaimer that the tool does not replace professional medical advice.

## How to Run

**Backend**
```bash
python -m venv venv
source venv/Scripts/activate
pip install -r requirements.txt
python app.py
```

**Frontend** (in a second terminal)
```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

## Project Structure
- `app.py` – Flask API
- `Train_model.py` – model training
- `Predict.py` – prediction logic
- `prepare_data.py` – data preprocessing
- `models/` – trained model and scaler
- `DASS.csv` – dataset
- `frontend/` – Next.js web interface

## Team
- Navya Nanda
- Sakshi Arora

## Disclaimer
MindInsight is an awareness and screening tool. It is not intended to diagnose, treat, or replace professional medical advice. Users with severe results are encouraged to consult a healthcare professional.

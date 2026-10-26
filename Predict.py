import numpy as np
import joblib
from tensorflow.keras.models import load_model

model = load_model("models/ann_model.h5")
scaler = joblib.load("models/scaler.pkl")

def predict_levels(user_input):
    try:
        x = np.array(user_input, dtype=float).reshape(1, -1)

        if x.shape[1] != 27:
            return {"error": "Expected 27 answers, got " + str(x.shape[1])}

        x_scaled = scaler.transform(x)
        dep, anx, stress = model.predict(x_scaled, verbose=0)

        return {
            "Depression_Level": int(np.argmax(dep)) + 1,
            "Anxiety_Level": int(np.argmax(anx)) + 1,
            "Stress_Level": int(np.argmax(stress)) + 1,
        }
    except Exception as e:
        return {"error": str(e)}
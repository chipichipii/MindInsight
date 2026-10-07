import numpy as np

def predict_levels(user_input):
    try:
        user_input = np.array(user_input)

        # Simple scoring logic (based on DASS-style ranges)
        score = np.sum(user_input)

        # Dummy thresholds (adjust if needed)
        if score < 40:
            level = 1
        elif score < 70:
            level = 2
        else:
            level = 3

        return {
            "Depression_Level": level,
            "Anxiety_Level": level,
            "Stress_Level": level
        }

    except Exception as e:
        return {"error": str(e)}
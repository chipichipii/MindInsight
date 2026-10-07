import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from tensorflow.keras.utils import to_categorical
import joblib
import os
os.environ["TF_ENABLE_ONEDNN_OPTS"] = "0"
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "2"  # suppress most TF info/warnings

# Load dataset
data = pd.read_csv("dass.csv")

# --------- FEATURES ---------
feature_cols = [col for col in data.columns if col.startswith("Q1") or col.startswith("Q3")]
X = data[feature_cols].values

# --------- LABELS ---------
y_depression = to_categorical(data["Depression_Level"] - 1)  # convert 1-5 -> 0-4
y_anxiety    = to_categorical(data["Anxiety_Level"] - 1)
y_stress     = to_categorical(data["Stress_Level"] - 1)

# --------- SCALE FEATURES ---------
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Save scaler for future use
joblib.dump(scaler, "models/scaler.pkl")

# --------- SPLIT DATA ---------
X_train, X_test, y_train_dep, y_test_dep, y_train_anx, y_test_anx, y_train_str, y_test_str = train_test_split(
    X_scaled, y_depression, y_anxiety, y_stress, test_size=0.2, random_state=42
)

print("Data preparation complete.")
print("X_train shape:", X_train.shape)
print("X_test shape:", X_test.shape)
import numpy as np
from tensorflow.keras.models import load_model
from prepare_data import X_test, y_test_dep, y_test_anx, y_test_str

model = load_model("models/ann_model.h5")
preds = model.predict(X_test, verbose=0)

names = ["Depression", "Anxiety", "Stress"]
truths = [y_test_dep, y_test_anx, y_test_str]

for name, p, y in zip(names, preds, truths):
    acc = np.mean(np.argmax(p, axis=1) == np.argmax(y, axis=1))
    print(name, "accuracy:", round(acc * 100, 2), "%")
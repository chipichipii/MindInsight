# ------------------------- ANN Model Training -------------------------
import os
import numpy as np
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Input, Dense, Dropout
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.callbacks import EarlyStopping
import joblib

# Ensure models folder exists
if not os.path.exists("models"):
    os.makedirs("models")

# ------------------------- LOAD PREPARED DATA -------------------------
# X_train, X_test, y_train_dep, y_test_dep, y_train_anx, y_test_anx, y_train_str, y_test_str
from prepare_data import X_train, X_test, y_train_dep, y_test_dep, y_train_anx, y_test_anx, y_train_str, y_test_str

input_dim = X_train.shape[1]  # 27 features

# ------------------------- BUILD MODEL -------------------------
inputs = Input(shape=(input_dim,))

# Shared hidden layers
x = Dense(64, activation='relu')(inputs)
x = Dropout(0.3)(x)
x = Dense(32, activation='relu')(x)
x = Dropout(0.2)(x)

# Output layers for each target
dep_output = Dense(y_train_dep.shape[1], activation='softmax', name='depression_output')(x)
anx_output = Dense(y_train_anx.shape[1], activation='softmax', name='anxiety_output')(x)
str_output = Dense(y_train_str.shape[1], activation='softmax', name='stress_output')(x)

# Create model
model = Model(inputs=inputs, outputs=[dep_output, anx_output, str_output])

# Compile model
# model.compile(optimizer=Adam(learning_rate=0.001),
#               loss='categorical_crossentropy',
#               metrics=['accuracy'])

model.compile(optimizer=Adam(learning_rate=0.001),
              loss='categorical_crossentropy',
              metrics=['accuracy', 'accuracy', 'accuracy'])

model.summary()

# ------------------------- TRAIN MODEL -------------------------
early_stop = EarlyStopping(monitor='val_loss', patience=10, restore_best_weights=True)

history = model.fit(
    X_train,
    [y_train_dep, y_train_anx, y_train_str],
    validation_split=0.2,
    epochs=50,
    batch_size=32,
    callbacks=[early_stop]
)

# ------------------------- SAVE MODEL -------------------------
model.save("models/ann_model.h5")
print("Model saved as models/ann_model.h5")

# Optional: save training history
joblib.dump(history.history, "models/training_history.pkl")
print("Training history saved as models/training_history.pkl")
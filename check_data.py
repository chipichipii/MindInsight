import pandas as pd

# Load dataset
data = pd.read_csv("dass.csv")

# Show first 5 rows
print("First 5 rows:")
print(data.head())

# Show column names
print("\nColumns:")
print(data.columns)

# Show dataset shape
print("\nShape of dataset:")
print(data.shape)

# Check missing values
print("\nMissing values:")
print(data.isnull().sum())

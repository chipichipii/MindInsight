import pandas as pd

data = pd.read_csv("dass.csv")

print("Unique Depression Levels:")
print(sorted(data["Depression_Level"].unique()))

print("\nUnique Anxiety Levels:")
print(sorted(data["Anxiety_Level"].unique()))

print("\nUnique Stress Levels:")
print(sorted(data["Stress_Level"].unique()))
import requests

url = "http://127.0.0.1:5000/predict"

# Example input (27 answers for your model)
data = {
    "answers": [1,2,1,3,4,0,1,2,3,1,0,2,3,1,2,3,1,2,3,2,1,0,1,2,3,1,2]
}

response = requests.post(url, json=data)
print(response.json())
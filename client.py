# client.py
import requests
import json

url = 'http://127.0.0.1:3000/calculate'




payload = {'a': 5, 'b': 3, 'operation': 'add'}
response = requests.post(url, json=payload)

if response.status_code == 200:
    print('Result:', response.json()['result'])
else:
    print('Error:', response.json().get('error', 'Unknown error'))

# rmultiplicatoons
#payload = {'a': 4, 'b': 1/2, 'operation': 'multiply'}
#response = requests.post(url, json=payload)
# print('Multiply result:', response.json()['result'])
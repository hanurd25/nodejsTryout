# client.py
import requests
import json

url = 'http://127.0.0.1:3000/calculate'

# Example: add 5 and 3



payload = {'a': 5, 'b': 3, 'operation': 'add'}
response = requests.post(url, json=payload)

if response.status_code == 200:
    print('Result:', response.json()['result'])
else:
    print('Error:', response.json().get('error', 'Unknown error'))

# Example: multiply 4 by 7
payload = {'a': 4, 'b': 7, 'operation': 'multiply'}
response = requests.post(url, json=payload)
print('Multiply result:', response.json()['result'])
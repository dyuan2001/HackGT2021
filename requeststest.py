import requests

url = 'http://127.0.0.1:8000/'
myobj = {'': ''}

x = requests.get(url + '/GetUser')

print(x.text)
from flask import Flask
from flask_cors import CORS

app = Flask(__name__) # initialize flask
CORS(app) # deals with cross origin resource sharing (don't remove)

@app.route('/')
def Hello():
    return "Hello, World!"

'''
HOW TO RUN THIS SERVER: make sure python and flask are installed.
1. Open up a terminal and go to the directory this file is in.
2. Windows: run `set FLASK_APP=flask_example.py`
   Mac/Linux:run `export FLASK_APP=flask_example.py`
3. Run `flask run`
4. Open 'localhost:5000' in your browser.

Keep in mind every time you edit the file, you need to restart the server with `flask run`
'''

# TODO: Create a function called name with the route called 'name'. Return your name in a string.


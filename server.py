from flask import Flask, send_from_directory
import os

app = Flask(__name__, static_url_path='')

@app.route('/timer')
def give_timer():
    return send_from_directory('.', 'index.html')

@app.route('/dist/<path:path>')
def send_js(path):
    return send_from_directory('dist', path)

if __name__ == '__main__':
    # app.run(port=8081) # development
    app.run(port=80, host='0.0.0.0') # production

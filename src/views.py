from flask import request, jsonify
from src.database import *
from src import app

@app.route('/map-data/', methods=['POST'])
def map_data():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'Invalid JSON data'})
    return jsonify({'message': 'Map data received', 'data': data})

@app.route('/event-data/', methods=['GET'])
def event_data():
    data = request.get_json()
    if not data:
        return {'error': 'Invalid JSON data'}
    return jsonify({'message': 'Event data received', 'data': data}), 400
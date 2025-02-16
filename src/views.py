from flask import request, jsonify
from src import app, db
from src.models import Event

@app.route('/map-data/', methods=['GET'])
def map_data():
    events = db.session.execute(db.select(Event.id, Event.latitude, Event.longitude, Event.city)).all()
    event_list = [
        {"id": event.id, "position": [event.latitude, event.longitude], "city": event.city}
        for event in events
    ]

    return jsonify(event_list)

@app.route('/event-data/', methods=['POST'])
def event_data():
    data = request.get_json()

    if not data:
        return jsonify({'error': 'Invalid JSON data'}), 400
    if 'id' not in data:
        return jsonify({'error': 'Missing event ID'}), 400
    
    event = db.session.get(Event, data['id'])

    if not event:
        return jsonify({'error': 'Event not found'}), 404
    
    event_data = {
        "city": event.city,
        "country": event.country,
        "title": event.title,
        "content": event.content,
        "category": event.category,
        "date": event.date.strftime("%Y-%m-%d"),
        "link": event.link
    }

    return jsonify(event_data), 200
-- Create the event table
CREATE TABLE event (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    latitude REAL,
    longitude REAL,
    city TEXT,
    state TEXT CHECK(LENGTH(state) <= 10),
    country TEXT CHECK(LENGTH(country) <= 50),
    title TEXT,
    content TEXT,
    category TEXT CHECK(LENGTH(category) <= 30),
    date DATE,
    link TEXT
);

-- Insert sample data
INSERT INTO event (latitude, longitude, city, state, country, title, content, category, date, link) VALUES 
    (37.7749, -122.4194, 'San Francisco', 'CA', 'USA', 'Tech Conference', 'A big tech event.', 'Technology', '2025-06-15', 'https://example.com/event1'),
    (40.7128, -74.0060, 'New York', 'NY', 'USA', 'Music Festival', 'Live music festival.', 'Music', '2025-07-20', 'https://example.com/event2');

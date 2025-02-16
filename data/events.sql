-- Create the event table
CREATE TABLE event (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    latitude REAL,
    longitude REAL,
    city TEXT,
    country TEXT CHECK(LENGTH(country) <= 50),
    title TEXT,
    content TEXT,
    category TEXT CHECK(LENGTH(category) <= 30),
    date DATE,
    link TEXT
);

-- Insert sample data
INSERT INTO event (id, latitude, longitude, city, country, title, content, category, date, link) VALUES 
    (1, 37.7749, -122.4194, 'San Francisco', 'USA', 'Tech Conference', 'A big tech event.', 'Natural disaster', '2025-06-15', 'https://example.com/event1'),
    (2, 40.7128, -74.0060, 'New York', 'USA', 'Music Festival', 'Live music festival.', 'Health and disease', '2025-07-20', 'https://example.com/event2');

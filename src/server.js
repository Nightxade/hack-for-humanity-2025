const express = require('express');
const path = require('path');

const hostname = '127.0.0.1';
const port = 3000;

const app = express();

// Serve static files (CSS, JS, images) from `src/static/`
app.use('/static', express.static(path.join(__dirname, 'static')));

// Serve index.html when visiting `/`
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates/index.html'));
});

// Serve about.html when visiting `/about`
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates/about.html'));
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
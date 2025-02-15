const express = require('express');
const axios = require('axios');
const path = require('path');

const hostname = '127.0.0.1';
const port = 3000;
const flask_port = 5000;

const app = express();

// Serve static files (CSS, JS, images) from `src/static/`
app.use('/static', express.static(path.join(__dirname, '..')));

// Serve index.html when visiting `/`
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../templates/index.html'));
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
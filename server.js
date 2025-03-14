const express = require('express');
const path = require('path');
const app = express();

// Serve only the index.html file from root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve necessary assets (CSS, JS, audio) only when requested by index.html
app.get('/styles.css', (req, res, next) => {
    if (req.headers.referer && req.headers.referer.includes(req.headers.host)) {
        res.sendFile(path.join(__dirname, 'styles.css'));
    } else {
        res.status(404).send('Not found');
    }
});

app.get('/script.js', (req, res, next) => {
    if (req.headers.referer && req.headers.referer.includes(req.headers.host)) {
        res.sendFile(path.join(__dirname, 'script.js'));
    } else {
        res.status(404).send('Not found');
    }
});

app.get('/main.mp3', (req, res, next) => {
    if (req.headers.referer && req.headers.referer.includes(req.headers.host)) {
        res.sendFile(path.join(__dirname, 'main.mp3'));
    } else {
        res.status(404).send('Not found');
    }
});

// Handle 404 for all other routes
app.use((req, res) => {
    res.status(404).send('Not found');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 
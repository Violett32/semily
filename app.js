const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser'); // Uncomment if you need to parse request bodies

const app = express();
const db = new sqlite3.Database(path.join(__dirname, 'db.sqlite'));
const port = process.env.PORT || 3000;

db.run(`
    CREATE TABLE IF NOT EXISTS reviews (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        rating INTEGER NOT NULL,
        comment TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`);

// Middleware to parse JSON bodies
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

app.get('/catalog', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'catalog.html'));
});
app.get('/product', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'product.html'));
});
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'about-us.html'));
});
app.get('/check-lists', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'check-list-cataloge-page.html'));
});
app.get('/check-list-page', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'check-list-page.html'));
});
app.get('/liked', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'liked.html'));
});
app.get('/account', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'account.html'));
});


app.post('/reviews', (req, res) => {
    const { name, rating, comment } = req.body;
    if (!name || !rating) {
        return res.status(400).json({ error: 'Name and rating are required' });
    }
    parsedRating = parseInt(rating, 10);
    if (typeof parsedRating !== 'number' || rating < 1 || rating > 5) {
        return res.status(400).json({ error: 'Rating must be a number between 1 and 5' });
    }

    db.run(
        'INSERT INTO reviews (name, rating, comment) VALUES (?, ?, ?)',
        [name, rating, comment],
        function(err) {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            res.status(200).json({ id: this.lastID });
        }
    );
});


app.get('/reviews', (req, res) => {
    db.all('SELECT * FROM reviews ORDER BY created_at DESC', [], (err, rows) => {
        if (err) {
            console.error('Ошибка при получении отзывов:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(rows);
    });
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});

const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

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
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
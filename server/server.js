const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const db = require('./config/db');
const data = require('../src/MOCK_DATA.json');

app.get('/api/products', (req, res) => {
    res.send({ products : data });
})

app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`);
})
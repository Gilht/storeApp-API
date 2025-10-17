const express = require('express');
const router = express.Router();

const db = require('..db/database');

app.get('/', (req, res) => {
   res.send('products list');
});

app.get('/:id', (req, res) => {
   res.send(`product detail by id ${req.params.id}`);
});

module.exports = router;
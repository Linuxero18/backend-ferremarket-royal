const express = require('express');
const db = require('./connection');
const router = express.Router();

router.get('/', (req, res) => {
    db.query('SELECT * FROM productos', (err, rows) => {
        if(err) {
            console.log('Error al obtener los productos' + err);
        }
        res.json(rows);
    });
});

module.exports = router;

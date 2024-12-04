const express = require('express');
const db = require('../connection');
const router = express.Router();

router.get('/', (req, res) => {
    db.query('SELECT * FROM ventas', (err, rows) => {
        if(err) {
            console.log('Error al obtener las ventas' + err);
        }
        res.json(rows);
    });
});
const express = require('express');
const db = require('./connection');
const router = express.Router();

router.get('/', (req, res) => {
    db.query('SELECT * FROM detalleventas', (err, rows) => {
        if(err) {
            console.log('Error al obtener los detalles de ventas' + err);
        }
        res.json(rows);
    });
});

module.exports = router;
const express = require('express');
const db = require('./connection');
const router = express.Router();

router.get('/', (req, res) => {
    db.query('SELECT * FROM detallecompras', (err, rows) => {
        if(err) {
            console.log('Error al obtener los detalles de compras' + err);
        }
        res.json(rows);
    });
});

module.exports = router;
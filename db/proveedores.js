const express = require('express');
const db = require('./connection');
const router = express.Router();

router.get('/', (req, res) => {
    db.query('SELECT * FROM proveedores', (err, rows) => {
        if(err) {
            console.log('Error al obtener los proveedores' + err);
        }
        res.json(rows);
    });
});

module.exports = router;
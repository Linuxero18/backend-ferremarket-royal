const express = require('express');
const db = require('./connection');
const router = express.Router();

router.get('/', (req, res) => {
    db.query('SELECT * FROM categorias', (err, rows) => {
        if(err) {
            console.log('Error al obtener las categorias' + err);
        }
        res.json(rows);
    });
});

module.exports = router;
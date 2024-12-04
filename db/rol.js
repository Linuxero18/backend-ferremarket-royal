const express = require('express');
const db = require('../connection');
const router = express.Router();

router.get('/', (req, res) => {
    db.query('SELECT * FROM rol', (err, rows) => {
        if(err) {
            console.log('Error al obtener los roles' + err);
        }
        res.json(rows);
    });
});
const express = require('express');
const db = require('../connection');
const router = express.Router();

router.get('/', (req, res) => {
    db.query('SELECT * FROM usuarios', (err, rows) => {
        if(err) {
            console.log('Error al obtener los usuarios' + err);
        }
        res.json(rows);
    });
});
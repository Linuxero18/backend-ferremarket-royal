const express = require('express');
const db = require('./connection');
const router = express.Router();

router.get('/', (req, res) => {
    db.query('SELECT * FROM rol', (err, rows) => {
        if(err) {
            console.log('Error al obtener los roles' + err);
        }
        res.json(rows);
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM rol WHERE id = ?', [id], (err, rows) => {
        if(err) {
            console.log('Error al obtener el rol' + err);
        }
        res.json(rows);
    });
});

router.post('/', (req, res) => {
    const { nombre } = req.body;
    db.query('INSERT INTO rol (nombre) VALUES (?)', [nombre], (err, rows) => {
        if(err) {
            console.log('Error al insertar el rol' + err);
        }
        res.json({status: 'Rol insertado'});
    });
});

router.put('/:id', (req, res) => {
    const { nombre } = req.body;
    const { id } = req.params;
    db.query('UPDATE rol SET nombre = ? WHERE id = ?', [nombre, id], (err, rows) => {
        if(err) {
            console.log('Error al actualizar el rol' + err);
        }
        res.json({status: 'Rol actualizado'});
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM rol WHERE id = ?', [id], (err, rows) => {
        if(err) {
            console.log('Error al eliminar el rol' + err);
        }
        res.json({status: 'Rol eliminado'});
    });
});

module.exports = router;
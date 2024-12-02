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

router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM proveedores WHERE id = ?', [id], (err, rows) => {
        if(err) {
            console.log('Error al obtener el proveedor' + err);
        }
        res.json(rows);
    });
});

router.post('/', (req, res) => {
    const { nombre, direccion, telefono } = req.body;
    db.query('INSERT INTO proveedores (nombre, direccion, telefono) VALUES (?, ?, ?)', [nombre, direccion, telefono], (err, rows) => {
        if(err) {
            console.log('Error al insertar el proveedor' + err);
        }
        res.json({status: 'Proveedor insertado'});
    });
});

router.put('/:id', (req, res) => {
    const { nombre, direccion, telefono } = req.body;
    const { id } = req.params;
    db.query('UPDATE proveedores SET nombre = ?, direccion = ?, telefono = ? WHERE id = ?', [nombre, direccion, telefono, id], (err, rows) => {
        if(err) {
            console.log('Error al actualizar el proveedor' + err);
        }
        res.json({status: 'Proveedor actualizado'});
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM proveedores WHERE id = ?', [id], (err, rows) => {
        if(err) {
            console.log('Error al eliminar el proveedor' + err);
        }
        res.json({status: 'Proveedor eliminado'});
    });
});

module.exports = router;
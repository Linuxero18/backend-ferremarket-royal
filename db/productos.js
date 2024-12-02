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

router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM productos WHERE id = ?', [id], (err, rows) => {
        if(err) {
            console.log('Error al obtener el producto' + err);
        }
        res.json(rows);
    });
});

router.post('/', (req, res) => {
    const { nombre, descripcion, precio, stock } = req.body;
    db.query('INSERT INTO productos (nombre, descripcion, precio, stock) VALUES (?, ?, ?, ?)', [nombre, descripcion, precio, stock], (err, rows) => {
        if(err) {
            console.log('Error al insertar el producto' + err);
        }
        res.json({status: 'Producto insertado'});
    });
});

router.put('/:id', (req, res) => {
    const { nombre, descripcion, precio, stock } = req.body;
    const { id } = req.params;
    db.query('UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock = ? WHERE id = ?', [nombre, descripcion, precio, stock, id], (err, rows) => {
        if(err) {
            console.log('Error al actualizar el producto' + err);
        }
        res.json({status: 'Producto actualizado'});
    });
});

module.exports = router;

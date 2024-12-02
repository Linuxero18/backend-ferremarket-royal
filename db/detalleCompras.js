const express = require('express');
const db = require('./connection');
const router = express.Router();

router.get('/', (req, res) => {
    db.query('SELECT * FROM detalle_compras', (err, rows) => {
        if(err) {
            console.log('Error al obtener los detalles de compras' + err);
        }
        res.json(rows);
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM detalle_compras WHERE id = ?', [id], (err, rows) => {
        if(err) {
            console.log('Error al obtener el detalle de compra' + err);
        }
        res.json(rows);
    });
});

router.post('/', (req, res) => {
    const { id_compra, id_producto, cantidad, precio } = req.body;
    db.query('INSERT INTO detalle_compras (id_compra, id_producto, cantidad, precio) VALUES (?, ?, ?, ?)', [id_compra, id_producto, cantidad, precio], (err, rows) => {
        if(err) {
            console.log('Error al insertar el detalle de compra' + err);
        }
        res.json({status: 'Detalle de compra insertado'});
    });
});

router.put('/:id', (req, res) => {
    const { id_compra, id_producto, cantidad, precio } = req.body;
    const { id } = req.params;
    db.query('UPDATE detalle_compras SET id_compra = ?, id_producto = ?, cantidad = ?, precio = ? WHERE id = ?', [id_compra, id_producto, cantidad, precio, id], (err, rows) => {
        if(err) {
            console.log('Error al actualizar el detalle de compra' + err);
        }
        res.json({status: 'Detalle de compra actualizado'});
    });
});

module.exports = router;
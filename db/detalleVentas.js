const express = require('express');
const db = require('./connection');
const router = express.Router();

router.get('/', (req, res) => {
    db.query('SELECT * FROM detalle_ventas', (err, rows) => {
        if(err) {
            console.log('Error al obtener los detalles de ventas' + err);
        }
        res.json(rows);
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM detalle_ventas WHERE id = ?', [id], (err, rows) => {
        if(err) {
            console.log('Error al obtener el detalle de venta' + err);
        }
        res.json(rows);
    });
});

router.post('/', (req, res) => {
    const { id_venta, id_producto, cantidad, precio } = req.body;
    db.query('INSERT INTO detalle_ventas (id_venta, id_producto, cantidad, precio) VALUES (?, ?, ?, ?)', [id_venta, id_producto, cantidad, precio], (err, rows) => {
        if(err) {
            console.log('Error al insertar el detalle de venta' + err);
        }
        res.json({status: 'Detalle de venta insertado'});
    });
});

router.put('/:id', (req, res) => {
    const { id_venta, id_producto, cantidad, precio } = req.body;
    const { id } = req.params;
    db.query('UPDATE detalle_ventas SET id_venta = ?, id_producto = ?, cantidad = ?, precio = ? WHERE id = ?', [id_venta, id_producto, cantidad, precio, id], (err, rows) => {
        if(err) {
            console.log('Error al actualizar el detalle de venta' + err);
        }
        res.json({status: 'Detalle de venta actualizado'});
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM detalle_ventas WHERE id = ?', [id], (err, rows) => {
        if(err) {
            console.log('Error al eliminar el detalle de venta' + err);
        }
        res.json({status: 'Detalle de venta eliminado'});
    });
});

module.exports = router;
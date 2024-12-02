const express = require('express');
const db = require('./connection');
const router = express.Router();

router.get('/', (req, res) => {
    db.query('SELECT * FROM ventas', (err, rows) => {
        if(err) {
            console.log('Error al obtener las ventas' + err);
        }
        res.json(rows);
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM ventas WHERE id = ?', [id], (err, rows) => {
        if(err) {
            console.log('Error al obtener la venta' + err);
        }
        res.json(rows);
    });
});

router.post('/', (req, res) => {
    const { fecha, total, id_cliente } = req.body;
    db.query('INSERT INTO ventas (fecha, total, id_cliente) VALUES (?, ?, ?)', [fecha, total, id_cliente], (err, rows) => {
        if(err) {
            console.log('Error al insertar la venta' + err);
        }
        res.json({status: 'Venta insertada'});
    });
});

router.put('/:id', (req, res) => {
    const { fecha, total, id_cliente } = req.body;
    const { id } = req.params;
    db.query('UPDATE ventas SET fecha = ?, total = ?, id_cliente = ? WHERE id = ?', [fecha, total, id_cliente, id], (err, rows) => {
        if(err) {
            console.log('Error al actualizar la venta' + err);
        }
        res.json({status: 'Venta actualizada'});
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM ventas WHERE id = ?', [id], (err, rows) => {
        if(err) {
            console.log('Error al eliminar la venta' + err);
        }
        res.json({status: 'Venta eliminada'});
    });
});

module.exports = router;
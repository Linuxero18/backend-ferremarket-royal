const express = require('express');
const db = require('./connection');
const router = express.Router();

router.get('/', (req, res) => {
    db.query('SELECT * FROM compras', (err, rows) => {
        if(err) {
            console.log('Error al obtener las compras' + err);
        }
        res.json(rows);
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM compras WHERE id = ?', [id], (err, rows) => {
        if(err) {
            console.log('Error al obtener la compra' + err);
        }
        res.json(rows);
    });
});

router.post('/', (req, res) => {
    const { fecha, total, id_proveedor } = req.body;
    db.query('INSERT INTO compras (fecha, total, id_proveedor) VALUES (?, ?, ?)', [fecha, total, id_proveedor], (err, rows) => {
        if(err) {
            console.log('Error al insertar la compra' + err);
        }
        res.json({status: 'Compra insertada'});
    });
});

router.put('/:id', (req, res) => {
    const { fecha, total, id_proveedor } = req.body;
    const { id } = req.params;
    db.query('UPDATE compras SET fecha = ?, total = ?, id_proveedor = ? WHERE id = ?', [fecha, total, id_proveedor, id], (err, rows) => {
        if(err) {
            console.log('Error al actualizar la compra' + err);
        }
        res.json({status: 'Compra actualizada'});
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM compras WHERE id = ?', [id], (err, rows) => {
        if(err) {
            console.log('Error al eliminar la compra' + err);
        }
        res.json({status: 'Compra eliminada'});
    });
});

module.exports = router;
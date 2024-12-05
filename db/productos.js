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
    const { nombre, descripcion, categoria, precio_unitario, stock_actual, stock_minimo, id_proveedor } = req.body;
    const ultima_modificacion = new Date();  // Obtiene la fecha y hora actual

    if (!nombre || !descripcion || !categoria || !precio_unitario || !stock_actual || !stock_minimo || !id_proveedor) {
        return res.status(400).json({ status: 'Error', message: 'Todos los campos son requeridos.' });
    }

    const query = `
        INSERT INTO productos (nombre, descripcion, categoria, precio_unitario, stock_actual, stock_minimo, id_proveedor, ultima_modificacion)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [nombre, descripcion, categoria, precio_unitario, stock_actual, stock_minimo, id_proveedor, ultima_modificacion];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error al insertar el producto: ', err);
            return res.status(500).json({ status: 'Error', message: 'Error al insertar el producto.' });
        }

        res.status(201).json({ status: 'Éxito', message: 'Producto insertado correctamente', id_producto: result.insertId });
    });
});


router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, categoria, precio_unitario, stock_actual, stock_minimo, id_proveedor } = req.body;
    const ultima_modificacion = new Date();  // Obtiene la fecha y hora actual

    if (!nombre || !descripcion || !categoria || !precio_unitario || !stock_actual || !stock_minimo || !id_proveedor) {
        return res.status(400).json({ status: 'Error', message: 'Todos los campos son requeridos.' });
    }

    const query = `
        UPDATE productos
        SET nombre = ?, descripcion = ?, categoria = ?, precio_unitario = ?, stock_actual = ?, stock_minimo = ?, id_proveedor = ?, ultima_modificacion = ?
        WHERE id_producto = ?
    `;

    const values = [nombre, descripcion, categoria, precio_unitario, stock_actual, stock_minimo, id_proveedor, ultima_modificacion, id];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error al actualizar el producto: ', err);
            return res.status(500).json({ status: 'Error', message: 'Error al actualizar el producto.' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ status: 'Error', message: 'Producto no encontrado.' });
        }

        res.status(200).json({ status: 'Éxito', message: 'Producto actualizado correctamente' });
    });
});


module.exports = router;

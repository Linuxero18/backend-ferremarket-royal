const express = require('express');
const db = require('./connection');
const router = express.Router();

router.get('/', (req, res) => {
    db.query('SELECT * FROM usuarios', (err, rows) => {
        if(err) {
            console.log('Error al obtener los usuarios' + err);
        }
        res.json(rows);
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM usuarios WHERE id = ?', [id], (err, rows) => {
        if(err) {
            console.log('Error al obtener el usuario' + err);
        }
        res.json(rows);
    });
});

router.post('/', (req, res) => {
    const { nombre, apellido, email, password, rol } = req.body;
    db.query('INSERT INTO usuarios (nombre, apellido, email, password, rol) VALUES (?, ?, ?, ?, ?)', [nombre, apellido, email, password, rol], (err, rows) => {
        if(err) {
            console.log('Error al insertar el usuario' + err);
        }
        res.json({status: 'Usuario insertado'});
    });
});

router.put('/:id', (req, res) => {
    const { nombre, apellido, email, password, rol } = req.body;
    const { id } = req.params;
    db.query('UPDATE usuarios SET nombre = ?, apellido = ?, email = ?, password = ?, rol = ? WHERE id = ?', [nombre, apellido, email, password, rol, id], (err, rows) => {
        if(err) {
            console.log('Error al actualizar el usuario' + err);
        }
        res.json({status: 'Usuario actualizado'});
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM usuarios WHERE id = ?', [id], (err, rows) => {
        if(err) {
            console.log('Error al eliminar el usuario' + err);
        }
        res.json({status: 'Usuario eliminado'});
    });
});

module.exports = router;
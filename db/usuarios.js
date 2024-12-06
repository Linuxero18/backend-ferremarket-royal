const express = require('express');
const bcrypt = require('bcrypt');
const db = require('./connection');
const router = express.Router();

const conPromise = db.promise();

//Endpoint para obtener todos los usuarios
router.get('/data', async (req, res) => {
    try {
      const [rows] = await conPromise.query(`
        SELECT 
          usuarios.id_usuario, 
          usuarios.nombre_usuario, 
          usuarios.email, 
          usuarios.password, 
          rol.nombre_rol
        FROM 
          usuarios
        INNER JOIN 
          rol 
        ON 
          usuarios.id_rol = rol.id_rol
      `);
      res.json(rows);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener los usuarios" });
    }
  });











//Endpoint para registrar un nuevo usuario
router.post('/', async (req, res) => {
    const { nombre_usuario, email, password, id_rol = 1 } = req.body;

    try {
        // Validar que todos los campos requeridos estén presentes
        if (!nombre_usuario || !email || !password) {
            return res.status(400).json({ message: 'Todos los campos son requeridos (nombre_usuario, email, password)' });
        }

        // Verificar si el usuario ya existe
        const [rows] = await db.promise().query('SELECT * FROM usuarios WHERE nombre_usuario = ?', [nombre_usuario]);

        if (rows.length > 0) {
            return res.status(400).json({ message: 'El usuario ya está registrado' });
        }

        // Encriptar la contraseña utilizando bcrypt
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Insertar el nuevo usuario en la base de datos
        const query = 'INSERT INTO usuarios (nombre_usuario, email, password, id_rol) VALUES (?, ?, ?, ?)';
        await db.promise().query(query, [nombre_usuario, email, hashedPassword, id_rol]);

        res.status(201).json({ message: 'Usuario registrado correctamente' });

    } catch (err) {
        console.log('Error en el servidor: ' + err);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});
//Endpoint para iniciar sesión
router.post('/login', async (req, res) => {
    const { nombre_usuario, password } = req.body;

    try {
        if (!nombre_usuario || !password) {
            return res.status(400).json({ message: 'Todos los campos son requeridos (nombre_usuario, password)' });
        }

        const [rows] = await db.promise().query('SELECT * FROM usuarios WHERE nombre_usuario = ?', [nombre_usuario]);

        if (rows.length === 0) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }

        const match = await bcrypt.compare(password, rows[0].password);

        if (!match) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        res.status(200).json({ message: 'Inicio de sesión exitoso', user: rows[0] });

    } catch (err) {
        console.log('Error en el servidor: ' + err);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});


module.exports = router;
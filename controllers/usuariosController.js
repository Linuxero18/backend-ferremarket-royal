const bcrypt = require('bcrypt');
const db = require('../config/connection');
const { getAllUsers, getUserByUsername, registerUser } = require('../models/usuariosModel');

// Controlador para obtener todos los usuarios
const getAllUsersController = async (req, res) => {
    try {
        const rows = await getAllUsers();
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los usuarios" });
    }
};

// Controlador para registrar un nuevo usuario
const registerUserController = async (req, res) => {
    const { nombre_usuario, email, password, id_rol = 1 } = req.body;
    try {
        // Validar campos
        if (!nombre_usuario || !email || !password) {
            return res.status(400).json({ message: 'Todos los campos son requeridos (nombre_usuario, email, password)' });
        }

        const existingUser = await getUserByUsername(nombre_usuario);
        if (existingUser) {
            return res.status(400).json({ message: 'El usuario ya está registrado' });
        }

        // Encriptar la contraseña
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Registrar el nuevo usuario
        await registerUser(nombre_usuario, email, hashedPassword, id_rol);
        res.status(201).json({ message: 'Usuario registrado correctamente' });
    } catch (err) {
        res.status(500).json({ message: 'Error al registrar el usuario' });
    }
};

// Controlador para iniciar sesión
const loginController = async (req, res) => {
    const { nombre_usuario, password } = req.body;

    try {
        const user = await getUserByUsername(nombre_usuario);

        if (!user) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        res.status(200).json({ message: 'Inicio de sesión exitoso', user });
    } catch (err) {
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
};

module.exports = { getAllUsersController, registerUserController, loginController };

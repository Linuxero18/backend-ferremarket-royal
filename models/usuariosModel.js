const db = require('../config/connection');

// Modelo para obtener todos los usuarios
const getAllUsers = async () => {
    const [rows] = await db.promise().query('SELECT * FROM usuarios');
    return rows;
};

// Modelo para obtener un usuario por nombre de usuario
const getUserByUsername = async (nombre_usuario) => {
    const [rows] = await db.promise().query('SELECT * FROM usuarios WHERE nombre_usuario = ?', [nombre_usuario]);
    return rows[0];  // Retorna el primer resultado (el usuario)
};

// Modelo para registrar un nuevo usuario
const registerUser = async (nombre_usuario, email, hashedPassword, id_rol) => {
    const query = 'INSERT INTO usuarios (nombre_usuario, email, password, id_rol) VALUES (?, ?, ?, ?)';
    await db.promise().query(query, [nombre_usuario, email, hashedPassword, id_rol]);
};

module.exports = { getAllUsers, getUserByUsername, registerUser };

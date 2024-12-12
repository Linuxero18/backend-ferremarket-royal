const db = require('../config/connection');

// Modelo para obtener todos los usuarios
const getAllUsers = async () => {
    const [rows] = await db.promise().query(`
        SELECT u.id_usuario, 
            u.nombre_usuario, 
            u.email, 
            u.password, 
            r.nombre_rol
        FROM usuarios u 
        INNER JOIN rol r ON u.id_rol = r.id_rol
    `);
    return rows;
};

// Modelo para obtener un usuario por ID
const getUserById = async (id_usuario) => {
    const [rows] = await db.promise().query('SELECT * FROM usuarios WHERE id_usuario = ?', [id_usuario]);
    return rows[0];  // Retorna el primer resultado (el usuario)
};

// Modelo para eliminar un usuario por ID
const deleteUserById = async (id_usuario) => {
    const query = 'DELETE FROM usuarios WHERE id_usuario = ?';
    await db.promise().query(query, [id_usuario]);
};

// Modelo para actualizar un usuario por ID
const updateUserById = async (id_usuario, nombre_usuario, email, id_rol) => {
    const query = `
        UPDATE usuarios
        SET nombre_usuario = ?, email = ?, id_rol = ?
        WHERE id_usuario = ?
    `;
    await db.promise().query(query, [nombre_usuario, email, id_rol, id_usuario]);
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

module.exports = { getAllUsers, getUserById, getUserByUsername, registerUser, deleteUserById, updateUserById};

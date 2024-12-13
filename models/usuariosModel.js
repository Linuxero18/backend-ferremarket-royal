const db = require('../config/connection');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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
        ORDER BY u.id_usuario ASC
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

const updateUserById = async (id_usuario, nombre_usuario, email, id_rol, password) => {
    try {
        // Si no hay contraseña, actualizamos solo nombre_usuario, email y id_rol
        let query = `UPDATE usuarios SET nombre_usuario = ?, email = ?, id_rol = ? WHERE id_usuario = ?`;
        let values = [nombre_usuario, email, id_rol, id_usuario];
        
        // Si hay una nueva contraseña, la hasheamos y actualizamos también
        if (password) {
            console.log("Actualizando contraseña:", password);
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            console.log("Contraseña hasheada:", hashedPassword);

            // Actualizamos la consulta para incluir la contraseña
            query = `UPDATE usuarios SET nombre_usuario = ?, email = ?, password = ?, id_rol = ? WHERE id_usuario = ?`;
            values = [nombre_usuario, email, hashedPassword, id_rol, id_usuario];
        }

        console.log("Consulta SQL:", query); // Imprime la consulta SQL completa
        console.log("Valores:", values); // Imprime los valores que se pasan a la consulta

        // Ejecuta la consulta
        const [result] = await db.promise().query(query, values);
        
        // Verifica si la actualización afectó filas
        if (result.affectedRows > 0) {
            console.log("Usuario actualizado correctamente");
            return { message: "Usuario actualizado correctamente" };
        } else {
            console.log("No se encontró el usuario o no hubo cambios");
            return { message: "No se encontró el usuario o no hubo cambios" };
        }
    } catch (error) {
        console.error("Error en la actualización:", error);
        return { message: "Error en la actualización", error: error.message };
    }
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

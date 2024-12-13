const db = require('../config/connection');

// Modelo para obtener todos los proveedores
const getAllSuppliers = async () => {
    const [rows] = await db.promise().query('SELECT * FROM proveedores');
    return rows;
};

// Modelo para obtener un proveedores por ID
const getSupplierById = async (id_proveedor) => {
    const [rows] = await db.promise().query('SELECT * FROM proveedores WHERE id_proveedor = ?', [id_proveedor]);
    return rows[0];  // Retorna el primer resultado (el usuario)
};

// Modelo para eliminar un usuario por ID
const deleteSupplierById = async (id_usuario) => {
    const query = 'DELETE FROM proveedores WHERE id_proveedor = ?';
    await db.promise().query(query, [id_usuario]);
};

// Modelo para actualizar un usuario por ID
const updateSupplierById = async (id_usuario, nombre_usuario, email, id_rol) => {
    const query = `
        UPDATE proveedores
        SET nombre_proveedor = ?, contacto = ?, telefono = ?
        WHERE id_proveedor = ?
    `;
    await db.promise().query(query, [nombre_usuario, email, id_rol, id_usuario]);
};

module.exports = { getAllSuppliers, getSupplierById, deleteSupplierById, updateSupplierById };

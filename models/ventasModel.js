const db = require('../config/connection');

// Modelo para obtener todas las ventas
const getAllSales = async () => {
    const [rows] = await db.promise().query(`
        SELECT v.id_venta, 
            v.fecha_venta, 
            v.total_venta, 
            u.nombre_usuario
        FROM ventas v 
        INNER JOIN usuarios u ON v.id_usuario = u.id_usuario
        ORDER BY v.id_venta ASC
    `);
    return rows;
};

// Modelo para obtener una venta por ID
const getSaleById = async (id_venta) => {
    const [rows] = await db.promise().query('SELECT * FROM ventas WHERE id_venta = ?', [id_venta]);
    return rows[0];  // Retorna el primer resultado (la venta)
};

// Modelo para agregar una venta
const addSale = async (fecha_venta, id_usuario, total_venta) => {
    const query = 'INSERT INTO ventas (fecha_venta, id_usuario, total_venta) VALUES (?, ?, ?)';
    const [result] = await db.promise().query(query, [fecha_venta, id_usuario, total_venta]);
    return result.insertId;
};

// Modelo para actualizar una venta por ID
const updateSaleById = async (id_venta, fecha_venta, total_venta) => {
    const query = 'UPDATE ventas SET fecha_venta = ?, total_venta = ? WHERE id_venta = ?';
    await db.promise().query(query, [fecha_venta, total_venta, id_venta]);
};

// Modelo para eliminar una venta por ID
const deleteSaleById = async (id_venta) => {
    const query = 'DELETE FROM ventas WHERE id_venta = ?';
    await db.promise().query(query, [id_venta]);
};

module.exports = {
    getAllSales,
    getSaleById,
    addSale,
    updateSaleById,
    deleteSaleById
};

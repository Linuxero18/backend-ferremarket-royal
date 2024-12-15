const db = require('../config/connection');

// Modelo para obtener todos los detalles de las ventas
const getAllSalesDetails = async () => {
    const [rows] = await db.promise().query(`
        SELECT dv.id_detalleventa,
                v.id_venta,
                p.nombre,
                dv.cantidad,
                dv.precio_unitario
        FROM detalleventas dv
        INNER JOIN ventas v ON dv.id_venta = v.id_venta
        INNER JOIN productos p ON dv.id_producto = p.id_producto
        ORDER BY dv.id_detalleventa ASC
    `);
    return rows;
}

// Modelo para obtener un detalle de venta por ID
const getSaleDetailById = async (id_detalleventa) => {
    const [rows] = await db.promise().query('SELECT * FROM detalleventas WHERE id_detalleventa = ?', [id_detalleventa]);
    return rows[0];  // Retorna el primer resultado (detalle de venta)
};

// Modelo para obtener un detalle de venta por id_venta
const getSaleDetailBySaleId = async (id_venta) => {
    const [rows] = await db.promise().query(`
        SELECT dv.id_detalleventa,
            dv.id_venta,
            p.id_producto,
            p.nombre,
            dv.cantidad,
            dv.precio_unitario
        FROM detalleventas dv
        INNER JOIN productos p ON dv.id_producto = p.id_producto
        WHERE id_venta = ?
        ORDER BY id_venta ASC`, [id_venta]);
    return rows;  // Retorna el detalle de venta
};

// Modelo para agregar un detalle de venta
const addSaleDetail = async (id_venta, id_producto, cantidad, precio_unitario) => {
    const query = 'INSERT INTO detalleventas (id_venta, id_producto, cantidad, precio_unitario) VALUES (?, ?, ?, ?)';
    const [result] = await db.promise().query(query, [id_venta, id_producto, cantidad, precio_unitario]);
    return result.insertId;
};

// Modelo para actualizar un detalle de venta por ID
const updateSaleDetailById = async (id_detalleventa, id_venta, id_producto, cantidad, precio_unitario) => {
    const query = 'UPDATE detalleventas SET id_venta = ?, id_producto = ?, cantidad = ?, precio_unitario = ? WHERE id_detalleventa = ?';
    await db.promise().query(query, [id_venta, id_producto, cantidad, precio_unitario, id_detalleventa]);
};

// Modelo para eliminar un detalle de venta por ID
const deleteSaleDetailById = async (id_detalleventa) => {
    const query = 'DELETE FROM detalleventas WHERE id_detalleventa = ?';
    await db.promise().query(query, [id_detalleventa]);
};


module.exports = { getAllSalesDetails, getSaleDetailById, getSaleDetailBySaleId, addSaleDetail, updateSaleDetailById, deleteSaleDetailById };
const db = require('../config/connection');

// Obtener todos los productos con detalles de categoría y proveedor
const getAllProducts = () => {
    const query = `
        SELECT 
            productos.id_producto,
            productos.nombre,
            productos.descripcion,
            categorias.nombre_categoria AS categoria,
            productos.precio_unitario,
            productos.stock_actual,
            productos.stock_minimo,
            proveedores.nombre_proveedor AS proveedor
        FROM 
            productos
        LEFT JOIN 
            categorias ON productos.id_categoria = categorias.id_categoria
        LEFT JOIN 
            proveedores ON productos.id_proveedor = proveedores.id_proveedor
        ORDER BY productos.id_producto ASC;
    `;

    return new Promise((resolve, reject) => {
        db.query(query, (err, rows) => {
            if (err) {
                reject(`Error al obtener los productos: ${err}`);
            } else {
                console.log(rows);
                resolve(rows);
            }
        });
    });
};

// Obtener un producto por ID
const getProductById = (id) => {
    const query = `
        SELECT 
            productos.id_producto,
            productos.nombre,
            productos.descripcion,
            categorias.nombre_categoria AS categoria,
            productos.precio_unitario,
            productos.stock_actual,
            productos.stock_minimo,
            proveedores.nombre_proveedor AS proveedor
        FROM 
            productos
        LEFT JOIN 
            categorias ON productos.id_categoria = categorias.id_categoria
        LEFT JOIN 
            proveedores ON productos.id_proveedor = proveedores.id_proveedor
        WHERE productos.id_producto = ?;
    `;

    return new Promise((resolve, reject) => {
        db.query(query, [id], (err, rows) => {
            if (err) {
                reject(`Error al obtener el producto: ${err}`);
            } else if (rows.length === 0) {
                resolve(null); // Producto no encontrado
            } else {
                resolve(rows[0]);
            }
        });
    });
};

// Insertar un producto
const addProduct = (producto) => {
    const { nombre, descripcion, id_categoria, precio_unitario, stock_actual, stock_minimo, id_proveedor } = producto;
    console.log(id_categoria);
    console.log(producto);

    const query = `
        INSERT INTO productos (nombre, descripcion, id_categoria, precio_unitario, stock_actual, stock_minimo, id_proveedor)
        VALUES (?, ?, ?, ?, ?, ?, ?);
    `;
    const values = [nombre, descripcion, id_categoria, precio_unitario, stock_actual, stock_minimo, id_proveedor];

    return new Promise((resolve, reject) => {
        db.query(query, values, (err, result) => {
            if (err) {
                reject(`Error al insertar el producto: ${err}`);
            } else {
                resolve(result.insertId);
            }
        });
    });
};

// Actualizar un producto
const updateProduct = (id, producto) => {
    const { nombre, descripcion, id_categoria, precio_unitario, stock_actual, stock_minimo, id_proveedor } = producto;
    const query = `
        UPDATE productos
        SET nombre = ?, descripcion = ?, id_categoria = ?, precio_unitario = ?, stock_actual = ?, stock_minimo = ?, id_proveedor = ?
        WHERE id_producto = ?;
    `;
    const values = [nombre, descripcion, id_categoria, precio_unitario, stock_actual, stock_minimo, id_proveedor, id];

    return new Promise((resolve, reject) => {
        db.query(query, values, (err, result) => {
            if (err) {
                reject(`Error al actualizar el producto: ${err}`);
            } else {
                resolve(result);
            }
        });
    });
};

// Eliminar un producto
const deleteProduct = (id) => {
    const query = 'DELETE FROM productos WHERE id_producto = ?';

    return new Promise((resolve, reject) => {
        db.query(query, [id], (err, result) => {
            if (err) {
                reject(`Error al eliminar el producto: ${err}`);
            } else {
                resolve(result);
            }
        });
    });
};

module.exports = {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
};

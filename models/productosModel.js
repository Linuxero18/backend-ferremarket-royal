const db = require('../config/connection');

// Obtener todos los productos
const obtenerProductos = () => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
                productos.id_producto,
                productos.nombre,
                productos.descripcion,
                categorias.nombre_categoria,
                productos.precio_unitario,
                productos.stock_actual,
                productos.stock_minimo,
                proveedores.nombre_proveedor
            FROM 
                productos
            INNER JOIN 
                categorias ON productos.id_categoria = categorias.id_categoria
            INNER JOIN 
                proveedores ON productos.id_proveedor = proveedores.id_proveedor
            ORDER BY productos.id_producto ASC;
        `;
        
        db.query(query, (err, rows) => {
            if (err) {
                reject('Error al obtener los productos: ' + err);
            } else {
                resolve(rows);
            }
        });
    });
};


// Obtener un producto por ID
const obtenerProductoPorId = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM productos WHERE id_producto = ?', [id], (err, rows) => {
            if (err) {
                reject('Error al obtener el producto: ' + err);
            } else {
                resolve(rows);
            }
        });
    });
};

// Insertar un producto
const insertarProducto = (producto) => {
    const { nombre, descripcion, id_categoria, precio_unitario, stock_actual, stock_minimo, id_proveedor } = producto;
    const query = `
        INSERT INTO productos (nombre, descripcion, id_categoria, precio_unitario, stock_actual, stock_minimo, id_proveedor)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [nombre, descripcion, id_categoria, precio_unitario, stock_actual, stock_minimo, id_proveedor];

    return new Promise((resolve, reject) => {
        db.query(query, values, (err, result) => {
            if (err) {
                reject('Error al insertar el producto: ' + err);
            } else {
                resolve(result.insertId);
            }
        });
    });
};

// Actualizar un producto
const actualizarProducto = (id, producto) => {
    const { nombre, descripcion, categoria, precio_unitario, stock_actual, stock_minimo, id_proveedor} = producto;
    const query = `
        UPDATE productos
        SET nombre = ?, descripcion = ?, id_categoria = ?, precio_unitario = ?, stock_actual = ?, stock_minimo = ?, id_proveedor = ?
        WHERE id_producto = ?
    `;
    const values = [nombre, descripcion, categoria, precio_unitario, stock_actual, stock_minimo, id_proveedor, id];

    return new Promise((resolve, reject) => {
        db.query(query, values, (err, result) => {
            if (err) {
                reject('Error al actualizar el producto: ' + err);
            } else {
                resolve(result);
            }
        });
    });
};

// Eliminar un producto
const eliminarProducto = (id) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM productos WHERE id_producto = ?', [id], (err, result) => {
            if (err) {
                reject('Error al eliminar el producto: ' + err);
            } else {
                resolve(result);
            }
        });
    });
};

module.exports = {
    obtenerProductos,
    obtenerProductoPorId,
    insertarProducto,
    actualizarProducto,
    eliminarProducto
};

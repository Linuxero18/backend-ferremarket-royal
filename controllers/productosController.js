const productosModel = require('../models/productosModel');

// Obtener todos los productos
const obtenerProductos = async (req, res) => {
    try {
        const productos = await productosModel.obtenerProductos();
        res.json(productos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'Error', message: 'Error al obtener los productos' });
    }
};

// Obtener un producto por ID
const obtenerProductoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const producto = await productosModel.obtenerProductoPorId(id);
        if (producto.length === 0) {
            return res.status(404).json({ status: 'Error', message: 'Producto no encontrado' });
        }
        res.json(producto[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'Error', message: 'Error al obtener el producto' });
    }
};

// Insertar un nuevo producto
const insertarProducto = async (req, res) => {
    const { nombre, descripcion, categoria, precio_unitario, stock_actual, stock_minimo, id_proveedor } = req.body;
    const ultima_modificacion = new Date();

    if (!nombre || !descripcion || !categoria || !precio_unitario || !stock_actual || !stock_minimo || !id_proveedor) {
        return res.status(400).json({ status: 'Error', message: 'Todos los campos son requeridos.' });
    }

    const producto = { nombre, descripcion, categoria, precio_unitario, stock_actual, stock_minimo, id_proveedor, ultima_modificacion };
    try {
        const insertId = await productosModel.insertarProducto(producto);
        res.status(201).json({ status: 'Éxito', message: 'Producto insertado correctamente', id_producto: insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'Error', message: 'Error al insertar el producto' });
    }
};

// Actualizar un producto
const actualizarProducto = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, categoria, precio_unitario, stock_actual, stock_minimo, id_proveedor } = req.body;
    const ultima_modificacion = new Date();

    if (!nombre || !descripcion || !categoria || !precio_unitario || !stock_actual || !stock_minimo || !id_proveedor) {
        return res.status(400).json({ status: 'Error', message: 'Todos los campos son requeridos.' });
    }

    const producto = { nombre, descripcion, categoria, precio_unitario, stock_actual, stock_minimo, id_proveedor, ultima_modificacion };
    try {
        const result = await productosModel.actualizarProducto(id, producto);
        if (result.affectedRows === 0) {
            return res.status(404).json({ status: 'Error', message: 'Producto no encontrado' });
        }
        res.status(200).json({ status: 'Éxito', message: 'Producto actualizado correctamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'Error', message: 'Error al actualizar el producto' });
    }
};

// Eliminar un producto
const eliminarProducto = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await productosModel.eliminarProducto(id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ status: 'Error', message: 'Producto no encontrado' });
        }
        res.json({ message: 'Producto eliminado exitosamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'Error', message: 'Error al eliminar el producto' });
    }
};

module.exports = {
    obtenerProductos,
    obtenerProductoPorId,
    insertarProducto,
    actualizarProducto,
    eliminarProducto
};

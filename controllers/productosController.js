const { getAllProducts, getProductById, addProduct, updateProduct, deleteProduct  } = require('../models/productosModel');

// Obtener todos los productos
const getAllProductsController = async (req, res) => {
    try {
        const productos = await getAllProducts();
        res.json(productos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'Error', message: 'Error al obtener los productos' });
    }
};

// Obtener un producto por ID
const getProductByIdController = async (req, res) => {
    const { id } = req.params;
    try {
        const producto = await getProductById(id);
        if (!producto) {
            return res.status(404).json({ status: 'Error', message: 'Producto no encontrado' });
        }
        res.json(producto);
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'Error', message: 'Error al obtener el producto' });
    }
};

// Insertar un nuevo producto
const addProductController = async (req, res) => {
    const { nombre, descripcion, id_categoria, precio_unitario, stock_actual, stock_minimo, id_proveedor } = req.body;

    // Validar campos requeridos
    if (!nombre || !precio_unitario || !stock_actual || !stock_minimo) {
        return res.status(400).json({ status: 'Error', message: 'Los campos obligatorios son requeridos.' });
    }

    const producto = { nombre, descripcion, id_categoria, precio_unitario, stock_actual, stock_minimo, id_proveedor};
    try {
        const insertId = await addProduct(producto);
        res.status(201).json({ status: 'Éxito', message: 'Producto insertado correctamente', id_producto: insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'Error', message: 'Error al insertar el producto' });
    }
};

// Actualizar un producto
const updateProductController = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, id_categoria, precio_unitario, stock_actual, stock_minimo, id_proveedor } = req.body;
    const ultima_modificacion = new Date();

    // Validar campos requeridos
    if (!nombre || !precio_unitario || !stock_actual || !stock_minimo) {
        return res.status(400).json({ status: 'Error', message: 'Los campos obligatorios son requeridos.' });
    }

    const producto = { nombre, descripcion, id_categoria, precio_unitario, stock_actual, stock_minimo, id_proveedor, ultima_modificacion };
    try {
        const result = await updateProduct(id, producto);
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
const deleteProductController = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await deleteProduct(id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ status: 'Error', message: 'Producto no encontrado' });
        }
        res.json({ status: 'Éxito', message: 'Producto eliminado exitosamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'Error', message: 'Error al eliminar el producto' });
    }
};

module.exports = {
    getAllProductsController,
    getProductByIdController,
    addProductController,
    updateProductController,
    deleteProductController
};

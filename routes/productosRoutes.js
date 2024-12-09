const express = require('express');
const productosController = require('../controllers/productosController');
const router = express.Router();

// Obtener todos los productos
router.get('/', productosController.obtenerProductos);

// Obtener un producto por ID
router.get('/:id', productosController.obtenerProductoPorId);

// Insertar un nuevo producto
router.post('/', productosController.insertarProducto);

// Actualizar un producto
router.put('/:id', productosController.actualizarProducto);

// Eliminar un producto
router.delete('/:id', productosController.eliminarProducto);

module.exports = router;

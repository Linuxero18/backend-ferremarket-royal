const express = require('express');
const productosController = require('../controllers/productosController');
const router = express.Router();

// Obtener todos los productos
router.get('/', productosController.getAllProductsController);

// Obtener productos por ID de categoría
//router.get('/categoria/:id', productosController.getProductByIdController); 

// Obtener un producto por ID
router.get('/:id', productosController.getProductByIdController);

// Insertar un nuevo producto
router.post('/', productosController.addProductController);

// Actualizar un producto
router.put('/:id', productosController.updateProductController);

// Eliminar un producto
router.delete('/:id', productosController.deleteProductController);

module.exports = router;

// routes/categoriasRouter.js
const express = require('express');
const proveedoresController = require('../controllers/proveedoresController');
const router = express.Router();

// Ruta para obtener todos los proveedores
router.get('/', proveedoresController.getAllSuppliersController);

// Ruta para obtener un proveedor por ID
router.get('/:id_proveedor', proveedoresController.getSupplierByIdController);

// Ruta para agregar un nuevo proveedor
router.post('/', proveedoresController.addSupplierController);

// Ruta para eliminar un proveedor por ID
router.delete('/:id_proveedor', proveedoresController.deleteSupplierController);

// Ruta para editar un proveedor por ID
router.put('/:id_proveedor', proveedoresController.updateSupplierController);

module.exports = router;

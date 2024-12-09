// routes/categoriasRouter.js
const express = require('express');
const proveedoresController = require('../controllers/proveedoresController');
const router = express.Router();

// Ruta para obtener todos los proveedores
router.get('/', proveedoresController.getAllSuppliersController);

module.exports = router;

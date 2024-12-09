// routes/categoriasRouter.js
const express = require('express');
const categoriasController = require('../controllers/categoriasController');
const router = express.Router();

// Ruta para obtener todas las categorías
router.get('/', categoriasController.getAllCategoriesController);

module.exports = router;

const express = require('express');
const categoriasController = require('../controllers/categoriasController');
const router = express.Router();

// Obtener todas las categorías
router.get('/', categoriasController.getAllCategoriesController);

// Obtener una categoría por ID
router.get('/:id', categoriasController.getCategoryByIdController);

// Insertar una nueva categoría
router.post('/', categoriasController.addCategoryController);

// Actualizar una categoría
router.put('/:id', categoriasController.updateCategoryController);

// Eliminar una categoría
router.delete('/:id', categoriasController.deleteCategoryController);

module.exports = router;
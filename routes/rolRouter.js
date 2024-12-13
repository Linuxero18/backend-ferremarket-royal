// routes/categoriasRouter.js
const express = require('express');
const rolController = require('../controllers/rolController');
const router = express.Router();

// Ruta para obtener todas las categorías
router.get('/', rolController.getAllRolController);

module.exports = router;

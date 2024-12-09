const express = require('express');
const usuariosController = require('../controllers/usuariosController');
const router = express.Router();

// Ruta para obtener todos los usuarios
router.get('/', usuariosController.getAllUsersController);

// Ruta para registrar un nuevo usuario
router.post('/register', usuariosController.registerUserController);

// Ruta para iniciar sesión
router.post('/login', usuariosController.loginController);

module.exports = router;

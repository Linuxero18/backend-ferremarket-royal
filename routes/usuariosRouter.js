const express = require('express');
const usuariosController = require('../controllers/usuariosController');
const router = express.Router();

// Ruta para obtener todos los usuarios
router.get('/', usuariosController.getAllUsersController);

// Ruta para obtener un usuario por ID
router.get('/:id_usuario', usuariosController.getUserByIdController);

// Ruta para eliminar un usuario por ID
router.delete('/:id_usuario', usuariosController.deleteUserController);

// Ruta para editar un usuario por ID
router.put('/:id_usuario', usuariosController.updateUserController);

// Ruta para registrar un nuevo usuario
router.post('/register', usuariosController.registerUserController);

// Ruta para iniciar sesión
router.post('/login', usuariosController.loginController);

module.exports = router;

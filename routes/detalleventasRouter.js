const express = require('express');
const detalleventasController = require('../controllers/detalleventasController');
const router = express.Router();

// Ruta para obtener todos los detalles de ventas
router.get('/', detalleventasController.getAllSalesDetailsController);

// Ruta para obtener un detalle de venta por ID
router.get('/:id_detalleventa', detalleventasController.getSaleDetailByIdController);

// Ruta para obtener un detalle de venta por id_venta
router.get('/venta/:id_venta', detalleventasController.getSaleDetailBySaleIdController);

// Ruta para agregar un detalle de venta
router.post('/', detalleventasController.addSaleDetailController);

// Ruta para actualizar un detalle de venta por ID
router.put('/:id_detalleventa', detalleventasController.updateSaleDetailController);

// Ruta para eliminar un detalle de venta por ID
router.delete('/:id_detalleventa', detalleventasController.deleteSaleDetailController);

module.exports = router;
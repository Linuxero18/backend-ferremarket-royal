const express = require('express');
const ventasController = require('../controllers/ventasController');
const router = express.Router();

// Ruta para obtener todas las ventas
router.get('/', ventasController.getAllSalesController);

// Ruta para obtener una venta por ID
router.get('/detalleventas/venta/:id_venta', ventasController.getSaleByIdController);

// Ruta para agregar una venta
router.post('/', ventasController.addSaleController);

// Ruta para actualizar una venta por ID
router.put('/:id_venta', ventasController.updateSaleController);

// Ruta para eliminar una venta por ID
router.delete('/:id_venta', ventasController.deleteSaleController);

module.exports = router;
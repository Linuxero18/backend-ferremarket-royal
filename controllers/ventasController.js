const db = require('../config/connection');
const { getAllSales, getSaleById, addSale, updateSaleById, deleteSaleById} = require('../models/ventasModel');

// Controlador para obtener todas las ventas
const getAllSalesController = async (req, res) => {
    try {
        const rows = await getAllSales();
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las ventas" });
    }
};

// Controlador para obtener una venta por ID
const getSaleByIdController = async (req, res) => {
    const { id_venta } = req.params;

    try {
        const sale = await getSaleById(id_venta);
        if (!sale) {
            return res.status(404).json({ message: 'Venta no encontrada' });
        }
        res.json(sale);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la venta' });
    }
}

// Controlador para agregar una venta
const addSaleController = async (req, res) => {
    const { fecha_venta, id_usuario, total_venta } = req.body;
    console.log("Datos recibidos en el servidor:", req.body);  // Verifica los datos recibidos

    try {
        // Validar campos obligatorios
        if (!fecha_venta || !id_usuario || !total_venta) {
            return res.status(400).json({ message: 'Todos los campos son requeridos (fecha_venta, id_usuario, total_venta)' });
        }

        // Llamar a la función para agregar la venta
        const id = await addSale(fecha_venta, id_usuario, total_venta);

        res.status(201).json({ message: 'Venta agregada correctamente', id });
    } catch (error) {
        console.error('Error al agregar la venta:', error);
        res.status(500).json({ message: 'Error al agregar la venta' });
    }
}

// Controlador para actualizar una venta
const updateSaleController = async (req, res) => {
    const { id_venta } = req.params;
    const { fecha_venta, total_venta } = req.body;
    console.log("Datos recibidos en el servidor:", req.body);  // Verifica los datos recibidos

    try {
        // Validar campos obligatorios
        if (!fecha_venta || !total_venta) {
            return res.status(400).json({ message: 'Todos los campos son requeridos (fecha_venta, total_venta)' });
        }

        // Llamar a la función para actualizar la venta
        await updateSaleById(id_venta, fecha_venta, total_venta);

        res.status(200).json({ message: 'Venta actualizada correctamente' });
    } catch (error) {
        console.error('Error al actualizar la venta:', error);
        res.status(500).json({ message: 'Error al actualizar la venta' });
    }
}

// Controlador para eliminar una venta
const deleteSaleController = async (req, res) => {
    const { id_venta } = req.params;

    try {
        await deleteSaleById(id_venta);
        res.status(200).json({ message: 'Venta eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la venta' });
    }
};

module.exports = {
    getAllSalesController,
    getSaleByIdController,
    addSaleController,
    updateSaleController,
    deleteSaleController
};
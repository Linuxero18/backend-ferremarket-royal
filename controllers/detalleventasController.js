const db = require('../config/connection');
const { getAllSalesDetails, getSaleDetailById, getSaleDetailBySaleId, addSaleDetail, updateSaleDetailById, deleteSaleDetailById } = require('../models/detalleventasModel');

// Controlador para obtener todos los detalles de las ventas
const getAllSalesDetailsController = async (req, res) => {
    try {
        const rows = await getAllSalesDetails();
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los detalles de las ventas" });
    }
};

// Controlador para obtener un detalle de venta por ID
const getSaleDetailByIdController = async (req, res) => {
    const { id_detalleventa } = req.params;

    try {
        const saleDetail = await getSaleDetailById(id_detalleventa);
        if (!saleDetail) {
            return res.status(404).json({ message: 'Detalle de venta no encontrado' });
        }
        res.json(saleDetail);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el detalle de venta' });
    }
}

// Controlador para agregar un detalle de venta
const addSaleDetailController = async (req, res) => {
    const { id_venta, id_producto, cantidad, precio_unitario } = req.body;
    console.log("Datos recibidos en el servidor:", req.body);  // Verifica los datos recibidos

    try {
        // Validar campos obligatorios
        if (!id_venta || !id_producto || !cantidad || !precio_unitario) {
            return res.status(400).json({ message: 'Todos los campos son requeridos (id_venta, id_producto, cantidad, precio_unitario)' });
        }

        // Llamar a la función para agregar el detalle de venta
        const id = await addSaleDetail(id_venta, id_producto, cantidad, precio_unitario);

        res.status(201).json({ message: 'Detalle de venta agregado correctamente', id });
    } catch (error) {
        console.error('Error al agregar el detalle de venta:', error);
        res.status(500).json({ message: 'Error al agregar el detalle de venta' });
    }
}

// Controlador para obtener un detalle de venta por id_venta
const getSaleDetailBySaleIdController = async (req, res) => {
    const { id_venta } = req.params;

    try {
        const saleDetail = await getSaleDetailBySaleId(id_venta);
        if (!saleDetail) {
            return res.status(404).json({ message: 'Detalle de venta no encontrado' });
        }
        res.json(saleDetail);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el detalle de venta' });
    }
}

// Controlador para actualizar un detalle de venta
const updateSaleDetailController = async (req, res) => {
    const { id_detalleventa } = req.params;
    const { id_venta, id_producto, cantidad, precio_unitario } = req.body;
    console.log("Datos recibidos en el servidor:", req.body);  // Verifica los datos recibidos

    try {
        // Validar campos obligatorios
        if (!id_venta || !id_producto || !cantidad || !precio_unitario) {
            return res.status(400).json({ message: 'Todos los campos son requeridos (id_venta, id_producto, cantidad, precio_unitario)' });
        }

        // Llamar a la función para actualizar el detalle de venta
        await updateSaleDetailById(id_detalleventa, id_venta, id_producto, cantidad, precio_unitario);

        res.status(200).json({ message: 'Detalle de venta actualizado correctamente' });
    } catch (error) {
        console.error('Error al actualizar el detalle de venta:', error);
        res.status(500).json({ message: 'Error al actualizar el detalle de venta' });
    }
}

// Controlador para eliminar un detalle de venta
const deleteSaleDetailController = async (req, res) => {
    const { id_detalleventa } = req.params;

    try {
        await deleteSaleDetailById(id_detalleventa);
        res.status(200).json({ message: 'Detalle de venta eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el detalle de venta' });
    }
};


module.exports = {
    getAllSalesDetailsController,
    getSaleDetailByIdController,
    getSaleDetailBySaleIdController,
    addSaleDetailController,
    updateSaleDetailController,
    deleteSaleDetailController
};
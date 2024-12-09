// controllers/categoriasController.js
const { getAllSuppliers } = require('../models/proveedoresModel'); // Asegúrate de importar correctamente

// Controlador para obtener todas las proveedores
const getAllSuppliersController = async (req, res) => {
    try {
        const rows = await getAllSuppliers(); // Llamada al modelo
        res.json(rows); // Devolver las categorías en formato JSON
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los proveedores" });
    }
};

module.exports = { getAllSuppliersController };

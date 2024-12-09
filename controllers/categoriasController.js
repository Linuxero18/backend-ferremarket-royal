// controllers/categoriasController.js
const { getAllCategories } = require('../models/categoriasModel'); // Asegúrate de importar correctamente

// Controlador para obtener todas las categorías
const getAllCategoriesController = async (req, res) => {
    try {
        const rows = await getAllCategories(); // Llamada al modelo
        res.json(rows); // Devolver las categorías en formato JSON
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las categorías" });
    }
};

module.exports = { getAllCategoriesController };

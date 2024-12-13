// controllers/categoriasController.js
const { getAllRol } = require('../models/rolModel'); // Asegúrate de importar correctamente

// Controlador para obtener todas las categorías
const getAllRolController = async (req, res) => {
    try {
        const rows = await getAllRol(); // Llamada al modelo
        res.json(rows); // Devolver las roles en formato JSON
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las roles" });
    }
};

module.exports = { getAllRolController };

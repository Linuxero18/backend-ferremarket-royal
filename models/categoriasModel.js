// models/categoriasModel.js
const db = require('../config/connection'); // Asegúrate de tener la conexión correctamente configurada

// Modelo para obtener todas las categorías
const getAllCategories = async () => {
    const [rows] = await db.promise().query('SELECT * FROM categorias'); // Consulta para obtener las categorías
    return rows; // Retorna las filas obtenidas
};

module.exports = { getAllCategories };

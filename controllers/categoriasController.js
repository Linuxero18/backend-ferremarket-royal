const { getAllCategories, getCategoryById, addCategory, updateCategory, deleteCategory } = require('../models/categoriasModel');

// Obtener todas las categorías
const getAllCategoriesController = async (req, res) => {
    try {
        const categories = await getAllCategories();  // Llamada al modelo
        res.json(categories);  // Devolver las categorías en formato JSON
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'Error', message: 'Error al obtener las categorías' });
    }
};

// Obtener una categoría por ID
const getCategoryByIdController = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await getCategoryById(id);
        if (!category) {
            return res.status(404).json({ status: 'Error', message: 'Categoría no encontrada' });
        }
        res.json(category);
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'Error', message: 'Error al obtener la categoría' });
    }
};

// Insertar una nueva categoría
const addCategoryController = async (req, res) => {
    const { nombre_categoria, descripcion } = req.body;

    // Validar campos requeridos
    if (!nombre_categoria) {
        return res.status(400).json({ status: 'Error', message: 'El nombre de la categoría es obligatorio.' });
    }

    const category = { nombre_categoria, descripcion };
    try {
        const insertId = await addCategory(category);
        res.status(201).json({ status: 'Éxito', message: 'Categoría insertada correctamente', id_categoria: insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'Error', message: 'Error al insertar la categoría' });
    }
};

// Actualizar una categoría
const updateCategoryController = async (req, res) => {
    const { id } = req.params;
    const { nombre_categoria, descripcion } = req.body;

    // Validar campos requeridos
    if (!nombre_categoria) {
        return res.status(400).json({ status: 'Error', message: 'El nombre de la categoría es obligatorio.' });
    }

    const category = { nombre_categoria, descripcion };
    try {
        const result = await updateCategory(id, category);
        if (result.affectedRows === 0) {
            return res.status(404).json({ status: 'Error', message: 'Categoría no encontrada' });
        }
        res.status(200).json({ status: 'Éxito', message: 'Categoría actualizada correctamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'Error', message: 'Error al actualizar la categoría' });
    }
};

// Eliminar una categoría
const deleteCategoryController = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await deleteCategory(id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ status: 'Error', message: 'Categoría no encontrada' });
        }
        res.json({ status: 'Éxito', message: 'Categoría eliminada exitosamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'Error', message: 'Error al eliminar la categoría' });
    }
};

module.exports = {
    getAllCategoriesController,
    getCategoryByIdController,
    addCategoryController,
    updateCategoryController,
    deleteCategoryController
};
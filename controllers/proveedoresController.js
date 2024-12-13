// controllers/categoriasController.js
const { getAllSuppliers, getSupplierById, deleteSupplierById, updateSupplierById } = require('../models/proveedoresModel'); // Asegúrate de importar correctamente

// Controlador para obtener todas las proveedores
const getAllSuppliersController = async (req, res) => {
    try {
        const rows = await getAllSuppliers(); // Llamada al modelo
        res.json(rows); // Devolver las categorías en formato JSON
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los proveedores" });
    }
};

// Controlador para obtener un usuario por ID
const getSupplierByIdController = async (req, res) => {
    const { id_proveedor } = req.params;

    try {
        const proveedor = await getSupplierById(id_proveedor);
        if (!proveedor) {
            return res.status(404).json({ message: 'proveedor no encontrado' });
        }
        res.json(proveedor);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el proveedor' });
        console.error(error);
    }
}

// Controlador para eliminar un usuario
const deleteSupplierController = async (req, res) => {
    const { id_proveedor } = req.params;

    try {
        await deleteSupplierById(id_proveedor);
        res.status(200).json({ message: 'Proveedor eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el proveedor' });
    }
};

// Controlador para actualizar un usuario
const updateSupplierController = async (req, res) => {
    const { id_proveedor } = req.params;
    const { nombre_proveedor, contacto, telefono } = req.body;
    console.log(req.body);
    try {
        // Validar campos
        if (!nombre_proveedor || !contacto || !telefono) {
            return res.status(400).json({ message: 'Todos los campos son requeridos (nombre_proveedor, contacto, telefono)' });
        }       

        await updateSupplierById(id_proveedor, nombre_proveedor, contacto, telefono);
        res.status(200).json({ message: 'Proveedor actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el proveedor' });
    }
};

module.exports = { getAllSuppliersController, getSupplierByIdController, deleteSupplierController, updateSupplierController };

const db = require('../config/connection'); 

// Obtener todas las categorías
const getAllCategories = () => {
    const query = 'SELECT * FROM categorias'; 

    return new Promise((resolve, reject) => {
        db.query(query, (err, rows) => {
            if (err) {
                reject({ message: 'Error al obtener las categorías', error: err });
            } else {
                resolve(rows); 
            }
        });
    });
};

// Obtener una categoría por ID
const getCategoryById = (id) => {
    const query = 'SELECT * FROM categorias WHERE id_categoria = ?';

    return new Promise((resolve, reject) => {
        db.query(query, [id], (err, rows) => {
            if (err) {
                reject({ message: 'Error al obtener la categoría', error: err });
            } else if (rows.length === 0) {
                resolve(null); 
            } else {
                resolve(rows[0]); 
            }
        });
    });
};

// Insertar una nueva categoría
const addCategory = (categoria) => {
    const { nombre_categoria, descripcion } = categoria; 

    const query = 'INSERT INTO categorias (nombre_categoria, descripcion) VALUES (?, ?)';
    const values = [nombre_categoria, descripcion];

    return new Promise((resolve, reject) => {
        db.query(query, values, (err, result) => {
            if (err) {
                reject({ message: 'Error al insertar la categoría', error: err });
            } else {
                resolve(result.insertId); 
            }
        });
    });
};

// Actualizar una categoría
const updateCategory = (id, categoria) => {
    const { nombre_categoria, descripcion } = categoria;
    const query = 'UPDATE categorias SET nombre_categoria = ?, descripcion = ? WHERE id_categoria = ?';
    const values = [nombre_categoria, descripcion, id];

    return new Promise((resolve, reject) => {
        db.query(query, values, (err, result) => {
            if (err) {
                reject({ message: 'Error al actualizar la categoría', error: err });
            } else {
                resolve(result); 
            }
        });
    });
};

// Eliminar una categoría
const deleteCategory = (id) => {
    const query = 'DELETE FROM categorias WHERE id_categoria = ?';

    return new Promise((resolve, reject) => {
        db.query(query, [id], (err, result) => {
            if (err) {
                reject({ message: 'Error al eliminar la categoría', error: err });
            } else {
                resolve(result); 
            }
        });
    });
};

module.exports = {
    getAllCategories,
    getCategoryById,
    addCategory,
    updateCategory,
    deleteCategory
};

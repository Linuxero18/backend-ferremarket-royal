const db = require('../config/connection');

const getAllSuppliers = async () => {
    const [rows] = await db.promise().query('SELECT * FROM proveedores');
    return rows;
};

module.exports = { getAllSuppliers };

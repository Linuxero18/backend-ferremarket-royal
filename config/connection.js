const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ferremarket_royal',
});

db.connect((err) => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err.message);
        process.exit(1);
    } else {
        console.log('Conexión exitosa a la base de datos');
    }
});

module.exports = db;

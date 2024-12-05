const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ferremarket_royal'
});

db.connect((err) => {
    if(err) {
        console.log('Ha ocurrido un error en la conexion:' + err);
    }
    console.log('Conectado exitosa a la base de datos');
});

module.exports = db;
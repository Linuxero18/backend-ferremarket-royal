const app = require('./app');
const db = require('./config/connection');
const { port } = require('./config/env');

db.connect((err) => {
    if (err) {
        console.error('¡ADVERTENCIA!: Base de datos posiblemene apagada, se ha podido establecer conexión.');
        console.log();
        process.exit(1);
    } else {
        console.log('Conectado a la base de datos de manera exitosa.');
        app.listen(port, () => {
            console.log(`Servidor corriendo en el puerto: -> ${port}`);
            console.log(`Servidor -> http://localhost:${port}`);
            console.log(`Usuarios -> http://localhost:${port}/usuarios`);
            console.log();
        });        
    }
});
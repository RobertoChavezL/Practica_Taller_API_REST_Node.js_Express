// Servidor principal con Express

const express = require('express');
const app = express();

// Importar rutas de usuarios
const usersRouter = require('./routes/users.routes');

// Middleware para leer JSON
app.use(express.json());

// Puerto del servidor
const PORT = process.env.PORT || 3000;

// =====================
//    RUTAS GENERALES
// =====================

// Ruta raíz
app.get('/', (req, res) => {
    // Mantengo exactamente el mismo texto
    res.send("Hola Mundo, Arriba Messi y el Barcelona");
});

// Ruta de saludo
app.get('/saludo', (req, res) => {
    res.json({
        mensaje: "Hola",
        autor: "Roberto",
        fecha: new Date()
    });
});

// =====================
//     RUTAS /user
// =====================

// Todas las rutas relacionadas con usuarios
// quedarán bajo el prefijo /user
app.use('/user', usersRouter);

// =====================
//   INICIAR SERVIDOR
// =====================

app.listen(PORT, () => {
    console.log(`Servidor corriendo exitosamente en http://localhost:${PORT}`);
});

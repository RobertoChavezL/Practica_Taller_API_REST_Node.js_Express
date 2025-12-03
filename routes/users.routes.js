const express = require('express');
const router = express.Router();

// Mock de datos (simula una base de datos en memoria)
const usuarios = [
    { id: 1, nombre: "Valeria",  edad: 22 },
    { id: 2, nombre: "Jorge", edad: 23 },
    { id: 3, nombre: "Anahitzin", edad: 20 }
];

// Función auxiliar para encontrar índice por id
const obtenerIndiceUsuario = (idBuscado) => {
    return usuarios.findIndex((usuario) => usuario.id === idBuscado);
};

// =====================
//      ENDPOINTS
// =====================

// GET /user
router.get('/', (req, res) => {
    res.json({
        usuarios: usuarios
    });
});

// POST /user
router.post('/', (req, res) => {
    /**
     * Estructura esperada en el body:
     * {
     *    "nombre": "string",
     *    "edad": 21
     * }
     */
    const { nombre, edad } = req.body;

    const nuevoUsuario = {
        id: usuarios.length + 1,
        nombre: nombre,
        edad: edad
    };

    usuarios.push(nuevoUsuario);

    // Dejo los mismos nombres de propiedades y mensajes
    res.json({
        mensaje: "Usuario agregado con exito",
        nuevo_usuario: nuevoUsuario,
        usuarios_actualizdos: usuarios
    });
});

// PUT /user/:id
router.put('/:id', (req, res) => {
    const id = Number(req.params.id);
    const { nombre, edad } = req.body;

    const indice = obtenerIndiceUsuario(id);

    if (indice === -1) {
        return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    usuarios[indice].nombre = nombre || usuarios[indice].nombre;
    usuarios[indice].edad   = edad   || usuarios[indice].edad;

    res.json({
        mensaje: "Usuario actualizado con exito",
        usuario_actualizado: usuarios[indice],
        usuarios_actualizdos: usuarios
    });
});

// DELETE /user/:id
router.delete('/:id', (req, res) => {
    const id = Number(req.params.id);

    const indice = obtenerIndiceUsuario(id);

    if (indice === -1) {
        return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    const usuarioEliminado = usuarios.splice(indice, 1);

    res.json({
        mensaje: "Usuario eliminado con exito",
        usuario_eliminado: usuarioEliminado[0],
        usuarios_actualizdos: usuarios
    });
});

// Exportar el router para usarlo en index.js
module.exports = router;

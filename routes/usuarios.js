const express = require('express');
const router = express.Router();
const db = require('../db/conexion'); // asegúrate de tener esta conexión

// Ruta para registrar un usuario
router.post('/registro', (req, res) => {
  const { usuario, contrasena } = req.body;

  const sql = 'INSERT INTO usuarios (usuario, contrasena) VALUES (?, ?)';
  db.query(sql, [usuario, contrasena], (err, result) => {
    if (err) {
      console.error('❌ Error al registrar usuario:', err);
      return res.status(500).json({ mensaje: 'Error al registrar usuario' });
    }
    res.json({ mensaje: 'Usuario registrado correctamente' });
  });
});

module.exports = router;

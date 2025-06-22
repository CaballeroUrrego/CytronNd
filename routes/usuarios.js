const express = require('express');
const router = express.Router();
const db = require('../db/conexion');

// Registrar usuario
router.post('/', async (req, res) => {
  const { usuario, contrasena } = req.body;

  if (!usuario || !contrasena) {
    return res.status(400).json({ mensaje: '⚠️ Usuario y contraseña son requeridos' });
  }

  try {
    const pool = await db;

    const existe = await pool.request()
      .input('usuario', usuario)
      .query('SELECT id FROM usuarios WHERE usuario = @usuario');

    if (existe.recordset.length > 0) {
      return res.status(409).json({ mensaje: '❌ El usuario ya existe' });
    }

    await pool.request()
      .input('usuario', usuario)
      .input('contrasena', contrasena)
      .query('INSERT INTO usuarios (usuario, contrasena) VALUES (@usuario, @contrasena)');

    res.status(201).json({ mensaje: '✅ Usuario registrado correctamente' });

  } catch (err) {
    console.error('❌ Error al registrar usuario:', err);
    res.status(500).json({ mensaje: 'Error interno al registrar usuario' });
  }
});

// Obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const pool = await db;
    const result = await pool.request()
      .query('SELECT id, usuario FROM usuarios');
    res.status(200).json(result.recordset);
  } catch (err) {
    console.error('❌ Error al obtener usuarios:', err);
    res.status(500).json({ mensaje: 'Error al obtener usuarios' });
  }
});

module.exports = router;

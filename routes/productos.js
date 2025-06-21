const express = require('express');
const router = express.Router();
const db = require('../db/conexion');

// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const pool = await db;
    const result = await pool.request().query('SELECT * FROM productos');
    res.json(result.recordset);
  } catch (err) {
    console.error('❌ Error al obtener productos:', err);
    res.status(500).json({ mensaje: 'Error al obtener productos' });
  }
});

// Agregar un nuevo producto
router.post('/', async (req, res) => {
  const { codigo, nombre, cantidad, precio } = req.body;

  try {
    const pool = await db;
    await pool.request()
      .input('codigo', codigo)
      .input('nombre', nombre)
      .input('cantidad', cantidad)
      .input('precio', precio)
      .query('INSERT INTO productos (codigo, nombre, cantidad, precio) VALUES (@codigo, @nombre, @cantidad, @precio)');

    res.json({ mensaje: '✅ Producto agregado correctamente' });
  } catch (err) {
    console.error('❌ Error al insertar producto:', err);
    res.status(500).json({ mensaje: 'Error al insertar producto' });
  }
});

module.exports = router;

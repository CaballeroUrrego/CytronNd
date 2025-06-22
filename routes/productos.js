const express = require('express');
const router = express.Router();
const db = require('../db/conexion');
const sql = require('mssql'); // ⬅️ Necesario para especificar los tipos

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
      .input('codigo', sql.VarChar, codigo)   // <-- Asegura el tipo
      .input('nombre', sql.VarChar, nombre)
      .input('cantidad', sql.Int, cantidad)
      .input('precio', sql.Int, precio)
      .query('INSERT INTO productos (codigo, nombre, cantidad, precio) VALUES (@codigo, @nombre, @cantidad, @precio)');

    res.json({ mensaje: '✅ Producto agregado correctamente' });
  } catch (err) {
    console.error('❌ Error al insertar producto:', err);
    res.status(500).json({ mensaje: 'Error al insertar producto' });
  }
});

module.exports = router;

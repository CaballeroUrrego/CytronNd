const express = require('express');
const router = express.Router();
const db = require('../db/conexion');

// Obtener todos los productos
router.get('/', (req, res) => {
  db.query('SELECT * FROM productos', (err, resultados) => {
    if (err) {
      console.error('❌ Error al obtener productos:', err);
      return res.status(500).json({ mensaje: 'Error en el servidor' });
    }
    res.json(resultados);
  });
});

// Agregar un nuevo producto
router.post('/', (req, res) => {
  const { codigo, nombre, cantidad, precio } = req.body;

  const sql = 'INSERT INTO productos (codigo, nombre, cantidad, precio) VALUES (?, ?, ?, ?)';
  db.query(sql, [codigo, nombre, cantidad, precio], (err, resultado) => {
    if (err) {
      console.error('❌ Error al insertar producto:', err);
      return res.status(500).json({ mensaje: 'Error al insertar producto' });
    }
    res.json({ mensaje: 'Producto agregado correctamente' });
  });
});

module.exports = router;

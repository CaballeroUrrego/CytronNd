const express = require('express');
const app = express();
const path = require('path');

// Middleware para analizar JSON en solicitudes
app.use(express.json());

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Rutas de la API
const productosRoutes = require('./routes/productos');
const usuariosRoutes = require('./routes/usuarios');

app.use('/api/productos', productosRoutes);
app.use('/api/usuarios', usuariosRoutes);

// Ruta base que carga index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

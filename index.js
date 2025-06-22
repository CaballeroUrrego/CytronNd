const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
const productosRoutes = require('./routes/productos');
const usuariosRoutes = require('./routes/usuarios');

app.use('/api/productos', productosRoutes);
app.use('/api/usuarios', usuariosRoutes); // 🔥 Asegúrate que esto existe

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'usuarios.html'));
});

// Ruta no encontrada
app.use((req, res) => {
  console.warn(`❌ Ruta no encontrada: ${req.method} ${req.originalUrl}`);
  res.status(404).send('❌ Ruta no encontrada');
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

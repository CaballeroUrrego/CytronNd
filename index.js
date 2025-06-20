const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

// Inicializa app
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors()); // Para permitir peticiones desde el frontend
app.use(bodyParser.json()); // Para procesar JSON en POST
app.use(express.static(path.join(__dirname, 'public'))); // Archivos estáticos

// Rutas
app.use('/api/usuarios', require('./routes/usuarios'));    // API usuarios
app.use('/api/productos', require('./routes/productos'));  // API productos

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

// db/conexion.js
const sql = require('mssql');

// Configuración de conexión
const config = {
  user: 'Conexion',
  password: 'Urrego',
  server: 'localhost',
  port: 1433,
  database: 'db',
  options: {
    trustServerCertificate: true, // Permite certificados no válidos (dev only)
    encrypt: false // No cifra la conexión (seguro solo en local)
  }
};

// Crear pool de conexión
const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('✅ Conectado a SQL Server correctamente');
    return pool;
  })
  .catch(err => {
    console.error('❌ Error al conectar a SQL Server:', err.message);
  });

module.exports = poolPromise;

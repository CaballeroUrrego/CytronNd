const sql = require('mssql');

const config = {
  user: 'Conexion', // Usuario de SQL Server
  password: 'Urrego', // La que le asignaste
  server: 'CABALLERO\\se302', // Instancia completa con doble barra
  database: 'db', // Cambia por la que estés usando
  options: {
    trustServerCertificate: true, // Necesario en local
    encrypt: false                // No usar cifrado en entorno local
  }
};

sql.connect(config)
  .then(() => {
    console.log('✅ Conectado a SQL Server');
  })
  .catch((err) => {
    console.error('❌ Error al conectar a SQL Server:', err.message);
  });

module.exports = sql;

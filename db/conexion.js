const mysql = require('mysql2');

const conexion = mysql.createConnection({
  host: 'localhost',
  user: 'Urrego',               // Tu usuario de SQL Server
  password: 'TuNuevaContraseña123!', // Reemplázala con la nueva contraseña
  database: 'cytronnd'          // Asegúrate de que esta base exista
});

conexion.connect((err) => {
  if (err) {
    console.error('❌ Error al conectar a MySQL:', err.message);
    return;
  }
  console.log('✅ Conexión exitosa a MySQL como Urrego');
});

module.exports = conexion;

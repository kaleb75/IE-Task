// db.js
const sql = require('mssql');

/**
 * Configuración para la conexión a la base de datos.
 * 
 * @type {Object}
 * @property {string} user - Nombre de usuario para la autenticación en la base de datos.
 * @property {string} password - Contraseña para la autenticación en la base de datos.
 * @property {string} server - Dirección IP o nombre del servidor de la base de datos.
 * @property {string} database - Nombre de la base de datos a la que se conectará.
 * @property {Object} options - Opciones adicionales para la conexión.
 * @property {boolean} options.encrypt - Indica si se debe utilizar cifrado para la conexión.
 * @property {boolean} options.trustServerCertificate - Indica si se debe confiar en el certificado del servidor (útil en entornos de desarrollo).
 * @property {Object} pool - Configuración del pool de conexiones.
 * @property {number} pool.max - Número máximo de conexiones en el pool.
 * @property {number} pool.min - Número mínimo de conexiones en el pool.
 * @property {number} pool.idleTimeoutMillis - Tiempo de espera en milisegundos antes de liberar una conexión no utilizada.
 */
const config = {
    user: 'taopcav2', //Usuario de la conexion de la BD
    password: 'Pca2.0@Mes', //Password de la conexion a la BD
    server: '10.45.35.101', //IP del servidor de BD
    database: 'PCA', //Nombre de la BD 
    options: {
        encrypt: true, // Utilizar cifrado si es necesario
        trustServerCertificate: true // Solo si estás utilizando certificados de servidor no verificados
    },
    pool: {
        max: 10, // Número máximo de conexiones en el pool
        min: 0,
        idleTimeoutMillis: 30000 // Tiempo de espera antes de liberar una conexión no utilizada
    }
};

/**
 * Función para obtener una conexión a la base de datos.
 * 
 * @async
 * @function getConnection
 * @returns {Promise<sql.ConnectionPool>} Una promesa que resuelve en un pool de conexiones a la base de datos.
 * @throws {Error} Si ocurre un error al intentar conectarse a la base de datos.
 */
// Función asincrónica para obtener una conexión a la base de datos
async function getConnection() {
    try {  
        // Se intenta establecer una conexión con la base de datos usando la configuración proporcionada
        const pool = await sql.connect(config); 
        
        // Si la conexión es exitosa, se muestra un mensaje en la consola
        console.log('Conexión a la base de datos establecida correctamente.');  
        
        // Se retorna el objeto de conexión (pool) para ser utilizado en consultas
        return pool;
    } catch (error) { 
        // Si ocurre un error al conectar, se captura y se muestra un mensaje de error en la consola
        console.error('Error al conectar a la base de datos:', error); 
        
        // Se lanza una nueva excepción para que el error pueda ser manejado externamente
        throw new Error('No se pudo establecer la conexión a la base de datos.');
    }
}
// Exportar el objeto `sql` y la función `getConnection` para su uso en otros módulos
module.exports = {
    sql, // Exportar el objeto `sql` en caso de que necesites hacer referencia a él
    getConnection // Exportar la función `getConnection`
};
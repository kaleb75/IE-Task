// server.js

// Importación de módulos necesarios
const express = require('express'); // Framework para crear el servidor web
const bodyParser = require('body-parser'); // Middleware para parsear el cuerpo de las solicitudes
const session = require('express-session'); // Middleware para manejar sesiones
const passport = require('passport'); // Middleware para autenticación
const LocalStrategy = require('passport-local').Strategy; // Estrategia de autenticación local
const path = require('path'); // Módulo para manejar rutas de archivos
const db = require('./queries'); // Importa las funciones de la base de datos desde queries.js
const app = express(); // Crea una instancia de la aplicación Express
const port = 2000; // Puerto en el que el servidor escuchará las solicitudes

// Middleware para parsear el cuerpo de las solicitudes
app.use(bodyParser.json()); // Permite parsear el cuerpo de las solicitudes en formato JSON
app.use(bodyParser.urlencoded({ extended: true })); // Permite parsear el cuerpo de las solicitudes en formato URL-encoded

// Configuración de la sesión
app.use(session({
    secret: 'tu_secreto_aqui', // Clave secreta para firmar la cookie de sesión
    resave: false, // Evita que la sesión se guarde de nuevo si no ha cambiado
    saveUninitialized: true, // Guarda una sesión nueva aunque no esté inicializada
}));

// Inicializar Passport
app.use(passport.initialize()); // Inicializa Passport para manejar la autenticación
app.use(passport.session()); // Habilita el uso de sesiones con Passport

// Estrategia de autenticación local
passport.use(new LocalStrategy((username, password, done) => {
    // Aquí deberías buscar el usuario en tu base de datos
    // Este es un ejemplo simple
    if (username === 'admin' && password === 'password') {
        return done(null, { username: 'admin' }); // Autenticación exitosa
    } else {
        return done(null, false, { message: 'Credenciales incorrectas' }); // Autenticación fallida
    }
}));

// Serialización del usuario
passport.serializeUser((user, done) => {
    done(null, user.username); // Guarda el nombre de usuario en la sesión
});

// Deserialización del usuario
passport.deserializeUser((username, done) => {
    // Aquí deberías buscar el usuario en tu base de datos
    done(null, { username: username }); // Recupera el usuario desde la sesión
});

// Servir archivos estáticos desde la carpeta frontend
app.use(express.static(path.join(__dirname, '../frontend'))); // Sirve archivos estáticos como CSS, JS, imágenes, etc.

// Ruta para la raíz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'index.html')); // Envía el archivo HTML principal
});

// Rutas para el CRUD de tasks
app.get('/tasks', db.getTasks); // Obtener todas las tareas
app.get('/tasks/:id', db.getTaskById); // Obtener una tarea por su ID
app.post('/tasks', db.createTask); // Crear una nueva tarea
app.put('/tasks/:id', db.updateTask); // Actualizar una tarea existente
app.delete('/tasks/:id', db.deleteTask); // Eliminar una tarea
app.put('/tasks/:id/complete', db.markTaskAsCompleted); // Marcar una tarea como completada

// Ruta de inicio de sesión
app.post('/login', passport.authenticate('local', {
    successRedirect: '/tasks', // Redirige a la lista de tareas si la autenticación es exitosa
    failureRedirect: '/login', // Redirige a la página de login si la autenticación falla
}));

// Ruta de cierre de sesión
app.get('/logout', (req, res) => {
    req.logout(); // Cierra la sesión del usuario
    res.redirect('/login'); // Redirige al usuario a la página de login
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`App running on port ${port}.`); // Inicia el servidor y muestra un mensaje en la consola
});
const { getConnection } = require('./db'); // Importa la función `getConnection` desde el archivo `db.js`. Esta función se usa para obtener una conexión a la base de datos.
const sql = require('mssql'); // Importa el módulo `mssql`, que permite interactuar con una base de datos SQL Server.equire('mssql'); // Importa el módulo `mssql` para interactuar con SQL Server

/**
 * Obtener todas las tareas que no están marcadas como 'DONE'.
 * 
 * @async
 * @function getTasks
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Promise<void>} - Devuelve un JSON con las tareas o un mensaje de error.
 */
const getTasks = async (req, res) => { // Define una función asíncrona para obtener todas las tareas.
    try {
        const pool = await getConnection(); // Obtiene una conexión a la base de datos usando la función `getConnection`.
        const result = await pool.request().query("SELECT * FROM ie_tasks WHERE status <> 'DONE' ORDER BY priority DESC, udt ASC"); // Ejecuta una consulta SQL para obtener todas las tareas que no están marcadas como "DONE", ordenadas por prioridad y fecha de actualización.
        res.status(200).json(result.recordset); // Devuelve las tareas en formato JSON con un código de estado HTTP 200 (éxito).
    } catch (error) {
        console.error('Error al obtener tasks:', error); // Registra el error en la consola.
        res.status(500).send('Error al obtener tasks'); // Devuelve un mensaje de error con un código de estado HTTP 500 (error interno del servidor).
    }
};

/**
 * Obtener una tarea específica por su ID.
 * 
 * @async
 * @function getTaskById
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Promise<void>} - Devuelve un JSON con la tarea o un mensaje de error.
 */
const getTaskById = async (req, res) => { // Define una función asíncrona para obtener una tarea específica por su ID.
    const id = parseInt(req.params.id); // Obtiene el ID de la tarea desde los parámetros de la URL y lo convierte a un número entero.
    try {
        const pool = await getConnection(); // Obtiene una conexión a la base de datos.
        const result = await pool.request().input('id', sql.Int, id).query('SELECT * FROM ie_tasks WHERE id = @id'); // Ejecuta una consulta SQL para obtener la tarea con el ID especificado.
        res.status(200).json(result.recordset[0]); // Devuelve la tarea en formato JSON con un código de estado HTTP 200.
    } catch (error) {
        console.error('Error al obtener task:', error); // Registra el error en la consola.
        res.status(500).send('Error al obtener task'); // Devuelve un mensaje de error con un código de estado HTTP 500.
    }
};

/**
 * Crear una nueva tarea.
 * 
 * @async
 * @function createTask
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Promise<void>} - Devuelve el ID de la tarea creada o un mensaje de error.
 */
const createTask = async (req, res) => { // Define una función asíncrona para crear una nueva tarea.
    const { title, desc_s, desc_l, priority, owner, dept, customer, requester, area, url, attachment, status, tdt } = req.body; // Extrae los datos de la tarea desde el cuerpo de la solicitud HTTP.
    try {
        const pool = await getConnection(); // Obtiene una conexión a la base de datos.
        const result = await pool.request() // Ejecuta una consulta SQL para insertar una nueva tarea.
            .input('title', sql.VarChar, title) // Asigna el valor del campo `title` a la consulta.
            .input('desc_s', sql.Text, desc_s) // Asigna el valor del campo `desc_s` a la consulta.
            .input('desc_l', sql.Text, desc_l) // Asigna el valor del campo `desc_l` a la consulta.
            .input('priority', sql.Int, priority) // Asigna el valor del campo `priority` a la consulta.
            .input('owner', sql.VarChar, owner) // Asigna el valor del campo `owner` a la consulta.
            .input('dept', sql.VarChar, dept) // Asigna el valor del campo `dept` a la consulta.
            .input('customer', sql.VarChar, customer) // Asigna el valor del campo `customer` a la consulta.
            .input('requester', sql.VarChar, requester) // Asigna el valor del campo `requester` a la consulta.
            .input('area', sql.VarChar, area) // Asigna el valor del campo `area` a la consulta.
            .input('url', sql.Text, url) // Asigna el valor del campo `url` a la consulta.
            .input('attachment', sql.Text, attachment) // Asigna el valor del campo `attachment` a la consulta.
            .input('status', sql.VarChar, status) // Asigna el valor del campo `status` a la consulta.
            .input('tdt', sql.DateTime, tdt) // Asigna el valor del campo `tdt` a la consulta.
            .query(`
                INSERT INTO ie_tasks (title, desc_s, desc_l, priority, owner, dept, customer, requester, area, url, attachment, status, tdt, cdt, udt) 
                VALUES (@title, @desc_s, @desc_l, @priority, @owner, @dept, @customer, @requester, @area, @url, @attachment, @status, @tdt, GETDATE(), GETDATE());
                SELECT SCOPE_IDENTITY() AS id
            `); // Inserta la tarea en la base de datos y devuelve el ID generado.

        // Insertar log de la creación de la tarea
        await pool.request()
            .input('TaskID', sql.Int, result.recordset[0].id) // Asigna el ID de la tarea recién creada.
            .input('Title', sql.VarChar, title) // Asigna el valor del campo `title` al log.
            .input('Desc_S', sql.Text, desc_s) // Asigna el valor del campo `desc_s` al log.
            .input('Desc_L', sql.Text, desc_l) // Asigna el valor del campo `desc_l` al log.
            .input('Priority', sql.Int, priority) // Asigna el valor del campo `priority` al log.
            .input('Owner', sql.VarChar, owner) // Asigna el valor del campo `owner` al log.
            .input('Dept', sql.VarChar, dept) // Asigna el valor del campo `dept` al log.
            .input('Customer', sql.VarChar, customer) // Asigna el valor del campo `customer` al log.
            .input('Requester', sql.VarChar, requester) // Asigna el valor del campo `requester` al log.
            .input('Area', sql.VarChar, area) // Asigna el valor del campo `area` al log.
            .input('Url', sql.Text, url) // Asigna el valor del campo `url` al log.
            .input('Attachment', sql.Text, attachment) // Asigna el valor del campo `attachment` al log.
            .input('Status', sql.VarChar, status) // Asigna el valor del campo `status` al log.
            .input('tdt', sql.DateTime, tdt) // Asigna el valor del campo `tdt` al log.
            .input('Completed_At', sql.DateTime, null) // Asigna `null` al campo `Completed_At` porque la tarea no está completada.
            .query(`
                INSERT INTO ie_tasksLogs (TaskID, Title, Desc_S, Desc_L, Priority, Owner, Dept, Customer, Requester, Area, Url, Attachment, Status, tdt, Completed_At, Action)
                VALUES (@TaskID, @Title, @Desc_S, @Desc_L, @Priority, @Owner, @Dept, @Customer, @Requester, @Area, @Url, @Attachment, @Status, @tdt, @Completed_At, 'Create');
            `); // Inserta un registro en la tabla de logs para documentar la creación de la tarea.

        res.status(201).json({ id: result.recordset[0].id }); // Devuelve el ID de la tarea creada con un código de estado HTTP 201 (creado).
    } catch (error) {
        console.error('Error al crear task:', error); // Registra el error en la consola.
        res.status(500).send('Error al crear task'); // Devuelve un mensaje de error con un código de estado HTTP 500.
    }
};

/**
 * Actualizar una tarea existente.
 * 
 * @async
 * @function updateTask
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Promise<void>} - Devuelve un mensaje de éxito o un mensaje de error.
 */
const updateTask = async (req, res) => { // Define una función asíncrona para actualizar una tarea existente.
    const id = parseInt(req.params.id); // Obtiene el ID de la tarea desde los parámetros de la URL.
    const { title, desc_s, desc_l, priority, owner, dept, customer, requester, area, url, attachment, status, tdt } = req.body; // Extrae los datos de la tarea desde el cuerpo de la solicitud HTTP.
    try {
        const pool = await getConnection(); // Obtiene una conexión a la base de datos.
        await pool.request() // Ejecuta una consulta SQL para actualizar la tarea.
            .input('id', sql.Int, id) // Asigna el ID de la tarea a la consulta.
            .input('title', sql.VarChar, title) // Asigna el valor del campo `title` a la consulta.
            .input('desc_s', sql.Text, desc_s) // Asigna el valor del campo `desc_s` a la consulta.
            .input('desc_l', sql.Text, desc_l) // Asigna el valor del campo `desc_l` a la consulta.
            .input('priority', sql.Int, priority) // Asigna el valor del campo `priority` a la consulta.
            .input('owner', sql.VarChar, owner) // Asigna el valor del campo `owner` a la consulta.
            .input('dept', sql.VarChar, dept) // Asigna el valor del campo `dept` a la consulta.
            .input('customer', sql.VarChar, customer) // Asigna el valor del campo `customer` a la consulta.
            .input('requester', sql.VarChar, requester) // Asigna el valor del campo `requester` a la consulta.
            .input('area', sql.VarChar, area) // Asigna el valor del campo `area` a la consulta.
            .input('url', sql.Text, url) // Asigna el valor del campo `url` a la consulta.
            .input('attachment', sql.Text, attachment) // Asigna el valor del campo `attachment` a la consulta.
            .input('status', sql.VarChar, status) // Asigna el valor del campo `status` a la consulta.
            .input('tdt', sql.DateTime, tdt) // Asigna el valor del campo `tdt` a la consulta.
            .query(`
                UPDATE ie_tasks 
                SET title = @title, desc_s = @desc_s, desc_l = @desc_l, priority = @priority, owner = @owner, dept = @dept, customer = @customer, requester = @requester, area = @area, url = @url, attachment = @attachment, status = @status, tdt = @tdt, udt = GETDATE() 
                WHERE id = @id
            `); // Actualiza la tarea en la base de datos.

        // Insertar log de la actualización de la tarea
        await pool.request()
            .input('TaskID', sql.Int, id) // Asigna el ID de la tarea al log.
            .input('Title', sql.VarChar, title) // Asigna el valor del campo `title` al log.
            .input('Desc_S', sql.Text, desc_s) // Asigna el valor del campo `desc_s` al log.
            .input('Desc_L', sql.Text, desc_l) // Asigna el valor del campo `desc_l` al log.
            .input('Priority', sql.Int, priority) // Asigna el valor del campo `priority` al log.
            .input('Owner', sql.VarChar, owner) // Asigna el valor del campo `owner` al log.
            .input('Dept', sql.VarChar, dept) // Asigna el valor del campo `dept` al log.
            .input('Customer', sql.VarChar, customer) // Asigna el valor del campo `customer` al log.
            .input('Requester', sql.VarChar, requester) // Asigna el valor del campo `requester` al log.
            .input('Area', sql.VarChar, area) // Asigna el valor del campo `area` al log.
            .input('Url', sql.Text, url) // Asigna el valor del campo `url` al log.
            .input('Attachment', sql.Text, attachment) // Asigna el valor del campo `attachment` al log.
            .input('Status', sql.VarChar, status) // Asigna el valor del campo `status` al log.
            .input('tdt', sql.DateTime, tdt) // Asigna el valor del campo `tdt` al log.
            .input('Completed_At', sql.DateTime, null) // Asigna `null` al campo `Completed_At` porque la tarea no está completada.
            .query(`
                INSERT INTO ie_tasksLogs (TaskID, Title, Desc_S, Desc_L, Priority, Owner, Dept, Customer, Requester, Area, Url, Attachment, Status, tdt, Completed_At, Action)
                VALUES (@TaskID, @Title, @Desc_S, @Desc_L, @Priority, @Owner, @Dept, @Customer, @Requester, @Area, @Url, @Attachment, @Status, @tdt, @Completed_At, 'Update');
            `); // Inserta un registro en la tabla de logs para documentar la actualización de la tarea.

        res.status(200).send(`Task updated with ID: ${id}`); // Devuelve un mensaje de éxito con un código de estado HTTP 200.
    } catch (error) {
        console.error('Error al actualizar task:', error); // Registra el error en la consola.
        res.status(500).send('Error al actualizar task'); // Devuelve un mensaje de error con un código de estado HTTP 500.
    }
};

/**
 * Eliminar una tarea por su ID.
 * 
 * @async
 * @function deleteTask
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Promise<void>} - Devuelve un mensaje de éxito o un mensaje de error.
 */
const deleteTask = async (req, res) => { // Define una función asíncrona para eliminar una tarea.
    const id = parseInt(req.params.id); // Obtiene el ID de la tarea desde los parámetros de la URL.
    try {
        const pool = await getConnection(); // Obtiene una conexión a la base de datos.
        
        // Obtener la tarea antes de eliminarla para registrar el log
        const taskResult = await pool.request().input('id', sql.Int, id).query('SELECT * FROM ie_tasks WHERE id = @id'); // Ejecuta una consulta SQL para obtener la tarea que se va a eliminar.
        const task = taskResult.recordset[0]; // Almacena los datos de la tarea.

        await pool.request().input('id', sql.Int, id).query('DELETE FROM ie_tasks WHERE id = @id'); // Ejecuta una consulta SQL para eliminar la tarea.

        // Insertar log de la eliminación de la tarea
        await pool.request()
            .input('TaskID', sql.Int, id) // Asigna el ID de la tarea al log.
            .input('Title', sql.VarChar, task.title) // Asigna el valor del campo `title` al log.
            .input('Desc_S', sql.Text, task.desc_s) // Asigna el valor del campo `desc_s` al log.
            .input('Desc_L', sql.Text, task.desc_l) // Asigna el valor del campo `desc_l` al log.
            .input('Priority', sql.Int, task.priority) // Asigna el valor del campo `priority` al log.
            .input('Owner', sql.VarChar, task.owner) // Asigna el valor del campo `owner` al log.
            .input('Dept', sql.VarChar, task.dept) // Asigna el valor del campo `dept` al log.
            .input('Customer', sql.VarChar, task.customer) // Asigna el valor del campo `customer` al log.
            .input('Requester', sql.VarChar, task.requester) // Asigna el valor del campo `requester` al log.
            .input('Area', sql.VarChar, task.area) // Asigna el valor del campo `area` al log.
            .input('Url', sql.Text, task.url) // Asigna el valor del campo `url` al log.
            .input('Attachment', sql.Text, task.attachment) // Asigna el valor del campo `attachment` al log.
            .input('Status', sql.VarChar, task.status) // Asigna el valor del campo `status` al log.
            .input('tdt', sql.DateTime, task.tdt) // Asigna el valor del campo `tdt` al log.
            .input('Completed_At', sql.DateTime, task.completed_at) // Asigna el valor del campo `completed_at` al log.
            .query(`
                INSERT INTO ie_tasksLogs (TaskID, Title, Desc_S, Desc_L, Priority, Owner, Dept, Customer, Requester, Area, Url, Attachment, Status, tdt, Completed_At, Action)
                VALUES (@TaskID, @Title, @Desc_S, @Desc_L, @Priority, @Owner, @Dept, @Customer, @Requester, @Area, @Url, @Attachment, @Status, @tdt, @Completed_At, 'Delete');
            `); // Inserta un registro en la tabla de logs para documentar la eliminación de la tarea.

        res.status(200).send(`Task deleted with ID: ${id}`); // Devuelve un mensaje de éxito con un código de estado HTTP 200.
    } catch (error) {
        console.error('Error al eliminar task:', error); // Registra el error en la consola.
        res.status(500).send('Error al eliminar task'); // Devuelve un mensaje de error con un código de estado HTTP 500.
    }
};

/**
 * Marcar una tarea como completada.
 * 
 * @async
 * @function markTaskAsCompleted
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Promise<void>} - Devuelve un mensaje de éxito o un mensaje de error.
 */
const markTaskAsCompleted = async (req, res) => { // Define una función asíncrona para marcar una tarea como completada.
    const taskId = parseInt(req.params.id); // Obtiene el ID de la tarea desde los parámetros de la URL.
    if (isNaN(taskId)) return res.status(400).send('Invalid task ID'); // Valida que el ID sea un número válido. Si no lo es, devuelve un error HTTP 400.
    try {
        const pool = await getConnection(); // Obtiene una conexión a la base de datos.
        
        // Obtener la tarea antes de marcarla como completada para registrar el log
        const taskResult = await pool.request().input('taskId', sql.Int, taskId).query('SELECT * FROM ie_tasks WHERE id = @taskId'); // Ejecuta una consulta SQL para obtener la tarea.
        const task = taskResult.recordset[0]; // Almacena los datos de la tarea.

        await pool.request().input('taskId', sql.Int, taskId).query(`
            UPDATE ie_tasks 
            SET status = 'DONE', completed_at = GETDATE() 
            WHERE id = @taskId
        `); // Ejecuta una consulta SQL para marcar la tarea como completada.

        // Insertar log de la tarea completada
        await pool.request()
            .input('TaskID', sql.Int, taskId) // Asigna el ID de la tarea al log.
            .input('Title', sql.VarChar, task.title) // Asigna el valor del campo `title` al log.
            .input('Desc_S', sql.Text, task.desc_s) // Asigna el valor del campo `desc_s` al log.
            .input('Desc_L', sql.Text, task.desc_l) // Asigna el valor del campo `desc_l` al log.
            .input('Priority', sql.Int, task.priority) // Asigna el valor del campo `priority` al log.
            .input('Owner', sql.VarChar, task.owner) // Asigna el valor del campo `owner` al log.
            .input('Dept', sql.VarChar, task.dept) // Asigna el valor del campo `dept` al log.
            .input('Customer', sql.VarChar, task.customer) // Asigna el valor del campo `customer` al log.
            .input('Requester', sql.VarChar, task.requester) // Asigna el valor del campo `requester` al log.
            .input('Area', sql.VarChar, task.area) // Asigna el valor del campo `area` al log.
            .input('Url', sql.Text, task.url) // Asigna el valor del campo `url` al log.
            .input('Attachment', sql.Text, task.attachment) // Asigna el valor del campo `attachment` al log.
            .input('Status', sql.VarChar, 'DONE') // Asigna el valor "DONE" al campo `status` en el log.
            .input('tdt', sql.DateTime, task.tdt) // Asigna el valor del campo `tdt` al log.
            .input('Completed_At', sql.DateTime, new Date()) // Asigna la fecha actual al campo `Completed_At` en el log.
            .query(`
                INSERT INTO ie_tasksLogs (TaskID, Title, Desc_S, Desc_L, Priority, Owner, Dept, Customer, Requester, Area, Url, Attachment, Status, tdt, Completed_At, Action)
                VALUES (@TaskID, @Title, @Desc_S, @Desc_L, @Priority, @Owner, @Dept, @Customer, @Requester, @Area, @Url, @Attachment, 'DONE', @tdt, GETDATE(), 'Complete');
            `); // Inserta un registro en la tabla de logs para documentar la tarea completada.

        res.status(200).send(`Task ${taskId} marcada como completada.`); // Devuelve un mensaje de éxito con un código de estado HTTP 200.
    } catch (error) {
        console.error('Error al marcar task como completada:', error); // Registra el error en la consola.
        res.status(500).send('Error al marcar task como completada'); // Devuelve un mensaje de error con un código de estado HTTP 500.
    }
};

/**
 * Archivar tareas completadas.
 * 
 * @async
 * @function archiveCompletedTasks
 * @returns {Promise<void>} - Devuelve un mensaje de éxito o un mensaje de error.
 */
const archiveCompletedTasks = async () => { // Define una función asíncrona para archivar tareas completadas.
    try {
        const pool = await getConnection(); // Obtiene una conexión a la base de datos.
        await pool.request().query(`
            INSERT INTO tasks_archive SELECT * FROM ie_tasks WHERE completed_at IS NOT NULL;
            DELETE FROM ie_tasks WHERE completed_at IS NOT NULL;
        `); // Mueve las tareas completadas a la tabla `tasks_archive` y las elimina de la tabla `ie_tasks`.
        console.log('Tareas completadas archivadas con éxito.'); // Registra un mensaje de éxito en la consola.
    } catch (error) {
        console.error('Error al archivar tareas completadas:', error); // Registra el error en la consola.
    }
};

module.exports = {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    markTaskAsCompleted,
    archiveCompletedTasks
}; // Exporta todas las funciones para que puedan ser utilizadas en otros módulos.
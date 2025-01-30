// script.js
// Función para solicitar la contraseña antes de cargar la página
function requestPassword() {
    const password = prompt("Por favor, ingresa la contraseña para acceder a la página:"); // Muestra un cuadro de diálogo para solicitar la contraseña.

    if (password === "IE@2025") { // Verifica si la contraseña ingresada es correcta.
        // Si la contraseña es correcta, permitir el acceso a la página
        $(document).ready(function () { // Espera a que el documento esté listo.
            fetchTasks(); // Llama a la función `fetchTasks` para cargar las tareas.
        });
    } else {
        // Si la contraseña es incorrecta, redirigir a otra página o mostrar un mensaje de error
        alert("Contraseña incorrecta. No tienes permiso para acceder a esta página."); // Muestra un mensaje de error.
        window.location.href = "http://127.0.0.1"; // Redirige a otra página (en este caso, localhost).
    }
}

//requestPassword(); // Llama a la función `requestPassword` para solicitar la contraseña. Está comentada para deshabilitar temporalmente esta funcionalidad.

// Obtener todas las tareas del servidor
function fetchTasks() {
    $.get('/tasks', function (data) { // Realiza una solicitud GET al servidor para obtener las tareas.
        let rows = ''; // Inicializa una variable para almacenar las filas de la tabla.
        data.forEach(task => { // Itera sobre cada tarea en los datos recibidos.
            let priorityClass = ''; // Inicializa una variable para almacenar la clase CSS según la prioridad.
            switch (task.priority) { // Asigna una clase CSS basada en la prioridad de la tarea.
                case 5: priorityClass = 'priority-critical'; break; // Prioridad crítica.
                case 4: priorityClass = 'priority-high'; break; // Prioridad alta.
                case 3: priorityClass = 'priority-medium'; break; // Prioridad media.
                case 2: priorityClass = 'priority-low'; break; // Prioridad baja.
                case 1: priorityClass = 'priority-when-possible'; break; // Prioridad "cuando sea posible".
            }

            // Construye una fila de la tabla con los datos de la tarea.
            rows += `<tr class="${priorityClass}">
                <td>${task.id}</td> <!-- ID de la tarea -->
                <td>${task.title}</td> <!-- Título de la tarea -->
                <td>${task.desc_s}</td> <!-- Descripción corta -->
                <td>${task.desc_l}</td> <!-- Descripción larga -->
                <td>${task.priority}</td> <!-- Prioridad -->
                <td>${task.owner}</td> <!-- Propietario -->
                <td>${task.dept}</td> <!-- Departamento -->
                <td>${task.customer}</td> <!-- Cliente -->
                <td>${task.requester}</td> <!-- Solicitante -->
                <td>${task.area}</td> <!-- Área -->
                <td>${task.url}</td> <!-- URL -->
                <td>${task.attachment}</td> <!-- Archivo adjunto -->
                <td>${task.status}</td> <!-- Estado -->
                <td>${task.tdt}</td> <!-- Fecha de entrega -->
                <td>
                    <button onclick="editTask(${task.id})">Edit/Update</button> <!-- Botón para editar -->
                    <button onclick="deleteTask(${task.id})">Delete</button> <!-- Botón para eliminar -->
                    <button onclick="markTaskAsCompleted(${task.id})" ${task.status === 'completado' ? 'disabled' : ''}>Done</button> <!-- Botón para marcar como completada -->
                </td>
            </tr>`;
        });

        // Actualizar solo el cuerpo de la tabla
        $('#taskList tbody').html(rows); // Inserta las filas generadas en el cuerpo de la tabla.
    });
}

// Enviar tarea (crear o actualizar)
$('#taskForm').on('submit', function (e) { // Escucha el evento `submit` del formulario.
    e.preventDefault(); // Evita que el formulario se envíe de manera predeterminada.

    const taskId = $('#taskId').val() || null; // Obtiene el ID de la tarea (si existe).

    // Recopilar datos del formulario
    const taskData = { // Crea un objeto con los datos del formulario.
        title: $('#taskTitle').val(), // Título
        desc_s: $('#taskDescS').val(), // Descripción corta
        desc_l: $('#taskDescL').val(), // Descripción larga
        priority: parseInt($('#taskPriority').val(), 10), // Prioridad (convertida a número)
        owner: $('#taskOwner').val(), // Propietario
        dept: $('#taskDept').val(), // Departamento
        customer: $('#taskCustomer').val(), // Cliente
        requester: $('#taskRequester').val(), // Solicitante
        area: $('#taskArea').val(), // Área
        url: $('#taskUrl').val(), // URL
        attachment: $('#taskAttachment').val(), // Archivo adjunto
        status: $('#taskStatus').val(), // Estado
        tdt: $('#taskTDT').val() // Fecha de entrega
    };

    if (taskId) { // Si hay un ID, actualiza la tarea existente.
        $.ajax({
            url: `/tasks/${taskId}`, // URL para actualizar la tarea.
            method: 'PUT', // Método HTTP PUT.
            contentType: 'application/json', // Tipo de contenido.
            data: JSON.stringify(taskData), // Datos en formato JSON.
            success: fetchTasks // Llama a `fetchTasks` después de actualizar.
        });
    } else { // Si no hay un ID, crea una nueva tarea.
        $.post('/tasks', taskData, fetchTasks); // Envía una solicitud POST para crear la tarea.
    }

    $('#taskForm')[0].reset(); // Limpia el formulario.
    $('#taskId').val(''); // Limpia el campo del ID de la tarea.
});

// Rellenar el formulario para editar
function editTask(id) { // Función para editar una tarea.
    $.get(`/tasks/${id}`, function (data) { // Realiza una solicitud GET para obtener los datos de la tarea.
        $('#taskId').val(data.id); // Asigna el ID de la tarea al campo oculto.
        $('#taskTitle').val(data.title); // Asigna el título.
        $('#taskDescS').val(data.desc_s); // Asigna la descripción corta.
        $('#taskDescL').val(data.desc_l); // Asigna la descripción larga.
        $('#taskPriority').val(data.priority); // Asigna la prioridad.
        $('#taskOwner').val(data.owner); // Asigna el propietario.
        $('#taskDept').val(data.dept); // Asigna el departamento.
        $('#taskCustomer').val(data.customer); // Asigna el cliente.
        $('#taskRequester').val(data.requester); // Asigna el solicitante.
        $('#taskArea').val(data.area); // Asigna el área.
        $('#taskUrl').val(data.url); // Asigna la URL.
        $('#taskAttachment').val(data.attachment); // Asigna el archivo adjunto.
        $('#taskStatus').val(data.status); // Asigna el estado.
        $('#taskTDT').val(data.tdt); // Asigna la fecha de entrega.
    });
}

// Eliminar una tarea
function deleteTask(id) { // Función para eliminar una tarea.
    // Mostrar un cuadro de diálogo para solicitar la contraseña
    const password = prompt("Por favor, ingresa la contraseña para eliminar la tarea:"); // Solicita la contraseña.

    // Verificar si la contraseña es correcta
    if (password === "pass123$") { // Si la contraseña es correcta.
        // Si la contraseña es correcta, proceder con la eliminación
        $.ajax({
            url: `/tasks/${id}`, // URL para eliminar la tarea.
            method: 'DELETE', // Método HTTP DELETE.
            success: fetchTasks // Llama a `fetchTasks` después de eliminar.
        });
    } else {
        // Si la contraseña es incorrecta, mostrar un mensaje de error
        alert("Contraseña incorrecta. No se eliminará la tarea."); // Muestra un mensaje de error.
    }
}

// Marcar una tarea como completada con confirmación de contraseña
async function markTaskAsCompleted(taskId) { // Función para marcar una tarea como completada.
    const password = prompt("Por favor, ingresa la contraseña para completar la tarea:"); // Solicita la contraseña.
    
    if (password === "pass123") { // Si la contraseña es correcta.
        try {
            await $.ajax({
                url: `/tasks/${taskId}/complete`, // URL para marcar la tarea como completada.
                method: 'PUT' // Método HTTP PUT.
            });
            alert("¡La tarea se ha completado exitosamente!"); // Muestra un mensaje de éxito.
            fetchTasks(); // Actualiza la lista de tareas.
        } catch (error) {
            console.error("Error al marcar la tarea como completada:", error); // Registra el error en la consola.
            alert("Hubo un error al intentar completar la tarea. Por favor, intenta nuevamente."); // Muestra un mensaje de error.
        }
    } else {
        alert("Contraseña incorrecta. No se completó la tarea."); // Muestra un mensaje de error si la contraseña es incorrecta.
    }
}

// Llamar a fetchTasks al cargar la página
$(document).ready(function () { // Espera a que el documento esté listo.
    fetchTasks(); // Llama a `fetchTasks` para cargar las tareas.
});
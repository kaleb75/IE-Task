# IE Task Management System

Este es un sistema de gestión de tareas diseñado para el equipo de IE (Industrial Engineering) de Inventec. Permite crear, editar, eliminar y marcar tareas como completadas, además de llevar un seguimiento de las tareas pendientes.

---

## Características principales

- **Crear tareas**: Permite agregar nuevas tareas con detalles como título, descripción, prioridad, propietario, cliente, solicitante, área, URL, archivo adjunto, estado y fecha objetivo.
- **Editar tareas**: Permite modificar los detalles de una tarea existente.
- **Eliminar tareas**: Permite eliminar tareas con confirmación de contraseña.
- **Marcar como completada**: Permite marcar una tarea como completada con confirmación de contraseña.
- **Visualización de tareas**: Muestra todas las tareas en una tabla con opciones para editar, eliminar o marcar como completada.
- **Autenticación básica**: Solicita una contraseña para acceder a la página y realizar acciones críticas como eliminar o completar tareas.

---

## Tecnologías utilizadas

- **Frontend**:
  - HTML5
  - CSS3
  - JavaScript (jQuery)
- **Backend**:
  - Node.js
  - Express.js
  - SQL Server (MSSQL)
- **Herramientas**:
  - Visual Studio Code (Editor de código)
  - Git (Control de versiones)

---

## Requisitos previos

Antes de ejecutar el proyecto, asegúrate de tener instalado lo siguiente:

1. **Node.js**: Descárgalo e instálalo desde [nodejs.org](https://nodejs.org/).
2. **SQL Server**: Asegúrate de tener acceso a una instancia de SQL Server con la base de datos configurada.
3. **Git**: Opcional, pero recomendado para clonar el repositorio. Descárgalo desde [git-scm.com](https://git-scm.com/).

---

## Configuración del proyecto

Sigue estos pasos para configurar y ejecutar el proyecto en tu máquina local:

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/tu-usuario/ie-task-management.git
   cd ie-task-management
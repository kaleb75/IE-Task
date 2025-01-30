# IE Task Management System

Este es un sistema de gestión de tareas diseñado para el equipo de IE (Industrial Engineering) de Inventec. Permite crear, editar, eliminar y marcar tareas como completadas, además de llevar un seguimiento de las tareas pendientes. El sistema está diseñado para ser intuitivo, seguro y escalable.

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

## Arquitectura del sistema

El sistema sigue una arquitectura cliente-servidor con las siguientes capas:

1. **Capa de presentación (Frontend)**:
   - **HTML/CSS**: Define la estructura y el estilo de la interfaz de usuario.
   - **JavaScript/jQuery**: Maneja la interacción del usuario y las llamadas AJAX al servidor.

2. **Capa de aplicación (Backend)**:
   - **Node.js/Express.js**: Maneja las solicitudes HTTP, la lógica de negocio y la interacción con la base de datos.
   - **RESTful API**: Expone endpoints para realizar operaciones CRUD sobre las tareas.

3. **Capa de datos**:
   - **SQL Server**: Almacena los datos de las tareas y los logs de las operaciones realizadas.

---

## Metodologías y procesos

### Metodología de desarrollo
El proyecto sigue una metodología ágil, con iteraciones cortas y entregas incrementales. Se utilizan las siguientes prácticas:

- **Desarrollo iterativo e incremental**: El proyecto se divide en pequeñas funcionalidades que se desarrollan, prueban y entregan en ciclos cortos.
- **Revisión de código**: Se realizan revisiones de código para asegurar la calidad y consistencia del mismo.
- **Pruebas manuales**: Cada funcionalidad se prueba manualmente antes de ser integrada al código base.

### Gestión de versiones
Se utiliza Git para el control de versiones, siguiendo el flujo de trabajo de Git Flow:

- **Ramas principales**:
  - `main`: Contiene el código estable y listo para producción.
  - `develop`: Contiene el código en desarrollo.
- **Ramas de características**: Cada nueva funcionalidad se desarrolla en una rama separada y se fusiona con `develop` una vez completada.

### Pruebas
Aunque no se han implementado pruebas automatizadas en esta fase, se realizan pruebas manuales exhaustivas para cada funcionalidad. Se planea integrar pruebas unitarias y de integración en futuras iteraciones.

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


## Instalar dependendencias
npm install

## Estructura del proyecto
ie-task-management/
├── server.js            # Punto de entrada del servidor backend
├── db.js                # Configuración de la conexión a la base de datos
├── queries.js           # Funciones para interactuar con la base de datos
├── script.js            # Lógica del frontend (manejo del DOM y llamadas AJAX)
├── styles.css           # Estilos CSS para la interfaz de usuario
├── index.html           # Página principal de la aplicación
├── README.md            # Documentación del proyecto
├── package.json         # Dependencias y scripts del proyecto
└── .env                 # Variables de entorno (no incluido en el repositorio)

## Mejoras futuras
-Implementación de pruebas automatizadas: Integrar pruebas unitarias y de integración para asegurar la calidad del código.
-Autenticación avanzada: Implementar un sistema de autenticación más robusto, como OAuth o JWT.
-Notificaciones: Agregar notificaciones en tiempo real para actualizaciones de tareas.
-Interfaz de usuario mejorada: Mejorar la experiencia de usuario con una interfaz más moderna y responsive.
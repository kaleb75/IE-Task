# Documento de Requerimientos de Software (SRS)
## Sistema de Gestión de Tareas para el Equipo de IE de Inventec

---

## 1. Introducción

### 1.1 Propósito
Este documento describe los requerimientos funcionales y no funcionales del **Sistema de Gestión de Tareas para el Equipo de IE de Inventec**. El sistema está diseñado para facilitar la creación, edición, eliminación y seguimiento de tareas pendientes, con el objetivo de mejorar la eficiencia y organización del equipo.

### 1.2 Alcance
El sistema permitirá a los usuarios:
- Crear nuevas tareas con detalles específicos.
- Editar tareas existentes.
- Eliminar tareas con confirmación de contraseña.
- Marcar tareas como completadas con confirmación de contraseña.
- Visualizar todas las tareas en una tabla interactiva.
- Acceder al sistema mediante autenticación básica.

### 1.3 Definiciones y Acrónimos
- **IE**: Industrial Engineering (Ingeniería Industrial).
- **SRS**: Software Requirements Specification (Especificación de Requerimientos de Software).
- **CRUD**: Create, Read, Update, Delete (Crear, Leer, Actualizar, Eliminar).
- **API**: Application Programming Interface (Interfaz de Programación de Aplicaciones).

### 1.4 Referencias
- Documentación oficial de [Node.js](https://nodejs.org/).
- Documentación oficial de [Express.js](https://expressjs.com/).
- Documentación oficial de [SQL Server](https://www.microsoft.com/en-us/sql-server/).

---

## 2. Descripción General

### 2.1 Perspectiva del Producto
El sistema es una aplicación web que consta de un frontend (HTML, CSS, JavaScript) y un backend (Node.js, Express.js, SQL Server). El frontend se encarga de la interacción con el usuario, mientras que el backend maneja la lógica de negocio y la persistencia de datos.

### 2.2 Funcionalidades Principales
- **Gestión de tareas**: Crear, leer, actualizar y eliminar tareas.
- **Autenticación básica**: Solicitar contraseña para acceder al sistema y realizar acciones críticas.
- **Visualización de tareas**: Mostrar las tareas en una tabla con opciones de edición, eliminación y marcado como completada.

### 2.3 Usuarios del Sistema
- **Administradores**: Pueden realizar todas las operaciones CRUD sobre las tareas.
- **Usuarios finales**: Pueden visualizar las tareas y marcar tareas como completadas (con confirmación de contraseña).

---

## 3. Requerimientos Funcionales

### 3.1 Gestión de Tareas
| ID   | Requerimiento                                                                 | Prioridad |
|------|-------------------------------------------------------------------------------|-----------|
| RF01 | El sistema debe permitir crear nuevas tareas con los siguientes campos: título, descripción corta, descripción larga, prioridad, propietario, departamento, cliente, solicitante, área, URL, archivo adjunto, estado y fecha objetivo. | Alta      |
| RF02 | El sistema debe permitir editar tareas existentes.                           | Alta      |
| RF03 | El sistema debe permitir eliminar tareas con confirmación de contraseña.     | Media     |
| RF04 | El sistema debe permitir marcar tareas como completadas con confirmación de contraseña. | Media     |
| RF05 | El sistema debe mostrar todas las tareas en una tabla con opciones para editar, eliminar y marcar como completada. | Alta      |

### 3.2 Autenticación
| ID   | Requerimiento                                                                 | Prioridad |
|------|-------------------------------------------------------------------------------|-----------|
| RF06 | El sistema debe solicitar una contraseña para acceder a la página principal.  | Alta      |
| RF07 | El sistema debe solicitar una contraseña para eliminar una tarea.             | Media     |
| RF08 | El sistema debe solicitar una contraseña para marcar una tarea como completada. | Media     |

---

## 4. Requerimientos No Funcionales

### 4.1 Usabilidad
| ID   | Requerimiento                                                                 | Prioridad |
|------|-------------------------------------------------------------------------------|-----------|
| RNF01| La interfaz de usuario debe ser intuitiva y fácil de usar.                    | Alta      |
| RNF02| El sistema debe ser responsive y funcionar correctamente en dispositivos móviles y de escritorio. | Media     |

### 4.2 Rendimiento
| ID   | Requerimiento                                                                 | Prioridad |
|------|-------------------------------------------------------------------------------|-----------|
| RNF03| El sistema debe cargar las tareas en menos de 2 segundos.                     | Alta      |
| RNF04| Las operaciones CRUD deben completarse en menos de 1 segundo.                 | Alta      |

### 4.3 Seguridad
| ID   | Requerimiento                                                                 | Prioridad |
|------|-------------------------------------------------------------------------------|-----------|
| RNF05| El sistema debe validar las contraseñas antes de permitir acciones críticas.  | Alta      |
| RNF06| Las contraseñas no deben almacenarse en texto plano.                          | Alta      |

### 4.4 Mantenibilidad
| ID   | Requerimiento                                                                 | Prioridad |
|------|-------------------------------------------------------------------------------|-----------|
| RNF07| El código debe estar documentado y seguir buenas prácticas de desarrollo.     | Alta      |
| RNF08| El sistema debe ser fácil de extender con nuevas funcionalidades.             | Media     |

---

## 5. Requerimientos de Interfaz

### 5.1 Interfaz de Usuario
- **Formulario de tareas**: Debe incluir campos para título, descripción corta, descripción larga, prioridad, propietario, departamento, cliente, solicitante, área, URL, archivo adjunto, estado y fecha objetivo.
- **Tabla de tareas**: Debe mostrar todas las tareas con opciones para editar, eliminar y marcar como completada.

### 5.2 Interfaz de Hardware
- El sistema debe ser compatible con navegadores web modernos (Chrome, Firefox, Edge, Safari).

### 5.3 Interfaz de Software
- **Frontend**: HTML, CSS, JavaScript (jQuery).
- **Backend**: Node.js, Express.js.
- **Base de datos**: SQL Server.

---

## 6. Requerimientos de Base de Datos

### 6.1 Estructura de la Base de Datos
- **Tabla `ie_tasks`**:
  - `id` (INT, PK): Identificador único de la tarea.
  - `title` (VARCHAR): Título de la tarea.
  - `desc_s` (TEXT): Descripción corta de la tarea.
  - `desc_l` (TEXT): Descripción larga de la tarea.
  - `priority` (INT): Prioridad de la tarea (1-5).
  - `owner` (VARCHAR): Propietario de la tarea.
  - `dept` (VARCHAR): Departamento asociado a la tarea.
  - `customer` (VARCHAR): Cliente asociado a la tarea.
  - `requester` (VARCHAR): Solicitante de la tarea.
  - `area` (VARCHAR): Área asociada a la tarea.
  - `url` (TEXT): URL relacionada con la tarea.
  - `attachment` (TEXT): Archivo adjunto relacionado con la tarea.
  - `status` (VARCHAR): Estado de la tarea (NEW, WIP, ON HOLD, etc.).
  - `tdt` (DATETIME): Fecha y hora objetivo de la tarea.
  - `cdt` (DATETIME): Fecha y hora de creación de la tarea.
  - `udt` (DATETIME): Fecha y hora de última actualización de la tarea.

- **Tabla `ie_tasksLogs`**:
  - `id` (INT, PK): Identificador único del log.
  - `task_id` (INT, FK): ID de la tarea relacionada.
  - `action` (VARCHAR): Acción realizada (CREATE, UPDATE, DELETE, COMPLETE).
  - `timestamp` (DATETIME): Fecha y hora de la acción.

---

## 7. Requerimientos de Seguridad

### 7.1 Autenticación
- El sistema debe solicitar una contraseña para acceder a la página principal.
- Las acciones críticas (eliminar, completar) deben requerir confirmación de contraseña.

### 7.2 Protección de Datos
- Las contraseñas no deben almacenarse en texto plano.
- Las conexiones a la base de datos deben estar cifradas.

---

## 8. Requerimientos de Mantenimiento

### 8.1 Documentación
- El código debe estar documentado con comentarios claros y concisos.
- Se debe mantener un archivo `README.md` actualizado con la información del proyecto.

### 8.2 Pruebas
- Se deben implementar pruebas unitarias y de integración para asegurar la calidad del código.

---

## 9. Requerimientos Futuros

- **Implementación de pruebas automatizadas**: Integrar pruebas unitarias y de integración.
- **Autenticación avanzada**: Implementar un sistema de autenticación más robusto, como OAuth o JWT.
- **Notificaciones en tiempo real**: Agregar notificaciones para actualizaciones de tareas.

---

## 10. Conclusiones

Este documento describe los requerimientos funcionales y no funcionales del **Sistema de Gestión de Tareas para el Equipo de IE de Inventec**. El sistema está diseñado para ser intuitivo, seguro y escalable, con el objetivo de mejorar la eficiencia y organización del equipo.

---

## 11. Aprobaciones

| Nombre          | Rol                | Firma       | Fecha       |
|-----------------|--------------------|-------------|-------------|
| [Tu nombre]     | Ingeniero de Software | [Firma]     | [Fecha]     |
| [Nombre del cliente] | Cliente           | [Firma]     | [Fecha]     |
## 1. Diagrama de Casos de Uso

El siguiente diagrama muestra los casos de uso principales del sistema y los actores involucrados.

```mermaid
graph TD
    A[Usuario] -->|Acceder al sistema| B(Acceso con contraseña)
    A -->|Crear tarea| C(Crear Tarea)
    A -->|Editar tarea| D(Editar Tarea)
    A -->|Eliminar tarea| E(Eliminar Tarea)
    A -->|Marcar como completada| F(Marcar como Completada)
    A -->|Ver tareas| G(Ver Tareas)

graph TD
    A[Usuario] -->|Acceder al sistema| B(Acceso con contraseña)
    A -->|Crear tarea| C(Crear Tarea)
    A -->|Editar tarea| D(Editar Tarea)
    A -->|Eliminar tarea| E(Eliminar Tarea)
    A -->|Marcar como completada| F(Marcar como Completada)
    A -->|Ver tareas| G(Ver Tareas)

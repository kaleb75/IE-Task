# Diagramas del Sistema de Gestión de Tareas

Este documento contiene diagramas que explican el funcionamiento del **Sistema de Gestión de Tareas para el Equipo de IE de Inventec**. Los diagramas están creados usando [Mermaid](https://mermaid-js.github.io/mermaid/), una herramienta compatible con GitHub para crear diagramas en Markdown.

---

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
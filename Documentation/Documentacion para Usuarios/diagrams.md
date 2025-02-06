# Diagramas del Sistema de Gestión de Tareas

Este documento contiene diagramas que explican el funcionamiento del **Sistema de Gestión de Tareas para el Equipo de IE de Inventec**. Los diagramas están creados usando [Mermaid](https://mermaid-js.github.io/mermaid/), una herramienta compatible con GitHub para crear diagramas en Markdown.

---

## 1. Diagrama de Casos de Uso

El siguiente diagrama muestra los casos de uso principales del sistema y los actores involucrados.

---
title: Diagrama de Casos de Uso - Sistema de Gestión de Tareas
---
useCaseDiagram
    actor Usuario as "Usuario (Equipo de IE)"
    
    rectangle Sistema {
        usecase (Autenticarse) as UC1
        usecase (Crear Tarea) as UC2
        usecase (Editar Tarea) as UC3
        usecase (Eliminar Tarea) as UC4
        usecase (Marcar Completada) as UC5
        usecase (Visualizar Tareas) as UC6
        usecase (Filtrar Tareas) as UC7
        usecase (Exportar Reporte) as UC8
        
        UC1 <.. UC2 : <<extend>>
        UC1 <.. UC3 : <<extend>>
        UC1 <.. UC4 : <<extend>>
        UC1 <.. UC5 : <<extend>>
        UC1 <.. UC6 : <<extend>>
        
        UC6 <.. UC7 : <<include>>
        UC6 <.. UC8 : <<include>>
    }
    
    Usuario --> UC1
    Usuario --> UC2
    Usuario --> UC3
    Usuario --> UC4
    Usuario --> UC5
    Usuario --> UC6

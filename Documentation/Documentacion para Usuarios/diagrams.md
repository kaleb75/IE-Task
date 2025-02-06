%% Diagrama de Casos de Uso Mejorado para el Sistema de Tareas (DPS/Task Management)
graph TD
    subgraph "Acceso y Navegación"
        A[Usuario] -->|Acceder al sistema| B(Login (Acceso con contraseña))
        B --> C(Dashboard)
    end

    subgraph "Gestión de Tareas"
        C -->|Crear tarea| D(Crear Tarea)
        C -->|Editar tarea| E(Editar Tarea)
        C -->|Eliminar tarea| F(Eliminar Tarea)
        C -->|Marcar como completada| G(Marcar Tarea como Completada)
        C -->|Ver tareas| H(Ver Tareas)
        C -->|Ver tareas archivadas| I(Ver Tareas Archivadas)
    end

    subgraph "Registro de Logs"
        D --> J[Registrar Log de Creación]
        E --> K[Registrar Log de Edición]
        F --> L[Registrar Log de Eliminación]
        G --> M[Registrar Log de Completado]
    end

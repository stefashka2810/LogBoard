# Клиентская бизнес-логика LogBoard

```mermaid
%%{init: {
  "theme": "base",
  "themeVariables": {
    "background": "#f3f4f6",
    "primaryColor": "#fff7e8",
    "primaryTextColor": "#222222",
    "primaryBorderColor": "#d97706",
    "lineColor": "#444444",
    "secondaryColor": "#ffffff",
    "tertiaryColor": "#ffffff",
    "fontSize": "15px"
  }
}}%%
flowchart TB
    UI["UI-компоненты<br/>страницы, формы, dashboard"]
    BASE["baseApi<br/>общая конфигурация,<br/>cookie-сессия, refresh"]
    API["API-запросы<br/>auth, projects, members,<br/>api-keys, logs"]
    STORE["Хранение состояния<br/>auth, projectsWork, logsWork"]
    BACK["Backend API"]

    UI --> STORE
    UI --> API
    API --> BASE
    BASE <--> BACK
    API --> STORE

    classDef ui fill:#eef4ff,stroke:#4C6DFA,color:#222222,stroke-width:2px;
    classDef logic fill:#fff7e8,stroke:#d97706,color:#222222,stroke-width:2px;
    classDef state fill:#ecfccb,stroke:#65a30d,color:#222222,stroke-width:2px;
    classDef backend fill:#fdf2f8,stroke:#db2777,color:#222222,stroke-width:2px;

    class UI ui;
    class BASE,API logic;
    class STORE state;
    class BACK backend;
```

Клиентская бизнес-логика разделена на уровни: `baseApi` отвечает за общее взаимодействие
с backend, слой API-запросов реализует прикладные обращения к серверу, а слой хранения
состояния управляет ключевыми данными приложения.

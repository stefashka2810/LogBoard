# Авторизация и разграничение прав доступа

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
    "fontSize": "12px"
  }
}}%%
flowchart TB
    U["👤 Пользователь"]
    L["Вход"]
    S["Cookie-<br/>сессия"]
    Q["Защищённый<br/>запрос"]
    R["401"]
    F["Refresh"]
    OK["Сессия<br/>обновлена"]
    O["Выход"]

    RO["OWNER<br/>полный доступ"]
    RA["ADMIN<br/>проект и READER"]
    RR["READER<br/>просмотр логов"]

    U --> L --> S --> Q
    Q -->|сессия активна| RO
    Q -->|сессия активна| RA
    Q -->|сессия активна| RR
    Q -->|сессия истекла| R --> F
    F -->|успешно| OK --> Q
    F -->|ошибка| O

    classDef main fill:#fff7e8,stroke:#d97706,color:#222222,stroke-width:1.5px;
    classDef roleOwner fill:#ffe4e6,stroke:#e11d48,color:#222222,stroke-width:1.5px;
    classDef roleAdmin fill:#ede9fe,stroke:#7c3aed,color:#222222,stroke-width:1.5px;
    classDef roleReader fill:#ecfccb,stroke:#65a30d,color:#222222,stroke-width:1.5px;
    classDef warn fill:#fef2f2,stroke:#ef4444,color:#222222,stroke-width:1.5px;
    classDef ok fill:#ecfdf5,stroke:#10b981,color:#222222,stroke-width:1.5px;

    class U,L,S,Q,F main;
    class RO roleOwner;
    class RA roleAdmin;
    class RR roleReader;
    class R,O warn;
    class OK ok;
```

Авторизация в системе построена на серверной сессии и cookie. При истечении сессии
клиентская часть автоматически пытается обновить её через `refresh`, а доступные
действия пользователя определяются его ролью в проекте: `OWNER`, `ADMIN` или `READER`.

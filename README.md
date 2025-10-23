# SGAD – Frontend

Interfaz web del **SGAD (Sistema de Gestión de Árbitros y Designaciones)**.  
Este módulo provee la capa de **presentación** para administradores, clubes y árbitros, permitiendo interactuar con los microservicios del sistema a través del **API Gateway**.

---

## 📖 Descripción

El **Frontend de SGAD** está construido con **React + Vite** y sirve como punto de entrada para los usuarios del sistema:  
- **Administrador**: gestionar partidos, designar árbitros y consultar reportes.  
- **Club/Equipo**: solicitar árbitros y ver asignaciones.  
- **Árbitro**: consultar designaciones y disponibilidad.  

Toda la comunicación con los microservicios se realiza a través del **API Gateway** (`sgad-api-gateway`).

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

---

## 🖼️ Tecnologías Utilizadas

- **React 18** – librería de JavaScript para la construcción de interfaces.  
- **Vite** – herramienta rápida de desarrollo y empaquetado.  
- **JavaScript/TypeScript** – lenguaje principal del frontend.  
- **CSS / Tailwind (opcional según configuración)** – estilos y diseño responsivo.  
- **Axios o Fetch API** – para el consumo de APIs REST.  

---

## 📂 Estructura del Proyecto

```
sgad-frontend/
│── index.html              # Página base del frontend
│── package.json            # Dependencias del proyecto
│── vite.config.js          # Configuración de Vite
│
├── public/                 # Recursos públicos
│   └── vite.svg
│
├── src/                    # Código fuente principal
│   ├── main.jsx            # Punto de entrada
│   ├── App.jsx             # Componente principal
│   ├── App.css             # Estilos principales
│   ├── index.css           # Estilos globales
│   └── components/         # Componentes reutilizables (opcional)
│
└── páginas_vista_admin/    # Interfaz para administrador (ej. gestión de partidos y árbitros)
    ├── next.config.mjs
    ├── tsconfig.json
    ├── package.json
    └── otros archivos de configuración
```

---

## ⚙️ Requisitos

- **Node.js 18+**  
- **npm** o **yarn** como gestor de paquetes  
- Docker (opcional, para despliegue contenerizado)  

Instalar dependencias:

```bash
npm install
```

---

## ▶️ Ejecución Local

1. Clonar el repositorio:  
   ```bash
   git clone https://github.com/Arquisoft-G1C/sgad-frontend.git
   cd sgad-frontend
   ```

2. Instalar dependencias:  
   ```bash
   npm install
   ```

3. Ejecutar en modo desarrollo:  
   ```bash
   npm run dev
   ```

4. Acceder en el navegador:  
   ```
   http://localhost:3000
   ```

---

## 🐳 Despliegue con Docker

1. Crear la imagen:  
   ```bash
   docker build -t sgad-frontend .
   ```

2. Ejecutar el contenedor:  
   ```bash
   docker run -d -p 3000:3000 sgad-frontend
   ```

---

## 📡 Integración con SGAD

- El **Frontend** se comunica exclusivamente con el **API Gateway**.  
- Todas las peticiones del usuario (gestión de partidos, designaciones, disponibilidad) se enrutan hacia:  
  - `sgad-match-management`  
  - `sgad-referee-management`  
  - `sgad-auth-service`  
- Forma parte del ecosistema desplegado con `docker-compose` en **`sgad-main`**.  

---

## 👨‍💻 Scripts Disponibles

- `npm run dev` → Ejecuta el proyecto en modo desarrollo (hot reload).  
- `npm run build` → Construye la aplicación para producción.  
- `npm run preview` → Previsualiza la versión construida.  

---

## 📑 Ejemplo de Configuración de API

En un archivo de configuración (ej. `src/config.js`):

```javascript
export const API_URL = "http://localhost:8080"; // API Gateway
```

De esta forma, cualquier componente puede hacer peticiones:

```javascript
import { API_URL } from "./config";

fetch(`${API_URL}/matches`)
  .then(res => res.json())
  .then(data => console.log(data));
```

---

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

---

## 📅 Estado Actual

Este frontend es un prototipo inicial (Prototype 1) y está en desarrollo.  
Las pantallas implementadas corresponden a la vista de **administrador** y módulos básicos de gestión.  

---

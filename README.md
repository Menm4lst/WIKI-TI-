# 📚 WIKII - Wiki Técnica Interna

Sistema completo de documentación técnica para equipos de IT. Permite crear, gestionar y buscar artículos sobre incidencias, errores, soluciones y procedimientos de aplicaciones corporativas.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-ISC-green.svg)

## 🎯 Características Principales

### ✨ Gestión de Artículos
- **Crear, editar y eliminar** artículos técnicos
- **Editor Markdown** para formato profesional
- **Categorización** por tipo: incidencia, error, solución, procedimiento, configuración, mantenimiento
- **Niveles de severidad**: baja, media, alta, crítica
- **Sistema de tags** para mejor organización
- **Historial de versiones** completo con descripción de cambios

### 🔍 Búsqueda Avanzada
- **Búsqueda de texto completo** en títulos y contenido
- **Filtrado por aplicación** (SAP, Oracle, Salesforce, etc.)
- **Filtrado por código de error**
- **Filtrado por tags**
- **Filtrado por categoría y severidad**
- **Autocompletado** y sugerencias

### 📊 Estadísticas y Métricas
- Contador de visualizaciones por artículo
- Sistema de valoración "útil"
- Artículos más populares
- Estadísticas por categoría
- Historial de cambios y versiones

### 🎨 Interfaz Corporativa
- Diseño limpio y profesional con Tailwind CSS
- Responsive (móvil, tablet, desktop)
- Look & feel corporativo
- Navegación intuitiva
- Visualización de markdown con sintaxis destacada

## 🛠️ Stack Tecnológico

### Backend
- **Node.js** + **Express.js** - Servidor API REST
- **MongoDB** + **Mongoose** - Base de datos NoSQL
- **JWT** - Autenticación (preparado para futuras implementaciones)
- **Express Validator** - Validación de datos

### Frontend
- **React 18** + **Vite** - Framework y build tool
- **React Router** - Enrutamiento SPA
- **Axios** - Cliente HTTP
- **Tailwind CSS** - Estilos y diseño
- **React Markdown** - Renderizado de markdown
- **React Icons** - Iconografía
- **date-fns** - Manejo de fechas

## 📁 Estructura del Proyecto

```
WIKII/
├── backend/
│   ├── models/
│   │   ├── Article.js      # Modelo de artículos con versiones
│   │   └── Category.js     # Modelo de categorías
│   ├── routes/
│   │   ├── articles.js     # Endpoints CRUD artículos
│   │   ├── search.js       # Endpoints de búsqueda
│   │   └── categories.js   # Endpoints de categorías
│   ├── .env.example        # Variables de entorno
│   ├── server.js           # Configuración del servidor
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout.jsx       # Layout principal
│   │   │   ├── ArticleCard.jsx  # Tarjeta de artículo
│   │   │   └── SearchBar.jsx    # Barra de búsqueda
│   │   ├── pages/
│   │   │   ├── Home.jsx          # Página principal
│   │   │   ├── ArticleList.jsx   # Listado de artículos
│   │   │   ├── ArticleView.jsx   # Vista de artículo
│   │   │   ├── ArticleCreate.jsx # Crear artículo
│   │   │   ├── ArticleEdit.jsx   # Editar artículo
│   │   │   └── Search.jsx        # Búsqueda avanzada
│   │   ├── services/
│   │   │   └── api.js            # Cliente API
│   │   ├── App.jsx               # Componente principal
│   │   ├── main.jsx              # Punto de entrada
│   │   └── index.css             # Estilos globales
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
└── package.json              # Scripts raíz
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 18+ instalado
- MongoDB instalado y ejecutándose
- Git (opcional)

### 1. Clonar o descargar el proyecto

```bash
cd "C:\Users\Aaron\OneDrive\Desktop\PROYECTOS DEV\WIKII"
```

### 2. Instalar todas las dependencias

```bash
npm run install-all
```

Este comando instalará las dependencias en:
- Raíz del proyecto
- Backend
- Frontend

### 3. Configurar variables de entorno

Crear archivo `.env` en la carpeta `backend/`:

```bash
cd backend
copy .env.example .env
```

Editar `backend/.env`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/wikii-technical
JWT_SECRET=tu_clave_secreta_segura_aqui
NODE_ENV=development
```

### 4. Iniciar MongoDB

Asegúrate de que MongoDB está corriendo:

```bash
# Windows
mongod

# O si usas MongoDB como servicio
net start MongoDB
```

### 5. Ejecutar la aplicación

**Opción A: Ejecutar todo junto (Recomendado)**
```bash
npm run dev
```

**Opción B: Ejecutar por separado**

Terminal 1 - Backend:
```bash
npm run server
```

Terminal 2 - Frontend:
```bash
npm run client
```

### 6. Acceder a la aplicación

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api

## 📖 Uso del Sistema

### Crear un Artículo

1. Click en **"Nuevo Artículo"** en el header
2. Completar el formulario:
   - **Título**: Descriptivo del problema/solución
   - **Aplicación**: Sistema afectado (SAP, Oracle, etc.)
   - **Código de Error**: Si aplica
   - **Categoría**: Tipo de artículo
   - **Severidad**: Nivel de criticidad
   - **Tags**: Palabras clave separadas por coma
   - **Contenido**: Usar Markdown para formato

3. Click en **"Crear Artículo"**

### Ejemplo de Contenido Markdown

```markdown
## Descripción del Problema
Error de conexión al servidor SAP con código RFC_ERROR_SYSTEM_FAILURE

## Síntomas
- Usuario no puede acceder a transacciones
- Mensaje de error en pantalla
- Timeout después de 30 segundos

## Solución

### Paso 1: Verificar conexión
```bash
ping sap-server.empresa.com
```

### Paso 2: Reiniciar servicio
1. Abrir servicios de Windows
2. Buscar "SAP GUI"
3. Reiniciar el servicio

### Paso 3: Verificar credenciales
Validar usuario y contraseña en SM50

## Notas Adicionales
- Este error suele ocurrir después de actualizaciones
- Contactar a administrador SAP si persiste
```

### Buscar Artículos

**Búsqueda Simple:**
- Usar la barra de búsqueda en el home
- Escribir aplicación, código de error o palabras clave

**Búsqueda Avanzada:**
1. Ir a la página "Buscar"
2. Usar filtros:
   - Por aplicación
   - Por código de error
   - Por categoría
   - Por severidad
   - Por tags
3. Combinar múltiples filtros

### Editar Artículos

1. Abrir el artículo a editar
2. Click en **"Editar"**
3. Realizar cambios
4. Agregar **descripción del cambio** (se guarda en historial)
5. Click en **"Guardar Cambios"**

El sistema automáticamente guarda la versión anterior en el historial.

## 🔌 API Endpoints

### Artículos

```
GET    /api/articles              # Listar artículos (con filtros)
GET    /api/articles/:id          # Obtener artículo por ID
POST   /api/articles              # Crear artículo
PUT    /api/articles/:id          # Actualizar artículo
DELETE /api/articles/:id          # Eliminar artículo
GET    /api/articles/:id/versions # Obtener historial de versiones
POST   /api/articles/:id/helpful  # Marcar como útil
GET    /api/articles/stats/popular # Artículos más vistos
```

### Búsqueda

```
GET /api/search                   # Búsqueda general
GET /api/search/applications/list # Listar aplicaciones
GET /api/search/errorcodes/list   # Listar códigos de error
GET /api/search/tags/list         # Listar tags
GET /api/search/suggestions       # Autocompletado
```

### Categorías

```
GET  /api/categories              # Listar categorías
POST /api/categories              # Crear categoría
GET  /api/categories/stats        # Estadísticas
GET  /api/categories/update-counts # Actualizar contadores
```

## 🎨 Personalización

### Cambiar Colores Corporativos

Editar `frontend/tailwind.config.js`:

```javascript
colors: {
  primary: {
    500: '#TU_COLOR',
    600: '#TU_COLOR_OSCURO',
    // ...
  }
}
```

### Agregar Nuevas Categorías

Editar `backend/models/Article.js`:

```javascript
category: {
  type: String,
  required: true,
  enum: ['incidencia', 'error', 'solucion', 'procedimiento', 'tu-nueva-categoria']
}
```

## 🔒 Seguridad (Futuras Mejoras)

El sistema está preparado para implementar:
- Autenticación JWT
- Roles y permisos
- Auditoría de cambios
- Rate limiting
- Validación de entrada

## 🐛 Troubleshooting

### Error: MongoDB no conecta
```
Verificar que MongoDB esté corriendo
mongod --version
net start MongoDB  # Windows
```

### Error: Puerto 3000 o 5000 en uso
```
Cambiar puerto en:
- backend/.env (PORT=5001)
- frontend/vite.config.js (port: 3001)
```

### Error: Módulos no encontrados
```
Reinstalar dependencias:
rm -rf node_modules package-lock.json
npm run install-all
```

## 📝 Scripts Disponibles

```bash
# Raíz del proyecto
npm run dev          # Ejecutar frontend y backend
npm run install-all  # Instalar todas las dependencias
npm run build        # Build de producción
npm run start        # Ejecutar en producción

# Backend
npm run dev          # Modo desarrollo con nodemon
npm start            # Modo producción

# Frontend
npm run dev          # Servidor de desarrollo
npm run build        # Build para producción
npm run preview      # Preview del build
```

## 🚀 Deployment

### Backend (Node.js)
1. Configurar variables de entorno en servidor
2. Usar PM2 o similar para proceso persistente
3. Configurar MongoDB Atlas o MongoDB local

### Frontend (React)
1. `npm run build` en carpeta frontend
2. Subir carpeta `dist/` a servidor web
3. Configurar nginx/Apache para SPA routing

## 📄 Licencia

ISC

## 👥 Autor

Desarrollado para técnicos de IT

---

## 🎯 Próximas Funcionalidades

- [ ] Sistema de autenticación completo
- [ ] Adjuntar imágenes y archivos
- [ ] Comparar versiones lado a lado
- [ ] Exportar artículos a PDF
- [ ] Notificaciones de nuevos artículos
- [ ] Dashboard de analytics
- [ ] API pública con documentación Swagger
- [ ] Sistema de comentarios
- [ ] Favoritos y bookmarks
- [ ] Modo oscuro

---

**¿Necesitas ayuda?** Contacta al administrador del sistema o revisa la documentación técnica.

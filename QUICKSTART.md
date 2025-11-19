# 🚀 Guía de Inicio Rápido - WIKII

## Instalación en 5 minutos

### 1️⃣ Verificar Requisitos

```powershell
# Verificar Node.js (debe ser v18+)
node --version

# Verificar MongoDB
mongod --version
```

### 2️⃣ Navegar al Proyecto

```powershell
cd "C:\Users\Aaron\OneDrive\Desktop\PROYECTOS DEV\WIKII"
```

### 3️⃣ Instalar Dependencias

```powershell
npm run install-all
```

⏱️ Esto tomará 2-3 minutos dependiendo de tu conexión.

### 4️⃣ Configurar Backend

```powershell
cd backend
copy .env.example .env
```

Edita el archivo `.env` si necesitas cambiar la configuración.

### 5️⃣ Iniciar MongoDB

**Opción A: Como servicio**
```powershell
net start MongoDB
```

**Opción B: Manualmente**
```powershell
mongod
```

### 6️⃣ Ejecutar la Aplicación

Vuelve a la carpeta raíz:
```powershell
cd ..
npm run dev
```

### 7️⃣ ¡Listo! 🎉

Abre tu navegador:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000/api/health

---

## Primer Uso

### Crear tu Primer Artículo

1. Haz clic en **"Nuevo Artículo"** (botón azul arriba a la derecha)
2. Completa:
   - **Título**: "Error de conexión a SAP"
   - **Aplicación**: "SAP"
   - **Código de Error**: "RFC_ERROR"
   - **Categoría**: "Error"
   - **Severidad**: "Alta"
   - **Tags**: "sap, conexion, rfc"
   - **Contenido**:
   ```markdown
   ## Problema
   No se puede conectar al servidor SAP
   
   ## Solución
   1. Verificar conectividad de red
   2. Reiniciar servicio SAP GUI
   3. Validar credenciales
   ```
3. Clic en **"Crear Artículo"**

### Buscar Artículos

- **Búsqueda simple**: Escribe en la barra de búsqueda del inicio
- **Búsqueda avanzada**: Ve a "Buscar" y usa los filtros

---

## Comandos Útiles

### Desarrollo
```powershell
npm run dev           # Ejecutar frontend + backend
npm run server        # Solo backend
npm run client        # Solo frontend
```

### Producción
```powershell
npm run build         # Build de producción
npm start             # Ejecutar en producción
```

### Mantenimiento
```powershell
# Limpiar e reinstalar todo
rm -r node_modules, backend/node_modules, frontend/node_modules
npm run install-all
```

---

## ¿Problemas?

### MongoDB no conecta
```powershell
# Verificar estado
net start MongoDB

# O iniciar manualmente
mongod
```

### Puerto ocupado
Edita en `backend/.env`:
```
PORT=5001
```

Y en `frontend/vite.config.js`:
```javascript
server: { port: 3001 }
```

### Permisos de carpeta
```powershell
# Ejecutar PowerShell como Administrador si hay problemas de permisos
```

---

## Siguiente Paso

Lee el **README.md** completo para:
- Documentación de API
- Personalización
- Deployment
- Características avanzadas

---

**¡Disfruta documentando! 📚**

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Article from './models/Article.js';
import Category from './models/Category.js';

dotenv.config();

const sampleArticles = [
  {
    title: 'Error de conexión SAP - RFC_ERROR_SYSTEM_FAILURE',
    content: `## Descripción del Problema
El sistema SAP arroja el error RFC_ERROR_SYSTEM_FAILURE al intentar ejecutar transacciones que requieren comunicación RFC.

## Causa Raíz
- Servidor RFC no disponible
- Credenciales incorrectas
- Firewall bloqueando el puerto 3300

## Solución
1. Verificar conectividad de red:
\`\`\`bash
ping servidor-sap.empresa.com
telnet servidor-sap.empresa.com 3300
\`\`\`

2. Validar credenciales en SM59
3. Revisar configuración de firewall
4. Reiniciar servicio SAProuter si es necesario

## Resultado
Conexión RFC establecida correctamente después de abrir el puerto en el firewall.`,
    application: 'SAP ERP',
    errorCode: 'RFC_ERROR_SYSTEM_FAILURE',
    category: 'error',
    tags: ['sap', 'rfc', 'conexion', 'firewall'],
    severity: 'alta',
    author: 'Juan Pérez',
    status: 'publicado',
    views: 45,
    helpful: 12
  },
  {
    title: 'Procedimiento: Backup diario de base de datos Oracle',
    content: `## Objetivo
Realizar respaldo completo de la base de datos Oracle de producción.

## Frecuencia
Diario a las 2:00 AM

## Pasos
1. Conectar como usuario SYSDBA:
\`\`\`sql
sqlplus / as sysdba
\`\`\`

2. Verificar modo de base de datos:
\`\`\`sql
SELECT log_mode FROM v$database;
\`\`\`

3. Ejecutar backup con RMAN:
\`\`\`bash
rman target /
BACKUP DATABASE PLUS ARCHIVELOG;
\`\`\`

4. Verificar el backup:
\`\`\`bash
RMAN> LIST BACKUP SUMMARY;
\`\`\`

## Ubicación de Backups
\`/backup/oracle/daily/\`

## Retención
30 días`,
    application: 'Oracle Database 19c',
    errorCode: '',
    category: 'procedimiento',
    tags: ['oracle', 'backup', 'rman', 'database'],
    severity: 'critica',
    author: 'María González',
    status: 'publicado',
    views: 78,
    helpful: 25
  },
  {
    title: 'Solución: Lentitud en Salesforce Lightning',
    content: `## Síntomas
- Páginas tardan más de 10 segundos en cargar
- Timeout en consultas SOQL
- Usuarios reportan congelamiento de pantalla

## Diagnóstico
1. Revisar límites de API en Setup → System Overview
2. Verificar queries con Query Plan Tool
3. Analizar componentes Lightning con Chrome DevTools

## Solución Implementada
### 1. Optimización de SOQL
\`\`\`apex
// Antes (malo)
List<Account> accounts = [SELECT Id, Name, (SELECT Id FROM Contacts) FROM Account];

// Después (optimizado)
List<Account> accounts = [SELECT Id, Name FROM Account WHERE CreatedDate = THIS_YEAR LIMIT 200];
\`\`\`

### 2. Indexación de Campos Personalizados
Crear índices en campos usados en filtros frecuentes.

### 3. Lazy Loading en Lightning
Implementar carga diferida de datos en componentes.

## Resultado
Tiempo de carga reducido de 12s a 2.5s promedio.`,
    application: 'Salesforce',
    errorCode: '',
    category: 'solucion',
    tags: ['salesforce', 'performance', 'lightning', 'soql'],
    severity: 'media',
    author: 'Carlos Ramírez',
    status: 'publicado',
    views: 93,
    helpful: 31
  },
  {
    title: 'Incidencia: Caída del servidor de aplicaciones',
    content: `## Fecha y Hora
15/11/2025 - 14:35 hrs

## Impacto
- 200 usuarios sin acceso al sistema ERP
- Transacciones de ventas detenidas
- Duración: 45 minutos

## Causa
Memoria heap del servidor Java agotada (OutOfMemoryError).

## Acciones Tomadas
1. Reinicio de emergencia del servidor Tomcat
2. Incremento de heap memory de 2GB a 4GB:
\`\`\`bash
export CATALINA_OPTS="-Xms2048m -Xmx4096m"
\`\`\`

3. Análisis de heap dump con VisualVM
4. Identificación de memory leak en módulo de reportes

## Acciones Preventivas
- Implementar monitoreo proactivo de memoria
- Ajustar parámetros de garbage collection
- Revisar código del módulo de reportes`,
    application: 'Tomcat Server',
    errorCode: 'OutOfMemoryError',
    category: 'incidencia',
    tags: ['java', 'tomcat', 'memory', 'outage'],
    severity: 'critica',
    author: 'Ana Martínez',
    status: 'publicado',
    views: 67,
    helpful: 18
  },
  {
    title: 'Configuración: VPN Corporativa en Windows 11',
    content: `## Requisitos Previos
- Windows 11 Pro o Enterprise
- Credenciales VPN corporativas
- Cliente Cisco AnyConnect instalado

## Pasos de Configuración

### 1. Instalación
1. Descargar Cisco AnyConnect desde el portal IT
2. Ejecutar instalador como administrador
3. Aceptar certificados de seguridad

### 2. Configuración
1. Abrir Cisco AnyConnect
2. Ingresar servidor VPN: \`vpn.empresa.com\`
3. Seleccionar "Connect"
4. Ingresar credenciales de dominio

### 3. Configuración de DNS
Agregar sufijos DNS en propiedades de adaptador:
- \`empresa.local\`
- \`corp.empresa.com\`

### 4. Verificación
\`\`\`cmd
ping servidor-interno.empresa.local
nslookup servidor-interno.empresa.local
\`\`\`

## Troubleshooting
- Error "Failed to connect": Verificar firewall local
- DNS no resuelve: Reiniciar servicio DNS Client
- Desconexiones frecuentes: Deshabilitar IPv6`,
    application: 'Cisco AnyConnect',
    errorCode: '',
    category: 'configuracion',
    tags: ['vpn', 'cisco', 'windows', 'networking'],
    severity: 'media',
    author: 'Roberto Silva',
    status: 'publicado',
    views: 124,
    helpful: 42
  },
  {
    title: 'Mantenimiento: Limpieza de logs antiguos en servidor Linux',
    content: `## Objetivo
Liberar espacio en disco eliminando logs antiguos.

## Frecuencia
Mensual

## Scripts de Limpieza

### 1. Identificar archivos grandes
\`\`\`bash
find /var/log -type f -size +100M -exec ls -lh {} \\;
\`\`\`

### 2. Comprimir logs antiguos
\`\`\`bash
find /var/log -name "*.log" -mtime +7 -exec gzip {} \\;
\`\`\`

### 3. Eliminar logs de más de 30 días
\`\`\`bash
find /var/log -name "*.gz" -mtime +30 -delete
\`\`\`

### 4. Limpiar journal de systemd
\`\`\`bash
journalctl --vacuum-time=30d
journalctl --vacuum-size=500M
\`\`\`

### 5. Verificar espacio liberado
\`\`\`bash
df -h /var/log
du -sh /var/log/*
\`\`\`

## Configuración Automática
Agregar a crontab:
\`\`\`bash
0 2 1 * * /usr/local/bin/cleanup-logs.sh
\`\`\``,
    application: 'Linux Server',
    errorCode: '',
    category: 'mantenimiento',
    tags: ['linux', 'logs', 'disk-space', 'maintenance'],
    severity: 'baja',
    author: 'Laura Fernández',
    status: 'publicado',
    views: 56,
    helpful: 15
  },
  {
    title: 'Error 500 en aplicación web Node.js',
    content: `## Error
\`\`\`
Internal Server Error 500
Error: Cannot read property 'id' of undefined
\`\`\`

## Contexto
Error al intentar acceder al endpoint \`/api/users/:id\`

## Análisis
El error ocurre cuando el parámetro :id no existe en la base de datos y se intenta acceder a propiedades del objeto nulo.

## Código Problemático
\`\`\`javascript
app.get('/api/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json({ name: user.name }); // Error si user es null
});
\`\`\`

## Solución
\`\`\`javascript
app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    
    res.json({ name: user.name });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
\`\`\`

## Prevención
- Siempre validar existencia antes de usar objetos
- Implementar manejo de errores global
- Usar middleware de validación`,
    application: 'Node.js API',
    errorCode: 'ERR_500',
    category: 'error',
    tags: ['nodejs', 'javascript', 'api', 'error-handling'],
    severity: 'alta',
    author: 'Diego Torres',
    status: 'publicado',
    views: 89,
    helpful: 27
  },
  {
    title: 'Configuración de SSL en servidor Apache',
    content: `## Objetivo
Instalar y configurar certificado SSL en Apache para habilitar HTTPS.

## Requisitos
- Apache 2.4+
- Certificado SSL (.crt y .key)
- Módulo mod_ssl habilitado

## Instalación

### 1. Habilitar mod_ssl
\`\`\`bash
sudo a2enmod ssl
sudo systemctl restart apache2
\`\`\`

### 2. Copiar certificados
\`\`\`bash
sudo cp certificado.crt /etc/ssl/certs/
sudo cp certificado.key /etc/ssl/private/
sudo chmod 600 /etc/ssl/private/certificado.key
\`\`\`

### 3. Configurar VirtualHost
\`\`\`apache
<VirtualHost *:443>
    ServerName www.ejemplo.com
    DocumentRoot /var/www/html
    
    SSLEngine on
    SSLCertificateFile /etc/ssl/certs/certificado.crt
    SSLCertificateKeyFile /etc/ssl/private/certificado.key
    SSLCertificateChainFile /etc/ssl/certs/chain.crt
    
    <Directory /var/www/html>
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
\`\`\`

### 4. Redirección HTTP a HTTPS
\`\`\`apache
<VirtualHost *:80>
    ServerName www.ejemplo.com
    Redirect permanent / https://www.ejemplo.com/
</VirtualHost>
\`\`\`

### 5. Verificar configuración
\`\`\`bash
sudo apache2ctl configtest
sudo systemctl restart apache2
\`\`\`

## Verificación
Acceder a https://www.ejemplo.com y verificar el candado de seguridad.`,
    application: 'Apache Server',
    errorCode: '',
    category: 'configuracion',
    tags: ['apache', 'ssl', 'https', 'security'],
    severity: 'alta',
    author: 'Patricia Ruiz',
    status: 'publicado',
    views: 112,
    helpful: 38
  }
];

const sampleCategories = [
  {
    name: 'incidencia',
    description: 'Registro de incidencias y problemas reportados',
    color: '#EF4444'
  },
  {
    name: 'error',
    description: 'Errores técnicos y códigos de error',
    color: '#F59E0B'
  },
  {
    name: 'solucion',
    description: 'Soluciones documentadas a problemas comunes',
    color: '#10B981'
  },
  {
    name: 'procedimiento',
    description: 'Procedimientos y guías paso a paso',
    color: '#3B82F6'
  },
  {
    name: 'configuracion',
    description: 'Configuraciones de sistemas y aplicaciones',
    color: '#8B5CF6'
  },
  {
    name: 'mantenimiento',
    description: 'Tareas de mantenimiento preventivo y correctivo',
    color: '#6B7280'
  }
];

async function seedDatabase() {
  try {
    // Conectar a MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/wikii-technical');
    console.log('✅ Conectado a MongoDB');

    // Limpiar colecciones existentes
    await Article.deleteMany({});
    await Category.deleteMany({});
    console.log('🗑️  Colecciones limpiadas');

    // Insertar categorías
    await Category.insertMany(sampleCategories);
    console.log('📁 Categorías insertadas');

    // Insertar artículos
    await Article.insertMany(sampleArticles);
    console.log('📝 Artículos insertados');

    // Mostrar resumen
    const totalArticles = await Article.countDocuments();
    const totalCategories = await Category.countDocuments();
    
    console.log('\n✨ Base de datos poblada exitosamente!');
    console.log(`📊 Total de artículos: ${totalArticles}`);
    console.log(`📊 Total de categorías: ${totalCategories}`);

    // Mostrar artículos por categoría
    const stats = await Article.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    console.log('\n📈 Artículos por categoría:');
    stats.forEach(stat => {
      console.log(`   ${stat._id}: ${stat.count}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error poblando base de datos:', error);
    process.exit(1);
  }
}

seedDatabase();

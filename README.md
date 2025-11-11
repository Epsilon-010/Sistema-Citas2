# Sistema de Citas ULSA 🎓

Sistema completo de gestión de citas y visitantes para la Universidad La Salle con backend en FastAPI y frontend en React.

## ⚙️ Configuración de Base de Datos

- **Usuario**: barrita
- **Password**: 12345
- **Database**: SistemaPrueba
- **Host**: 127.0.0.1
- **Port**: 5432

El archivo `Backend/.env` ya está configurado con estas credenciales.

## 🚀 Inicio Rápido

### Opción 1: Con Docker 🐳 (Recomendado)

```bash
# Solo PostgreSQL
docker-compose up -d postgres

# Todo el sistema (PostgreSQL + Backend + Frontend)
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener
docker-compose down
```

### Opción 2: Sin Docker 💻

**Terminal 1 - PostgreSQL:**
```bash
# Si tienes PostgreSQL local, asegúrate que esté corriendo
# O usa Docker solo para PostgreSQL:
docker-compose up -d postgres
```

**Terminal 2 - Backend:**
```bash
cd Backend
uv sync
uv run uvicorn src.main:app --reload --port 8000
```

**Terminal 3 - Frontend:**
```bash
cd citasulsa
npm install
npm run dev
```

## 📍 URLs de Acceso

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

## 👤 Usuario de Prueba

- **Email**: admin@ulsa.mx
- **Password**: admin123
- **Rol**: admin_sistema

## 📋 Estructura del Proyecto

```
Sistema-Citas2/
├── Backend/              # API FastAPI
│   ├── src/
│   │   ├── main.py      # Configuración principal + CORS
│   │   ├── database/    # Configuración de PostgreSQL
│   │   └── lib/         # Módulos (Auth, Usuarios, Visitantes, Citas, Carros)
│   ├── .env             # Variables de entorno (DB, JWT)
│   └── pyproject.toml   # Dependencias Python
│
├── citasulsa/           # Frontend React + Vite
│   ├── src/
│   │   ├── components/  # Componentes React
│   │   ├── services/    # api.js - Servicios de API
│   │   └── App.jsx
│   └── package.json
│
└── docker-compose.yml   # Configuración Docker

```

## 🔐 Roles del Sistema

- **admin_sistema**: Acceso completo
- **admin_universitario**: Gestión de citas y visitantes  
- **guardia**: Solo consulta

## 🛠️ Tecnologías

**Backend**: FastAPI, SQLAlchemy (Async), PostgreSQL, JWT, Pydantic  
**Frontend**: React 19, React Router, Tailwind CSS, Vite

## 🔌 Integración Frontend-Backend

El archivo `citasulsa/src/services/api.js` contiene todos los servicios para comunicarse con el backend:

- `authAPI` - Login/Logout con JWT
- `usuariosAPI` - CRUD de usuarios
- `visitantesAPI` - CRUD de visitantes
- `citasAPI` - CRUD de citas
- `carrosAPI` - CRUD de carros

Los tokens JWT se manejan automáticamente en localStorage.

## 🐛 Solución de Problemas

**Error: Puerto 5432 ocupado**
```bash
# Detener PostgreSQL local
brew services stop postgresql

# O cambiar puerto en docker-compose.yml
```

**Error: Backend no conecta a la BD**
- Verifica que PostgreSQL esté corriendo
- Revisa las credenciales en `Backend/.env`
- Verifica los logs: `docker-compose logs postgres`

**Error: Frontend no conecta con Backend**
- Asegúrate que el backend esté en puerto 8000
- Revisa la configuración de CORS en `Backend/src/main.py`

## 📄 Licencia

Proyecto educativo - Universidad La Salle

## 📋 Estructura del Proyecto

```
Sistema-Citas2/
├── Backend/              # API FastAPI
│   ├── src/
│   │   ├── main.py      # Configuración principal
│   │   ├── database/    # Configuración de DB
│   │   └── lib/         # Módulos (Auth, Usuarios, Visitantes, etc)
│   └── pyproject.toml
│
├── citasulsa/           # Frontend React + Vite
│   ├── src/
│   │   ├── components/  # Componentes React
│   │   ├── services/    # API services
│   │   └── App.jsx
│   └── package.json
│
├── start.sh             # Script para iniciar todo
├── stop.sh              # Script para detener servicios
└── INTEGRACION.md       # Guía detallada
```

## 🔐 Roles del Sistema

- **admin_sistema**: Acceso completo al sistema
- **admin_universitario**: Gestión de citas y visitantes
- **guardia**: Solo consulta de visitantes

## 🛠️ Tecnologías

### Backend
- FastAPI
- SQLAlchemy (Async)
- PostgreSQL
- JWT Authentication
- Pydantic

### Frontend
- React 19
- React Router
- Tailwind CSS
- Vite
- Heroicons

## 📝 API Disponibles

El archivo `citasulsa/src/services/api.js` contiene todos los servicios:

```javascript
import { authAPI, usuariosAPI, visitantesAPI, citasAPI, carrosAPI } from './services/api';

// Autenticación
await authAPI.login(email, password);
authAPI.logout();

// Usuarios
await usuariosAPI.getAll();
await usuariosAPI.create(userData);

// Similar para visitantes, citas, carros
```

## 🔧 Configuración del Frontend

El servicio de API está configurado en `citasulsa/src/services/api.js`:
- URL base: `http://localhost:8000`
- Autenticación JWT automática
- Manejo de errores incluido

## 📚 Documentación

- **Guía completa de integración**: Ver [INTEGRACION.md](./INTEGRACION.md)
- **API Docs**: http://localhost:8000/docs (cuando el backend esté corriendo)

## 🧪 Probar el Sistema

1. Inicia ambos servidores (backend y frontend)
2. Crea un usuario en la base de datos o usa el endpoint `/auth/login`
3. Accede a http://localhost:5173
4. Ingresa con las credenciales

## ⚠️ Notas Importantes

### Backend
- Asegúrate de tener PostgreSQL instalado y corriendo
- Configura correctamente el archivo `.env` con las credenciales de tu base de datos
- Las tablas se crean automáticamente al iniciar el servidor

### Frontend
- El componente de Login ya está conectado al backend
- Los tokens JWT se guardan automáticamente en localStorage
- El logout limpia todos los tokens

### CORS
El backend ya está configurado para aceptar peticiones del frontend en `localhost:5173`

## 🛑 Detener el Sistema

```bash
# Si usaste el script start.sh
./stop.sh

# O manualmente
Ctrl+C en cada terminal
```

## 🐛 Solución de Problemas

### Backend no inicia
- Verifica que PostgreSQL esté corriendo
- Verifica las credenciales en `.env`
- Revisa que el puerto 8000 esté libre

### Frontend no conecta
- Verifica que el backend esté corriendo
- Revisa la consola del navegador (F12) para errores
- Verifica que el puerto 5173 esté libre

### Errores de CORS
- Asegúrate de que el frontend esté en el puerto 5173
- Revisa la configuración de CORS en `Backend/src/main.py`

## 📞 Soporte

Para más detalles sobre la integración frontend-backend, consulta [INTEGRACION.md](./INTEGRACION.md)

## 📄 Licencia

Este proyecto es de uso educativo para la Universidad La Salle.

# 🎮 Sistema de Gamificación Inmersiva - UNAL

Un sistema completo de gamificación educativa desarrollado para la Universidad Nacional de Colombia, que combina tecnologías modernas para crear experiencias de aprendizaje inmersivas.

## 📋 Descripción del Proyecto

Este proyecto implementa una plataforma de gamificación que permite crear experiencias de aprendizaje interactivas. El sistema cuenta con un panel de administración completo para gestionar usuarios, roles y contenido educativo, además de una interfaz de usuario intuitiva para estudiantes y profesores.

### ✨ Características Principales

- **🎯 Sistema de Roles**: Superadmin, Admin y Usuario regular
- **👥 Gestión de Usuarios**: CRUD completo de usuarios con permisos jerárquicos
- **🎨 Interfaz Moderna**: UI/UX atractiva con diseño responsivo
- **🔐 Autenticación Segura**: JWT tokens con roles y permisos
- **📊 Panel de Administración**: Dashboard completo para gestión del sistema
- **🎓 Soporte Multi-usuario**: Estudiantes y profesores con campos específicos
- **📱 Responsive Design**: Funciona en desktop y dispositivos móviles

## 🛠️ Tecnologías Utilizadas

### Backend (Django)
- **Framework**: Django 5.2.7
- **Base de Datos**: SQLite3
- **Autenticación**: Django REST Framework Simple JWT
- **API**: Django REST Framework
- **Validación**: Email validator para dominios @unal.edu.co

### Frontend (Next.js)
- **Framework**: Next.js 14+
- **Lenguaje**: TypeScript
- **Styling**: Tailwind CSS
- **Estado**: React Hooks
- **Routing**: Next.js App Router
- **API Client**: Fetch API nativo

### DevOps & Herramientas
- **Gestión de Dependencias**: pip (Python), npm (Node.js)
- **Control de Versiones**: Git
- **Contenedor**: Docker & Docker Compose
- **Entorno Virtual**: Python venv

## 🏗️ Arquitectura del Sistema

```
┌─────────────────┐    HTTP/REST    ┌─────────────────┐
│   Next.js       │◄──────────────►│     Django      │
│   Frontend      │   APIs JSON    │    Backend      │
│                 │                │                 │
│ - React/TS      │                │ - Python/Django │
│ - Tailwind CSS  │                │ - DRF           │
│ - JWT Auth      │                │ - SQLite        │
└─────────────────┘                └─────────────────┘
         │                                   │
         ▼                                   ▼
┌─────────────────┐                 ┌─────────────────┐
│   Navegador     │                 │   Base de       │
│   Web           │                 │   Datos         │
│                 │                 │   SQLite3       │
└─────────────────┘                 └─────────────────┘
```

### Arquitectura Cliente-Servidor
- **Frontend (React/Next.js)**: Maneja la interfaz de usuario y consume APIs
- **Backend (Django)**: Procesa lógica de negocio y maneja base de datos
- **Base de Datos**: SQLite para desarrollo, fácilmente migrable a PostgreSQL/MySQL
- **Autenticación**: JWT tokens stateless entre frontend y backend

## 📋 Requisitos Previos

### Sistema Operativo
- Windows 10/11
- macOS 10.15+
- Linux (Ubuntu 18.04+)

### Software Requerido
- **Python**: 3.8 o superior
- **Node.js**: 18.0 o superior
- **npm**: 8.0 o superior
- **Git**: 2.0 o superior
- **Docker**: (Opcional) 20.0 o superior

### Hardware Mínimo
- **RAM**: 4GB
- **Almacenamiento**: 2GB libres
- **Procesador**: Dual-core 2.0GHz

## 🚀 Instalación y Configuración

### 1. Clonar el Repositorio
```bash
git clone https://github.com/estebanLopezU/GamificacionInmersiva-2025.git
cd GamificacionInmersiva-2025
```

### 2. Configurar Backend (Django)

#### Opción A: Configuración Manual
```bash
# Crear entorno virtual
python -m venv venv

# Activar entorno virtual
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Instalar dependencias
pip install -r requirements.txt

# Ejecutar migraciones de base de datos
python manage.py makemigrations
python manage.py migrate

# Crear superadmin (opcional - ya existe uno preconfigurado)
python manage.py shell -c "
from authentication.models import CustomUser
user = CustomUser.objects.create_user('admin@unal.edu.co', email='admin@unal.edu.co', password='admin123')
user.role='admin'
user.save()
"
```

#### Opción B: Usando Docker
```bash
# Construir y ejecutar con Docker Compose
docker-compose up --build
```

### 3. Configurar Frontend (Next.js)
```bash
# Navegar al directorio del frontend
cd gamified-learning-app

# Instalar dependencias
npm install

# Configurar variables de entorno (opcional)
# Crear archivo .env.local
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local
```

### 4. Ejecutar el Proyecto

#### Backend (Django)
```bash
# Desde el directorio raíz del proyecto
python manage.py runserver
# Servidor disponible en: http://localhost:8000
```

#### Frontend (Next.js)
```bash
# Desde gamified-learning-app/
npm run dev
# Servidor disponible en: http://localhost:3000
```

## 🎯 Cómo Usar el Sistema

### Acceso al Sistema

#### Superadmin (Usuario Principal)
- **Email**: `elopezu@unal.edu.co`
- **Contraseña**: `BZTfne48`
- **Rol**: Superadmin (control total del sistema)

#### Acceso a Paneles
1. **Panel de Administración**: `http://localhost:3000/admin`
2. **Login Administrativo**: `http://localhost:3000/admin-login`
3. **Login Regular**: `http://localhost:3000/login`
4. **Registro**: `http://localhost:3000/register`

### Gestión de Usuarios
- **Crear**: Botón "+" en la pestaña "Gestión de Usuarios"
- **Editar**: Click en "Editar" en la tabla de usuarios
- **Eliminar**: Click en "Eliminar" con confirmación
- **Asignar Roles**: Solo superadmin puede asignar rol "superadmin"

## 📁 Estructura del Proyecto

```
GamificacionInmersiva-2025/
├── authentication/              # App Django de autenticación
│   ├── models.py               # Modelos de usuario personalizados
│   ├── views.py                # APIs REST
│   ├── serializers.py          # Serializers DRF
│   ├── urls.py                 # URLs de la app
│   └── migrations/             # Migraciones de BD
├── gamificacionProyecto/       # Configuración Django
│   ├── settings.py             # Configuración principal
│   ├── urls.py                 # URLs principales
│   └── wsgi.py                 # Configuración WSGI
├── gamified-learning-app/      # Frontend Next.js
│   ├── app/                    # Páginas Next.js
│   │   ├── admin/             # Panel de administración
│   │   ├── login/             # Login regular
│   │   ├── register/          # Registro de usuarios
│   │   └── admin-login/       # Login administrativo
│   ├── components/            # Componentes React
│   ├── lib/                   # Utilidades
│   │   └── api.ts             # Cliente API
│   └── types/                 # Tipos TypeScript
├── requirements.txt            # Dependencias Python
├── package.json               # Dependencias Node.js
├── docker-compose.yml         # Configuración Docker
├── Dockerfile                 # Imagen Docker
└── README.md                  # Este archivo
```

## 🔗 API Endpoints

### Autenticación
- `POST /api/login/` - Login de usuarios
- `POST /api/admin-login/` - Login administrativo
- `POST /api/register/` - Registro de usuarios
- `POST /api/logout/` - Logout

### Gestión de Usuarios (Solo Admin/Superadmin)
- `GET /api/users/` - Lista todos los usuarios
- `POST /api/users/create/` - Crear usuario
- `GET /api/users/<id>/` - Detalles de usuario
- `PUT /api/users/<id>/` - Actualizar usuario
- `DELETE /api/users/<id>/` - Eliminar usuario
- `GET /api/user-count/` - Conteo de usuarios

### Usuario Actual
- `GET /api/user/` - Información del usuario autenticado

## 🔐 Sistema de Roles y Permisos

### 1. Superadmin
- **Control Total**: Puede gestionar todo el sistema
- **Gestión de Usuarios**: Crear, editar, eliminar cualquier usuario
- **Asignación de Roles**: Puede asignar cualquier rol
- **Acceso Completo**: A todas las funcionalidades

### 2. Admin
- **Gestión Limitada**: Puede gestionar usuarios regulares
- **Usuarios**: Crear, editar, eliminar usuarios con rol "user"
- **Restricciones**: No puede crear superadmins ni gestionar otros admins

### 3. User (Usuario Regular)
- **Acceso Básico**: Solo puede acceder a funcionalidades básicas
- **Sin Permisos**: No puede gestionar otros usuarios

## 🎨 Características de la Interfaz

### Panel de Administración
- **Dashboard**: Estadísticas en tiempo real
- **Tabla de Usuarios**: Vista completa con paginación
- **Modales Interactivos**: Crear, editar y eliminar usuarios
- **Validación en Tiempo Real**: Formularios con feedback inmediato
- **Responsive**: Funciona en todos los dispositivos

### Diseño
- **Tema Oscuro**: Interfaz moderna con colores UNAL
- **Animaciones**: Transiciones suaves y efectos visuales
- **Accesibilidad**: Cumple estándares de accesibilidad
- **UX Optimizada**: Flujos intuitivos de usuario

## 🐛 Solución de Problemas

### Error de Puerto Ocupado
```bash
# Matar procesos en puertos
# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Linux/macOS
lsof -ti:8000 | xargs kill -9
```

### Error de Dependencias
```bash
# Limpiar cache e instalar nuevamente
# Python
pip cache purge
pip install -r requirements.txt --force-reinstall

# Node.js
rm -rf node_modules package-lock.json
npm install
```

### Problemas de Base de Datos
```bash
# Resetear base de datos
python manage.py flush
python manage.py migrate

# Recrear superadmin
python manage.py shell -c "
from authentication.models import CustomUser
user = CustomUser.objects.create_user('example@unal.edu.co', email='example@unal.edu.co', password='')
user.role='superadmin'
user.save()
"
```

## 📞 Soporte

Para soporte técnico o preguntas sobre el proyecto:

- **Desarrollador**: Esteban López
- **Institución**: Universidad Nacional de Colombia
- **Proyecto**: Centro de Información VR/AR - UNAL

## 📄 Licencia

Este proyecto es desarrollado para fines educativos y académicos en la Universidad Nacional de Colombia.

---

## 🎯 Inicio Rápido

```bash
# 1. Clonar repositorio
git clone https://github.com/estebanLopezU/GamificacionInmersiva-2025.git
cd GamificacionInmersiva-2025

# 2. Configurar backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
python manage.py migrate

# 3. Configurar frontend
cd gamified-learning-app
npm install

# 4. Ejecutar ambos servidores
# Terminal 1 - Backend
python manage.py runserver

# Terminal 2 - Frontend
cd gamified-learning-app
npm run dev

# 5. Acceder al sistema
# Panel Admin: http://localhost:3000/admin
# Superadmin: elopezu@unal.edu.co / BZTfne48
```

¡El sistema está listo para usar! 🚀

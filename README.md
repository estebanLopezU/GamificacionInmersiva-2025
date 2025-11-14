# Documentación del Proyecto: Plataforma de Gamificación para Aprender a Programar

## 1. ¿Qué es este proyecto?

Este es un proyecto de aplicación web interactiva diseñada para enseñar a programar a través de la gamificación. La idea central es ofrecer una experiencia de aprendizaje similar a un juego, donde los usuarios pueden:

- Elegir un lenguaje de programación para aprender (como Python, JavaScript o Java).
- Avanzar a través de diferentes niveles de dificultad, desde "Principiante" hasta "Junior Nivel 2".
- Participar en minijuegos educativos, como cuestionarios interactivos (QuizGame) y rompecabezas de código (BlocksGame).
- Seguir su progreso en cada lenguaje.

La aplicación está diseñada como una SPA (Single-Page Application), lo que significa que la interfaz es fluida y rápida, cargando diferentes "pantallas" (bienvenida, selección de nivel, juego, etc.) sin necesidad de recargar la página por completo.

## 2. Arquitectura y Tecnologías Utilizadas

Contrario a la configuración inicial que mencionaba Django, este proyecto no utiliza Django. Es una aplicación Full-Stack construida enteramente sobre el ecosistema de JavaScript/TypeScript, utilizando el framework Next.js tanto para el frontend como para el backend.

A continuación, se detalla cada componente tecnológico y su propósito:

### Framework Principal

- **Next.js (v15):** Es el corazón de la aplicación. Se utiliza como un framework de React "full-stack".
  - **Para el Frontend:** Renderiza la interfaz de usuario que ves en el navegador. Utiliza el App Router (evidenciado por la estructura de carpetas `src/app`), que permite una renderización optimizada y un enrutamiento basado en carpetas.
  - **Para el Backend:** Next.js también ejecuta un servidor Node.js. Dentro de este, se pueden crear API Routes, que funcionan como un backend para manejar la lógica de negocio, la autenticación y la comunicación con la base de datos.

### Lenguaje de Programación

- **TypeScript:** Todo el proyecto está escrito en TypeScript en lugar de JavaScript plano.
  - **Propósito:** Añade un sistema de tipos estáticos al código. Esto ayuda a prevenir errores comunes durante el desarrollo, mejora la legibilidad y facilita el mantenimiento del código a largo plazo.

### Base de Datos y ORM

- **Prisma (v6):** Es un ORM (Object-Relational Mapper) de nueva generación para Node.js y TypeScript.
  - **Propósito:** Facilita enormemente la interacción con la base de datos. En lugar de escribir consultas SQL manualmente, defines un "esquema" de tus datos y Prisma te proporciona funciones de TypeScript para leer, escribir, actualizar y eliminar registros de forma segura y tipada. Los scripts en `package.json` (`db:push`, `db:generate`) son comandos de Prisma para gestionar la base de datos.

### Interfaz de Usuario y Componentes (Frontend)

- **React (v19):** Es la librería fundamental para construir la interfaz de usuario. Permite crear componentes reutilizables que gestionan su propio estado.
- **shadcn/ui:** Es la biblioteca de componentes principal utilizada en el proyecto. No es una librería tradicional, sino una colección de componentes reutilizables construidos sobre Radix UI y Tailwind CSS.
  - **Propósito:** Proporciona componentes de alta calidad y accesibles como `Button`, `Card`, `Progress`, `Badge`, etc., que puedes copiar en tu proyecto y personalizar. Esto acelera enormemente el desarrollo de la UI.
- **Radix UI:** Es la base sobre la que se construyen los componentes de `shadcn/ui`.
  - **Propósito:** Ofrece primitivas de componentes sin estilo, accesibles y de bajo nivel (como menús desplegables, diálogos, checkboxes) que se encargan de toda la lógica de comportamiento compleja.
- **Lucide React:** Es la biblioteca de íconos utilizada.
  - **Propósito:** Proporciona los íconos que ves en la aplicación, como `Code`, `Trophy`, `Play`, etc.

### Estilos (Frontend)

- **Tailwind CSS (v4):** Es un framework de CSS "utility-first".
  - **Propósito:** En lugar de escribir archivos CSS tradicionales, aplicas clases directamente en tu HTML/JSX (ej. `className="text-white font-bold"`). Esto permite construir diseños complejos de manera muy rápida y mantener la consistencia visual. El archivo `globals.css` define la configuración base y las variables de color para Tailwind.

### Gestión de Estado (Frontend)

- **React Hooks (`useState`, `useEffect`):** Se utilizan para gestionar el estado local dentro de los componentes (por ejemplo, para saber qué pantalla mostrar con `currentScreen`).
- **Zustand:** Es una biblioteca de gestión de estado global, pequeña y rápida.
  - **Propósito:** Mientras `useState` es para el estado de un solo componente, Zustand se usaría para gestionar un estado que necesita ser compartido entre componentes que no están directamente relacionados, como la información del usuario autenticado o el progreso general del juego.

### Autenticación

- **NextAuth.js (v4):** Es una solución completa de autenticación para aplicaciones Next.js.
  - **Propósito:** Maneja todo el flujo de inicio de sesión, registro y gestión de sesiones de usuario, ya sea con credenciales (email/contraseña) o proveedores externos (Google, GitHub, etc.).

### Interacción y Animaciones (Frontend)

- **Dnd Kit (`@dnd-kit/core`):** Una biblioteca moderna para funcionalidades de arrastrar y soltar (Drag and Drop).
  - **Propósito:** Es la tecnología que impulsa el `BlocksGame` (Rompecabezas de Código), permitiendo al usuario arrastrar y ordenar bloques de código para resolver un ejercicio.
- **Framer Motion:** Una biblioteca de animación para React.
  - **Propósito:** Se utiliza para añadir animaciones fluidas a la interfaz, como transiciones de página o efectos al interactuar con los elementos, haciendo la experiencia de usuario más agradable.

### Validación de Datos

- **Zod:** Una biblioteca de declaración y validación de esquemas basada en TypeScript.
  - **Propósito:** Se usa para garantizar que los datos tengan la forma correcta. Por ejemplo, antes de enviar los datos de un formulario a la API o antes de guardar datos en la base de datos, Zod puede validar que un email es realmente un email y que una contraseña cumple ciertos requisitos.

### Resumen en una Tabla

| Tecnología      | Rol en el Proyecto            | ¿Dónde se usa?                                          |
| --------------- | ----------------------------- | ------------------------------------------------------- |
| **Next.js**     | Framework Full-Stack          | Toda la aplicación (Frontend y Backend).                |
| **React**       | Librería de UI                | Construcción de todos los componentes visuales.         |
| **TypeScript**  | Lenguaje de Programación      | Escritura de todo el código para seguridad y claridad.  |
| **Prisma**      | ORM (Base de Datos)           | Conexión y gestión de la base de datos desde el backend.|
| **Tailwind CSS**| Estilos CSS                   | Diseño visual de toda la interfaz de usuario.           |
| **shadcn/ui**   | Biblioteca de Componentes     | Botones, tarjetas, diálogos y otros elementos de UI.    |
| **NextAuth.js** | Autenticación                 | Gestión de inicio de sesión y sesiones de usuario.      |
| **Dnd Kit**     | Interacción (Drag & Drop)     | Mecánica principal del juego de rompecabezas de código. |
| **Zustand**     | Gestión de Estado Global      | Compartir datos (ej. progreso del usuario) en toda la app.|
| **Zod**         | Validación de Datos           | Asegurar la integridad de los datos en formularios y APIs.|



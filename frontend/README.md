# AhorraMax — Frontend

Frontend para la aplicacion AhorraMax, construido con **React + Vite** y **Tailwind CSS**. Permite explorar promociones de supermercados, filtrarlas y guardar favoritos.

## Requisitos

- Node.js >= 18
- El backend Django corriendo (por defecto en `http://127.0.0.1:8090`)

## Instalacion

```bash
cd frontend
npm install
```

## Variables de entorno

Copia `.env.example` a `.env` y ajusta la URL del backend si es necesario:

```bash
cp .env.example .env
```

```env
VITE_API_URL=http://127.0.0.1:8090
```

## Correr en desarrollo

```bash
npm run dev
```

La app queda disponible en `http://localhost:5173`.

## Build para produccion

```bash
npm run build
```

Los archivos estaticos quedan en `dist/`.

---

## Estructura de carpetas

```
src/
├── config/
│   └── brandColors.js        # Mapa de colores de marca de bancos y supermercados argentinos
├── context/
│   ├── AuthContext.jsx       # Estado global de autenticacion (token en memoria)
│   └── FavoritosContext.jsx  # Estado global de favoritos con optimistic UI
├── services/
│   ├── api.js                # Wrapper de fetch con soporte de Bearer token
│   ├── auth.js               # Login, registro, perfil y favoritos
│   ├── promociones.js        # Listado, detalle, medios de pago, dias
│   └── entidades.js          # Supermercados y oferentes
├── components/
│   ├── Navbar.jsx            # Barra de navegacion
│   ├── PromocionCard.jsx     # Tarjeta de promocion con color de marca y favorito animado
│   ├── FiltrosPromocion.jsx  # Panel de filtros por supermercado y dia
│   ├── ProtectedRoute.jsx    # Redirige a /login si no esta autenticado
│   ├── LoadingSpinner.jsx    # Indicador de carga generico
│   └── SkeletonCard.jsx      # Skeleton loaders para el listado de promociones
└── pages/
    ├── LoginPage.jsx         # Formulario de inicio de sesion con ojo y modal de contrasena olvidada
    ├── RegisterPage.jsx      # Formulario de registro con toggle de contrasena
    ├── PromocionesPage.jsx   # Listado principal con skeleton loaders y estado vacio
    ├── PromocionDetailPage.jsx # Detalle con color de marca de entidad oferente
    └── PerfilPage.jsx        # Perfil con supermercados favoritos y colores de marca
```

## Mejoras UX/UI (v2)

### 1. Mostrar/ocultar contraseña
Los campos de contraseña en Login y Registro incluyen un ícono de ojo (lucide-react) para alternar entre texto oculto y visible.

### 2. Modal "Recuperar contraseña"
En la pantalla de login hay un link "¿Olvidaste tu contraseña?" que abre un modal informando que la funcion estara disponible proximamente, sin llamar al backend.

### 3. Favoritos con optimistic UI
`FavoritosContext` gestiona el estado global de favoritos (promociones y supermercados). Al hacer toggle el icono cambia instantaneamente (sin esperar la respuesta del backend) y revierte solo si la request falla. Los favoritos persisten mientras el usuario navega por la app.

### 4. Animacion de favoritos
Al marcar/desmarcar un favorito se reproduce una animacion `heartbeat` (keyframe personalizado en Tailwind) que genera un efecto de pulso visual en el icono.

### 5. Colores de marca por entidad
`src/config/brandColors.js` mapea bancos, billeteras y supermercados argentinos a sus colores primarios oficiales (Santander → #EC0000, Mercado Pago → #009EE3, Coto → #E31837, Jumbo → #009FE3, MODO → #7B2D8B, etc.). Estos colores se usan como:
- Fondo del header en cada PromocionCard y en el hero del detalle
- Chip de color en la fila de supermercados del perfil
- Dot de color junto al nombre de la entidad oferente en la card

### 6. Skeleton loaders
El listado de promociones muestra placeholders animados (pulse) mientras carga, reemplazando el spinner generico.

### 7. Estados vacios mejorados
- Listado sin resultados: icono grande + texto descriptivo + boton "Limpiar filtros"
- Perfil sin supermercados favoritos: mensaje orientativo debajo de la lista

### 8. Microinteracciones
- Cards con `hover:shadow-lg hover:-translate-y-0.5` para efecto de elevacion en desktop
- Transiciones `duration-200` en botones, links y filas de supermercados
- Skeleton del perfil mientras carga el perfil del usuario

## Seguridad

El token JWT se guarda **unicamente en el estado de React (en memoria)**, no en `localStorage` ni en cookies, para evitar vulnerabilidades XSS. Esto significa que al recargar la pagina el usuario debera volver a iniciar sesion.

## Endpoints del backend utilizados

| Metodo | Endpoint | Descripcion |
|--------|----------|-------------|
| POST | `/api/token/` | Login |
| POST | `/api/token/refresh/` | Renovar token |
| POST | `/api/usuarios/registro/` | Registro |
| GET  | `/api/usuarios/perfil/` | Perfil propio |
| GET  | `/api/promociones/` | Listado de promociones |
| GET  | `/api/promociones/:id/` | Detalle de promocion |
| GET  | `/api/promociones/medios-de-pago/` | Medios de pago |
| GET  | `/api/promociones/dias-semana/` | Dias de la semana |
| GET  | `/api/entidades/supermercados/` | Supermercados |
| GET  | `/api/entidades/oferentes/` | Oferentes |
| POST | `/api/usuarios/favoritos/promociones/:id/agregar/` | Agregar promocion favorita |
| POST | `/api/usuarios/favoritos/promociones/:id/quitar/` | Quitar promocion favorita |
| POST | `/api/usuarios/favoritos/supermercados/:id/agregar/` | Agregar supermercado favorito |
| POST | `/api/usuarios/favoritos/supermercados/:id/quitar/` | Quitar supermercado favorito |

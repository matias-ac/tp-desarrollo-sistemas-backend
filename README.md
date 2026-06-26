# Trabajo Práctico Integrador — AhorraMax

Sistema de búsqueda y visualización de promociones bancarias y de supermercados.

**Stack:** Django 6.0.6 + DRF 3.17.1 (backend) · React + Vite + Tailwind CSS (frontend)

---

## Backend

### Requisitos

- Python >= 3.10

### Crear entorno virtual

```bash
python -m venv backend/venv
```

### Activar el entorno virtual

**Windows:**
```bash
.\backend\venv\Scripts\activate
```

**MacOS/Linux:**
```bash
source backend/venv/bin/activate
```

### Instalar dependencias

```bash
pip install -r backend/requirements.txt
```

### Variables de entorno

1. Copiar el archivo de ejemplo:
   ```bash
   cp backend/.env.example backend/.env
   ```
2. Editar `backend/.env` y actualizar los valores si es necesario.

### Correr migraciones

```bash
python backend/manage.py migrate
```

### Poblar base de datos con datos de ejemplo (opcional)

```bash
python backend/manage.py loaddata backend/seed_data.json
```

### Iniciar servidor

```bash
python backend/manage.py runserver
```

El backend queda disponible en `http://127.0.0.1:8000`.

---

## Frontend

### Requisitos

- Node.js >= 18
- El backend corriendo en `http://127.0.0.1:8000`

### Instalación

```bash
npm install --prefix frontend
```

### Variables de entorno

```bash
cp frontend/.env.example frontend/.env
```

### Iniciar servidor de desarrollo

```bash
npm run dev --prefix frontend
```

El frontend queda disponible en `http://localhost:5173`.

---

## Estructura del proyecto

```
tp-integrador/
├── README.md
├── .gitignore
├── docs/
├── backend/
│   ├── README.md
│   ├── manage.py
│   ├── requirements.txt
│   ├── .env / .env.example
│   ├── db.sqlite3
│   ├── seed_data.json
│   ├── ahorra_max/      # Configuración del proyecto Django
│   ├── entidades/       # App: Supermercado, EntidadOferente
│   ├── promociones/     # App: Promocion, MedioDePago, DiaSemana
│   ├── usuarios/        # App: Usuario, favoritos
│   └── venv/
└── frontend/
    ├── README.md
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── public/
    │   ├── favicon.svg
    │   └── icons.svg
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── index.css
        ├── assets/
        ├── config/
        │   └── brandColors.js
        ├── context/
        │   ├── AuthContext.jsx
        │   ├── FavoritosContext.jsx
        │   └── CatalogsContext.jsx
        ├── services/
        │   ├── api.js
        │   ├── auth.js
        │   ├── entidades.js
        │   └── promociones.js
        ├── components/
        │   ├── Navbar.jsx
        │   ├── ProtectedRoute.jsx
        │   ├── PromocionCard.jsx
        │   ├── FavoritoButton.jsx
        │   ├── FiltrosPromocion.jsx
        │   ├── LoadingSpinner.jsx
        │   └── SkeletonCard.jsx
        └── pages/
            ├── LoginPage.jsx
            ├── RegisterPage.jsx
            ├── PromocionesPage.jsx
            ├── PromocionDetailPage.jsx
            └── PerfilPage.jsx
```

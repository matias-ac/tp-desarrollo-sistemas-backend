# Documentación Completa del Proyecto AhorraMax

---

## 1. Descripción General

Sistema de búsqueda y visualización de promociones bancarias y de supermercados. Los usuarios pueden registrarse, explorar promociones vigentes filtradas por supermercado y día de la semana, y marcar promociones/supermercados como favoritos.

Trabajo Práctico Integrador de la materia **Desarrollo de Sistemas Backend** del **IFTS18**.

**Stack:** Django 6.0.6 + Django REST Framework 3.17.1 (backend) · React 19 + Vite + Tailwind CSS (frontend)

---

## 2. Estructura del Proyecto

```
tp-integrador/
├── README.md                    # Readme global
├── .gitignore
├── docs/                        # Documentación
│   ├── django_naming_convention.md
│   └── proyecto_completo.md
├── backend/
│   ├── README.md                # Instrucciones del backend
│   ├── manage.py                # CLI de Django
│   ├── requirements.txt         # Dependencias Python
│   ├── .env                     # Variables de entorno (no versionado)
│   ├── .env.example             # Template de variables de entorno
│   ├── db.sqlite3               # Base de datos SQLite
│   ├── seed_data.json           # Datos de semilla
│   ├── ahorra_max/              # Configuración del proyecto Django
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── wsgi.py / asgi.py
│   │   └── __init__.py
│   ├── entidades/               # App: supermercados y oferentes
│   ├── promociones/             # App: promociones, medios de pago, días
│   ├── usuarios/                # App: usuarios y favoritos
│   └── venv/                    # Entorno virtual
└── frontend/
    ├── README.md
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── config/
        ├── context/
        ├── services/
        ├── components/
        └── pages/
```

---

## 3. Modelos de Datos

### App `entidades`

**Supermercado**

| Campo | Tipo | Detalle |
|---|---|---|
| `id` | BigAutoField (PK) | Autogenerado |
| `nombre` | CharField(200) | Obligatorio |
| `logo` | URLField(500) | Opcional (`blank=True`) |

**EntidadOferente**

| Campo | Tipo | Detalle |
|---|---|---|
| `id` | BigAutoField (PK) | Autogenerado |
| `nombre` | CharField(200) | Obligatorio |
| `logo` | URLField(500) | Opcional |
| `tipo` | CharField(30) | Choices: `supermercado`, `banco`, `otro`. Default: `supermercado` |

### App `promociones`

**MedioDePago**

| Campo | Tipo | Detalle |
|---|---|---|
| `id` | BigAutoField (PK) | Autogenerado |
| `descripcion` | CharField(100) | Ej: "Tarjeta de Crédito", "QR" |

**DiaSemana**

| Campo | Tipo | Detalle |
|---|---|---|
| `id` | BigAutoField (PK) | Autogenerado |
| `nombre` | CharField(20) | Ej: "Lunes", "Martes" |

**Promocion** (modelo central del sistema)

| Campo | Tipo | Detalle |
|---|---|---|
| `id` | BigAutoField (PK) | Autogenerado |
| `titulo` | CharField(200) | Título de la promoción |
| `descripcion` | TextField | Descripción detallada |
| `porcentaje_descuento` | DecimalField(5,2) | Nullable. Ej: 15.00 (15%) |
| `tope_reintegro` | DecimalField(10,2) | Nullable. Ej: 5000.00 ($5000) |
| `cuotas_disponibles` | IntegerField | Nullable. Cantidad de cuotas sin interés |
| `fecha_inicio` | DateField | Inicio de vigencia |
| `fecha_fin` | DateField | Fin de vigencia |
| `condiciones_legales` | TextField | Bases y condiciones |
| `entidad_oferente` | ForeignKey(EntidadOferente) | `on_delete=CASCADE`, `related_name="promociones"` |
| `supermercados` | ManyToManyField(Supermercado) | `related_name="promociones"` |
| `medios_de_pago` | ManyToManyField(MedioDePago) | `related_name="promociones"` |
| `dias_semana` | ManyToManyField(DiaSemana) | `related_name="promociones"` |

### App `usuarios`

**Usuario** (hereda de `AbstractUser`)

| Campo | Tipo | Detalle |
|---|---|---|
| `id` | BigAutoField (PK) | Autogenerado |
| `username` | CharField(150) | Se setea automáticamente igual al `email` |
| `email` | EmailField(254) | Único en la práctica (validación en serializer) |
| `first_name` / `last_name` | CharField(150) | Opcionales |
| `password` | CharField(128) | Almacenada hasheada |
| `supermercados_favoritos` | ManyToManyField(Supermercado) | `related_name="usuarios_favoritos"`, `blank=True` |
| `promociones_favoritas` | ManyToManyField(Promocion) | `related_name="usuarios_favoritos"`, `blank=True` |

### Diagrama de Relaciones

```
EntidadOferente ──< FK ── Promocion ──> M:M ── Supermercado
                            │
                            ├──> M:M ── MedioDePago
                            └──> M:M ── DiaSemana

Usuario >── M:M ── Promocion   (favoritos)
Usuario >── M:M ── Supermercado (favoritos)
```

---

## 4. API REST — Endpoints

### Autenticación JWT

| Método | Endpoint | Descripción | Auth |
|---|---|---|---|
| POST | `/api/token/` | Obtener tokens (access + refresh) | No |
| POST | `/api/token/refresh/` | Renovar access token | No |

### Usuarios

| Método | Endpoint | Descripción | Auth |
|---|---|---|---|
| POST | `/api/usuarios/registro/` | Registrar nuevo usuario | No |
| GET | `/api/usuarios/perfil/` | Datos del usuario autenticado (incluye favoritos) | Sí |
| POST | `/api/usuarios/favoritos/promociones/<pk>/agregar/` | Marcar promoción como favorita | Sí |
| POST | `/api/usuarios/favoritos/promociones/<pk>/quitar/` | Desmarcar promoción favorita | Sí |
| POST | `/api/usuarios/favoritos/supermercados/<pk>/agregar/` | Marcar supermercado como favorito | Sí |
| POST | `/api/usuarios/favoritos/supermercados/<pk>/quitar/` | Desmarcar supermercado favorito | Sí |

### Entidades

| Método | Endpoint | Descripción | Auth |
|---|---|---|---|
| GET | `/api/entidades/supermercados/` | Listar todos los supermercados | No |
| GET | `/api/entidades/oferentes/` | Listar todas las entidades oferentes | No |

### Promociones

| Método | Endpoint | Descripción | Auth |
|---|---|---|---|
| GET | `/api/promociones/` | Listar promociones (filtrable por `?supermercados=&dias_semana=`) | No |
| GET | `/api/promociones/<pk>/` | Detalle de una promoción | No |
| GET | `/api/promociones/medios-de-pago/` | Listar medios de pago | No |
| GET | `/api/promociones/dias-semana/` | Listar días de la semana | No |

### Admin

| Método | Endpoint | Descripción | Auth |
|---|---|---|---|
| GET | `/admin/` | Panel de administración de Django | Sí (staff) |

---

## 5. Serializers

### entidades/serializers.py

```python
class SupermercadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supermercado
        fields = ['id', 'nombre', 'logo']

class EntidadOferenteSerializer(serializers.ModelSerializer):
    class Meta:
        model = EntidadOferente
        fields = ['id', 'nombre', 'logo', 'tipo']
```

### promociones/serializers.py

```python
class PromocionSerializer(serializers.ModelSerializer):
    entidad_oferente = EntidadOferenteSerializer(read_only=True)

    class Meta:
        model = Promocion
        fields = [
            'id', 'titulo', 'descripcion', 'porcentaje_descuento',
            'tope_reintegro', 'cuotas_disponibles', 'fecha_inicio',
            'fecha_fin', 'condiciones_legales', 'entidad_oferente',
            'supermercados', 'medios_de_pago', 'dias_semana',
        ]

class MedioDePagoSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedioDePago
        fields = ['id', 'descripcion']

class DiaSemanaSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiaSemana
        fields = ['id', 'nombre']
```

### usuarios/serializers.py

```python
class UsuarioSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    promociones_favoritas = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    supermercados_favoritos = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Usuario
        fields = ['id', 'email', 'first_name', 'last_name', 'password',
                  'promociones_favoritas', 'supermercados_favoritos']

    def validate_email(self, value):
        if Usuario.objects.filter(email=value).exists():
            raise serializers.ValidationError("Ya existe un usuario con ese email.")
        return value

    def create(self, validated_data):
        validated_data['username'] = validated_data['email']
        password = validated_data.pop('password')
        usuario = Usuario(**validated_data)
        usuario.set_password(password)
        usuario.save()
        return usuario
```

---

## 6. Views

### entidades/views.py

```python
class SupermercadoListView(generics.ListAPIView):
    queryset = Supermercado.objects.all()
    serializer_class = SupermercadoSerializer

class EntidadOferenteListView(generics.ListAPIView):
    queryset = EntidadOferente.objects.all()
    serializer_class = EntidadOferenteSerializer
```

### promociones/views.py

```python
class PromocionListView(generics.ListAPIView):
    queryset = Promocion.objects.all()
    serializer_class = PromocionSerializer
    filterset_fields = ['supermercados', 'dias_semana']

class PromocionDetailView(generics.RetrieveAPIView):
    queryset = Promocion.objects.all()
    serializer_class = PromocionSerializer

class MedioDePagoListView(generics.ListAPIView):
    queryset = MedioDePago.objects.all()
    serializer_class = MedioDePagoSerializer

class DiaSemanaListView(generics.ListAPIView):
    queryset = DiaSemana.objects.all()
    serializer_class = DiaSemanaSerializer
```

### usuarios/views.py

```python
class RegistroUsuarioView(generics.CreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    permission_classes = [permissions.AllowAny]

class PerfilUsuarioView(generics.RetrieveAPIView):
    serializer_class = UsuarioSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

class AgregarPromocionFavoritaView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request, pk):
        promocion = get_object_or_404(Promocion, pk=pk)
        request.user.promociones_favoritas.add(promocion)
        return Response(status=status.HTTP_200_OK)

class QuitarPromocionFavoritaView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request, pk):
        promocion = get_object_or_404(Promocion, pk=pk)
        request.user.promociones_favoritas.remove(promocion)
        return Response(status=status.HTTP_200_OK)

class AgregarSupermercadoFavoritoView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request, pk):
        supermercado = get_object_or_404(Supermercado, pk=pk)
        request.user.supermercados_favoritos.add(supermercado)
        return Response(status=status.HTTP_200_OK)

class QuitarSupermercadoFavoritoView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request, pk):
        supermercado = get_object_or_404(Supermercado, pk=pk)
        request.user.supermercados_favoritos.remove(supermercado)
        return Response(status=status.HTTP_200_OK)
```

---

## 7. Configuración Destacada (settings.py)

```python
SECRET_KEY = config("SECRET_KEY")       # Desde .env
DEBUG = config("DEBUG", cast=bool)      # Desde .env

# Modelo de usuario custom
AUTH_USER_MODEL = 'usuarios.Usuario'

# CORS — solo development
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

# DRF
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_FILTER_BACKENDS': (
        'django_filters.rest_framework.DjangoFilterBackend',
    ),
}

# Base de datos
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}
```

---

## 8. Autenticación JWT — Flujo Completo

### Backend

1. El usuario envía `POST /api/token/` con `{username, password}`
2. SimpleJWT valida credenciales y devuelve `{access, refresh}`
3. El access token se envía en cada request como `Authorization: Bearer <token>`
4. `JWTAuthentication` (DRF) valida el token automáticamente
5. Cuando expira, se puede renovar via `POST /api/token/refresh/` con `{refresh}`
6. Las vistas de favoritos y perfil usan `permissions.IsAuthenticated`

### Frontend

1. `AuthContext` almacena tokens en **memoria** (no en localStorage) por seguridad XSS
2. Al recargar la página, el usuario debe volver a iniciar sesión
3. `api.js` automáticamente agrega `Authorization: Bearer <token>` a cada request si el token está presente
4. No hay refresh automático del token — si expira, el usuario debe reloguearse

---

## 9. Favoritos — Funcionamiento

### Backend

El modelo `Usuario` tiene dos campos `ManyToManyField`:
- `supermercados_favoritos` → `Supermercado`
- `promociones_favoritas` → `Promocion`

Cuatro endpoints permiten agregar/quitar favoritos mediante `.add()` y `.remove()` sobre el usuario autenticado.

### Frontend — FavoritosContext

- **Optimistic UI**: al tocar el corazón, el estado cambia instantáneamente sin esperar la respuesta del backend
- Si la request falla, el cambio se **revierte** automáticamente
- Usa `useRef` para mantener el estado sincrónico y evitar race conditions entre requests concurrentes
- Guard de concurrencia: evita enviar múltiples requests para el mismo ID

### Componentes que usan favoritos

| Componente | Función |
|---|---|
| `FavoritoButton` | Botón corazón con animación heartbeat |
| `PromocionCard` | Muestra FavoritoButton si el usuario está autenticado |
| `PromocionDetailPage` | CTA grande "Guardar/Quitar de favoritos" |
| `PerfilPage` | Lista de supermercados con toggle favorito |

---

## 10. Frontend — Catálogos (CatalogsContext)

Al montar la aplicación, se cargan en paralelo:
- `GET /api/entidades/supermercados/`
- `GET /api/promociones/dias-semana/`
- `GET /api/promociones/medios-de-pago/`

Se almacenan como arrays y también como mapas `{id: objeto}` para búsqueda rápida por FK (ej: mostrar el nombre del supermercado a partir de su ID en la promoción).

---

## 11. Seed Data

El archivo `backend/seed_data.json` contiene datos de fixtures en formato Django, incluyendo:

- **1 superuser**: `usuario@example.com` (staff, superuser)
- **5 supermercados**: Coto, Carrefour, Dia, Jumbo, ChangoMas
- **6 entidades oferentes**: Banco Nación, Santander, Mercado Pago, MODO, Carrefour, Coto
- **4 medios de pago**: Tarjeta de Crédito, Tarjeta de Débito, QR, Efectivo
- **7 días de la semana**: Lunes a Domingo
- **10 promociones** con distintas combinaciones de entidad, supermercado, medio de pago y día

---

## 12. Frontend — Componentes y Páginas

### Componentes

| Componente | Descripción |
|---|---|
| `Navbar` | Barra superior con links a Promociones, login/registro, perfil/logout |
| `ProtectedRoute` | Redirige a `/login` si no hay autenticación |
| `PromocionCard` | Tarjeta de promoción con descuento, colores de marca, botón favorito |
| `FavoritoButton` | Botón corazón con animación, dos variantes de color |
| `FiltrosPromocion` | Filtros por supermercado y día (chips) |
| `LoadingSpinner` | Spinner circular |
| `SkeletonCard` | Placeholder de carga animado |

### Páginas

| Página | Ruta | Descripción |
|---|---|---|
| `PromocionesPage` | `/` | Listado con grilla, filtros, estados carga/vacío/error |
| `PromocionDetailPage` | `/promociones/:id` | Detalle completo con hero, badges, CTA favorito |
| `LoginPage` | `/login` | Login con email/password, modal "olvidé contraseña" |
| `RegisterPage` | `/registro` | Registro con nombre, apellido, email, contraseña |
| `PerfilPage` | `/perfil` | Perfil del usuario, supermercados favoritos |

### Colores de Marca

`config/brandColors.js` mapea más de 30 entidades argentinas a sus colores oficiales. El matching es parcial e insensible a mayúsculas y acentos.

Ejemplos:
- Coto → `#E31837`
- Carrefour → `#006CB7`
- Mercado Pago → `#009EE3`
- Santander → `#EC0000`
- MODO → `#7B2D8B`

---

## 13. UX/UI

- **Skeleton loaders**: mientras cargan las promociones
- **Estados vacíos**: mensajes descriptivos con iconos y sugerencias
- **Optimistic UI**: favoritos responden instantáneamente
- **Animación heartbeat**: al marcar/desmarcar favoritos
- **Microinteracciones**: hover con elevación en cards, transiciones suaves
- **Seguridad**: token JWT solo en memoria (no localStorage)

---

## 14. Notas Técnicas

- Las vistas de favoritos usan `get_object_or_404` de Django
- No hay refresh automático del token JWT en el frontend
- Los tests de las 3 apps existen pero están vacíos (solo template de Django)

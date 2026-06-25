# API de Favoritos — Documentación (Ticket E-04)

Todos los endpoints de este ticket requieren autenticación JWT. Incluir el header:

```
Authorization: Bearer <access_token>
```

Sin un token válido, todos los endpoints devuelven `401 Unauthorized`.

---

## 1. Agregar promoción a favoritos

**POST** `/api/usuarios/favoritos/promociones/<id>/agregar/`

### Request
```http
POST /api/usuarios/favoritos/promociones/1/agregar/
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

### Response 200 OK
```json
{
    "mensaje": "Promoción agregada a favoritos."
}
```

### Response 404 Not Found (promoción inexistente)
```json
{
    "error": "Promoción no encontrada."
}
```

### Response 401 Unauthorized (sin token)
```json
{
    "detail": "Authentication credentials were not provided."
}
```

---

## 2. Quitar promoción de favoritos

**POST** `/api/usuarios/favoritos/promociones/<id>/quitar/`

### Request
```http
POST /api/usuarios/favoritos/promociones/1/quitar/
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

### Response 200 OK
```json
{
    "mensaje": "Promoción quitada de favoritos."
}
```

---

## 3. Agregar supermercado a favoritos

**POST** `/api/usuarios/favoritos/supermercados/<id>/agregar/`

### Request
```http
POST /api/usuarios/favoritos/supermercados/1/agregar/
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

### Response 200 OK
```json
{
    "mensaje": "Supermercado agregado a favoritos."
}
```

### Response 404 Not Found (supermercado inexistente)
```json
{
    "error": "Supermercado no encontrado."
}
```

---

## 4. Quitar supermercado de favoritos

**POST** `/api/usuarios/favoritos/supermercados/<id>/quitar/`

### Request
```http
POST /api/usuarios/favoritos/supermercados/1/quitar/
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

### Response 200 OK
```json
{
    "mensaje": "Supermercado quitado de favoritos."
}
```

---

## Pruebas realizadas

| Endpoint | Caso | Resultado |
|---|---|---|
| `POST /favoritos/promociones/1/agregar/` | Con token válido | 200 OK |
| `POST /favoritos/promociones/1/quitar/` | Con token válido | 200 OK |
| `POST /favoritos/supermercados/1/agregar/` | Con token válido | 200 OK |
| `POST /favoritos/promociones/1/agregar/` | Sin token | 401 Unauthorized |

Probado localmente con Python (`requests`) contra el servidor de desarrollo. Se recomienda repetir las pruebas con Postman/Insomnia para verificación manual del equipo.

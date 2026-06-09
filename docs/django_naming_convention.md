# Guía de Convenciones de Nombres para el Desarrollo en Django

Este documento establece las normas y convenciones de nomenclatura que se utilizarán a lo largo de todo el desarrollo del proyecto. El cumplimiento de estas reglas garantiza la consistencia del código, facilita la comunicación dentro del equipo y previene errores de compatibilidad en entornos de producción.

---

### 1. Convención de Nombres para Proyectos
* **Usar siempre minúsculas:** El nombre del proyecto debe escribirse completamente en minúsculas para mantener la consistencia y evitar conflictos en sistemas operativos que distinguen entre mayúsculas y minúsculas (*case-sensitive*).
* **Guiones bajos como separadores:** Se deben utilizar guiones bajos (`_`) para separar las palabras si el nombre está compuesto por más de una (*snake_case*). Esto mejora la legibilidad y se alinea con las directrices de Python.
* **Conciso y descriptivo:** El nombre debe ser corto pero lo suficientemente claro como para identificar el propósito general del proyecto de manera inmediata.
* **Evitar caracteres especiales:** No se permite el uso de números, guiones medios (`-`), puntos, espacios ni ningún otro carácter especial.

| Ejemplo Correcto | Ejemplo Incorrecto |
| :--- | :--- |
| `inventory_management` | `InventoryManagement` |
| | `inventoryManagement` |

---

### 2. Convención de Nombres para Aplicaciones (Apps)
* **Nombres en minúsculas:** Los nombres de las aplicaciones deben escribirse en minúsculas, respetando la guía de estilos PEP 8 de Python.
* **Preferir nombres en plural:** Por lo general, se debe utilizar el plural para las aplicaciones, especialmente cuando administran una colección de objetos similares. El nombre de la app debe coincidir con el plural del modelo principal que contiene.
* **Corto y descriptivo:** El nombre debe ser breve pero conciso para indicar claramente la funcionalidad del módulo.
* **Evitar caracteres especiales y números:** No se deben incluir números, guiones medios, puntos, espacios ni caracteres especiales.
* **Único y sin conflictos:** Se deben elegir nombres que no entren en conflicto con las librerías estándar de Python, los módulos nativos de Django o paquetes comunes de terceros.
* **Estabilidad en el nombre:** Cambiar el nombre de una app en etapas avanzadas es un proceso complejo. Se debe definir un nombre adecuado desde el inicio del proyecto.

| Ejemplo Correcto | Ejemplo Incorrecto |
| :--- | :--- |
| `posts` | `Post-Management` |
| | `post_management` |

---

### 3. Convención de Nombres para Modelos
* **Nombres de Clases:** Se debe utilizar **PascalCase** (primera letra de cada palabra en mayúscula). Las clases deben nombrarse de forma clara, descriptiva y en **singular**.
* **Nombres de Campos (Attributes):** Se debe utilizar **snake_case** (minúsculas y separados por guiones bajos).

| Nombre de Clase (Modelo) | Nombre de Campo | Clase Incorrecta | Campo Incorrecto |
| :--- | :--- | :--- | :--- |
| `UserProfile` | `date_created` | `userprofile` | `DateCreated` |
| `OrderHistory` | `is_active` | `Order_history` | `isActive` |

---

### 4. Nombres para Vistas y Funciones
* **Vistas basadas en funciones (FBVs):** Se deben nombrar utilizando **snake_case** (minúsculas separadas por guiones bajos).
* **Vistas basadas en clases (CBVs):** Se deben nombrar utilizando **PascalCase** e incluir el sufijo correspondiente (ej. `View`, `ListView`, `UpdateView`).

| Vista Basada en Función | Vista Basada en Clase | Función Incorrecta | Clase (CBV) Incorrecta |
| :--- | :--- | :--- | :--- |
| `login_user` | `AccountListView` | `LoginUser` | `account_list_view` |
| `export_data` | `ProductUpdateView` | `ExportData` | `product_update_view` |

---

### 5. Convención de Nombres para Plantillas (Templates)
* Las plantillas deben nombrarse completamente en **minúsculas** utilizando guiones bajos (`_`) como separadores.
* Se deben organizar en subdirectorios que reflejen la aplicación o el módulo al que pertenecen.

| Ejemplo Correcto | Ejemplo Incorrecto |
| :--- | :--- |
| `admin_dashboard.html` | `AdminDashboard.html` |
| `orders/order_detail.html` | `Orders/OrderDetail.html` |

---

### 6. Convención de Nombres para URLs
* Las rutas de las URLs deben escribirse en **minúsculas** y utilizar **guiones medios** (`-`) como separadores (*kebab-case*).
* Deben ser semánticas y descriptivas, reflejando fielmente la función o el contenido que exponen.

| Ejemplo Correcto | Ejemplo Incorrecto |
| :--- | :--- |
| `/user-profile` | `/UserProfile` |
| `/edit-order` | `/editOrder` |

---

### 7. Convención para Pruebas (Testing)
* Archivos de prueba: El nombre de los archivos de prueba debe comenzar estrictamente con el prefijo `test_` en minúsculas.
* Funciones de prueba: Deben tener nombres descriptivos utilizando guiones bajos, detallando con claridad el comportamiento que se está evaluando.

| Ejemplo Correcto | Ejemplo Incorrecto |
| :--- | :--- |
| `test_models.py` | `TestModels.py` |

---


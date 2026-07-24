# Quotation Web

Panel administrativo web para gestionar el catálogo de productos y servicios utilizado por el ecosistema **Quotation**.

El proyecto permite consultar indicadores, crear y editar productos, filtrar el catálogo, activar o desactivar registros, duplicarlos, eliminarlos, modificar su orden de visualización y revisar la vista pública de los productos activos.

> Este repositorio contiene únicamente el frontend administrativo. La persistencia, validación y lógica de negocio pertenecen a [Quotation API](https://github.com/xicaaay/quotation-api). El catálogo también puede ser consultado por agentes de inteligencia artificial mediante [Quotation MCP](https://github.com/xicaaay/quotation-mcp).

---

## Repositorios relacionados

| Proyecto | Responsabilidad | Repositorio |
|---|---|---|
| **Quotation Web** | Panel administrativo del catálogo. | Este repositorio |
| **Quotation API** | API REST, reglas de negocio, Prisma y PostgreSQL. | [xicaaay/quotation-api](https://github.com/xicaaay/quotation-api) |
| **Quotation MCP** | Servidor MCP de solo lectura para agentes de IA. | [xicaaay/quotation-mcp](https://github.com/xicaaay/quotation-mcp) |

### Relación entre los proyectos

```text
Usuario administrador
        |
        v
Quotation Web :3001
        |
        | HTTP / JSON
        v
Quotation API :3000
        |
        v
PostgreSQL (tabla dm_products)
        ^
        |
        | Consultas SQL de solo lectura
        |
Quotation MCP :8000/mcp
        |
        v
Cliente o agente compatible con MCP
```

- El frontend consume la API mediante `NEXT_PUBLIC_API_URL`.
- La API administra la tabla `dm_products`.
- El MCP no consume la API REST: se conecta directamente a la misma base de datos con permisos de lectura.

---

## Funcionalidades

### Dashboard

La página principal muestra:

- Total de productos.
- Productos activos e inactivos.
- Cantidad de productos de diseño.
- Cantidad de productos de desarrollo.
- Últimos productos actualizados.
- Acceso rápido para crear un producto.

### Administración de productos

- Listado paginado de productos.
- Búsqueda por código, nombre o descripción.
- Filtro por área.
- Filtro por modalidad de precio.
- Filtro por estado.
- Ordenamiento por posición, nombre, precio o fecha de actualización.
- Creación de nuevos productos.
- Edición de productos existentes.
- Activación y desactivación.
- Duplicación de registros.
- Eliminación permanente.

### Orden del catálogo

- Recupera hasta 100 productos ordenados por `displayOrder`.
- Permite mover elementos hacia arriba o hacia abajo.
- Envía el nuevo orden al endpoint `PATCH /products/reorder`.

### Vista del catálogo activo

Muestra únicamente los productos activos que pueden utilizarse en cotizaciones, incluyendo:

- Área.
- Código.
- Nombre.
- Descripción.
- Precio.
- Tipo de precio.
- Unidad cotizable.
- Tiempo estimado de entrega.
- Periodicidad de cobro.

### Configuración

- Muestra la URL de la API configurada.
- Permite copiar la URL.
- Permite comprobar la conexión con el backend.
- Explica cómo crear el archivo `.env.local`.

---

## Tecnologías

- [Next.js 16](https://nextjs.org/)
- React 19
- TypeScript
- Tailwind CSS 4
- Lucide React
- SweetAlert2
- ESLint 9

---

## Rutas de la aplicación

| Ruta | Descripción |
|---|---|
| `/` | Resumen general del catálogo. |
| `/productos` | Listado, búsqueda, filtros y acciones administrativas. |
| `/productos/nuevo` | Formulario para crear un producto. |
| `/productos/:id/editar` | Formulario para editar un producto. |
| `/orden` | Administración del orden del catálogo. |
| `/catalogo` | Vista previa de productos activos. |
| `/configuracion` | Información y prueba de conexión con la API. |

---

## Estructura principal

```text
quotation-web/
├── app/
│   ├── catalogo/
│   │   └── page.tsx
│   ├── configuracion/
│   │   └── page.tsx
│   ├── orden/
│   │   └── page.tsx
│   ├── productos/
│   │   ├── [id]/editar/page.tsx
│   │   ├── nuevo/page.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── AppShell.tsx
│   │   ├── EmptyState.tsx
│   │   ├── Header.tsx
│   │   ├── LoadingState.tsx
│   │   ├── PageHeader.tsx
│   │   ├── ProductForm.tsx
│   │   ├── ProductTable.tsx
│   │   ├── Sidebar.tsx
│   │   ├── StatCard.tsx
│   │   └── StatusBadge.tsx
│   ├── lib/
│   │   ├── alerts.ts
│   │   ├── api.ts
│   │   ├── constants.ts
│   │   └── format.ts
│   ├── types/
│   │   └── product.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

## Requisitos

- Node.js 20 o superior recomendado.
- npm.
- Una instancia activa de [Quotation API](https://github.com/xicaaay/quotation-api).

Para trabajar con el ecosistema completo también necesitarás PostgreSQL, configurado desde el backend.

---

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/xicaaay/quotation-web.git
cd quotation-web
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

El repositorio no incluye actualmente un archivo `.env.example`. Crea manualmente un archivo `.env.local` en la raíz:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

La aplicación elimina automáticamente una barra final de la URL, por lo que ambas variantes son válidas:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/
```

En producción, utiliza la URL HTTPS pública del backend:

```env
NEXT_PUBLIC_API_URL=https://quotation-api-production.up.railway.app
```

Después de cambiar una variable pública de Next.js, reinicia el servidor de desarrollo o genera nuevamente el build.

### 4. Ejecutar en desarrollo

```bash
npm run dev
```

La aplicación se inicia en:

```text
http://localhost:3001
```

El puerto está definido directamente en el script `dev` del `package.json`.

---

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Ejecuta Next.js en modo desarrollo en el puerto `3001`. |
| `npm run build` | Genera el build de producción. |
| `npm run start` | Ejecuta el build en el puerto `3001`. |
| `npm run lint` | Ejecuta ESLint. |

### Validación antes de desplegar

```bash
npm run lint
npm run build
```

---

## Integración con la API

El cliente central se encuentra en:

```text
app/lib/api.ts
```

La URL base se construye así:

```ts
process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
```

### Endpoints consumidos

| Método | Endpoint | Uso en el frontend |
|---|---|---|
| `GET` | `/products` | Listado, filtros, paginación y ordenamiento. |
| `GET` | `/products/:id` | Cargar un producto para editarlo. |
| `GET` | `/products/summary` | Indicadores del dashboard. |
| `GET` | `/products/options` | Opciones permitidas por el backend. |
| `GET` | `/products/catalog` | Catálogo de productos activos. |
| `POST` | `/products` | Crear producto. |
| `PATCH` | `/products/:id` | Actualizar producto. |
| `PATCH` | `/products/:id/status` | Activar o desactivar producto. |
| `POST` | `/products/:id/duplicate` | Duplicar producto. |
| `DELETE` | `/products/:id` | Eliminar producto. |
| `PATCH` | `/products/reorder` | Guardar el orden del catálogo. |

### Manejo de errores

La clase `ApiError` conserva:

- Mensaje legible.
- Código HTTP.
- Respuesta original del backend.

Los mensajes pueden llegar como una cadena o como un arreglo generado por `class-validator`. El frontend concatena los mensajes antes de mostrarlos con SweetAlert2.

---

## Modelo utilizado por el frontend

```ts
interface Product {
  id: string;
  code: string;
  name: string;
  description: string | null;
  area: "DESIGN" | "DEVELOPMENT";
  pricingType: "PER_UNIT" | "FIXED" | "RECURRING";
  basePrice: number;
  currency: string;
  unitName: string;
  billingPeriod: "ONE_TIME" | "MONTHLY" | "QUARTERLY" | "YEARLY";
  estimatedDeliveryValue: number | null;
  estimatedDeliveryUnit:
    | "BUSINESS_DAYS"
    | "CALENDAR_DAYS"
    | "WEEKS"
    | "MONTHS"
    | null;
  minimumQuantity: number;
  isActive: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}
```

---

## Flujo de creación de un producto

1. El usuario abre `/productos/nuevo`.
2. `ProductForm` reúne los datos comerciales y operativos.
3. El código y la moneda se normalizan a mayúsculas.
4. Los textos se limpian con `trim()`.
5. El frontend envía `POST /products`.
6. La API vuelve a validar el cuerpo y las reglas de negocio.
7. Prisma crea el registro en PostgreSQL.
8. El frontend muestra la confirmación y regresa a `/productos`.
9. El producto queda disponible para el MCP si está activo.

---

## Ejecución local del ecosistema completo

Abre una terminal por proyecto.

### Terminal 1: backend

```bash
cd quotation-api
npm install
cp .env.example .env
npx prisma generate
npx prisma migrate dev
npm run prisma:seed
npm run start:dev
```

Backend:

```text
http://localhost:3000
```

### Terminal 2: frontend

```bash
cd quotation-web
npm install
printf 'NEXT_PUBLIC_API_URL=http://localhost:3000\n' > .env.local
npm run dev
```

Frontend:

```text
http://localhost:3001
```

### Terminal 3: MCP opcional

Consulta la guía completa en [Quotation MCP](https://github.com/xicaaay/quotation-mcp).

```bash
cd quotation-mcp
cp .env.example .env
uv sync
uv run quotation-mcp
```

MCP:

```text
http://localhost:8000/mcp
```

---

## Despliegue

### Frontend

El proyecto utiliza los comandos estándar de Next.js:

```bash
npm run build
npm run start
```

Puede desplegarse en plataformas compatibles con Node.js, como Vercel o Railway.

Configura en el servicio:

```env
NEXT_PUBLIC_API_URL=https://dominio-publico-de-la-api
```

La variable debe existir durante el build, porque empieza con `NEXT_PUBLIC_` y se incorpora al bundle del navegador.

### Configuración necesaria en el backend

El backend debe permitir el dominio del frontend mediante `CORS_ORIGINS`:

```env
CORS_ORIGINS=https://quotation-web.example.com
```

Para varios dominios:

```env
CORS_ORIGINS=https://quotation-web.example.com,http://localhost:3001
```

---

## Seguridad y estado actual

- El panel no implementa autenticación.
- La barra lateral identifica el entorno como una API sin autenticación para pruebas.
- Todos los endpoints administrativos del backend son públicos actualmente.
- No debe exponerse públicamente con información sensible sin agregar autenticación, autorización y restricciones de red.
- La eliminación de productos es permanente.
- El frontend utiliza confirmaciones antes de cambiar estados, duplicar o eliminar.

---

## Solución de problemas

### El frontend carga, pero no muestra productos

Verifica:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

Comprueba directamente:

```bash
curl http://localhost:3000/products/summary
curl http://localhost:3000/products/catalog
```

### Error de CORS

Agrega el frontend a `CORS_ORIGINS` en el backend:

```env
CORS_ORIGINS=http://localhost:3001
```

Luego reinicia la API.

### La prueba de configuración dice que la API responde, pero el catálogo falla

La pantalla de configuración consulta la ruta raíz `/`. Actualmente el backend responde `Hello World!` en esa ruta. Comprueba también los endpoints de productos:

```bash
curl http://localhost:3000/products/summary
```

### Los cambios de `.env.local` no se reflejan

Detén y vuelve a ejecutar:

```bash
npm run dev
```

### Error durante el build

Ejecuta:

```bash
rm -rf .next
npm install
npm run lint
npm run build
```

---

## Mejoras recomendadas

- Incorporar autenticación y control de roles.
- Agregar una variable `.env.example` al repositorio.
- Añadir pruebas unitarias y de interfaz.
- Implementar reordenamiento mediante arrastrar y soltar.
- Crear una vista de cotización que utilice el catálogo activo.
- Mejorar el health check para comprobar `/products/summary` y no únicamente `/`.
- Agregar observabilidad para errores de red.
- Documentar el despliegue seleccionado con dominios reales.

---

## Estado del proyecto

Proyecto en etapa de demostración funcional. El panel administra el catálogo de productos del backend y sirve como interfaz humana del mismo conjunto de datos que consulta el servidor MCP.

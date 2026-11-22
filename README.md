# Rastro Web

Web de compraventa de segunda mano hecha con React + RTK Query, parte de la entrega React de Full Stack FT Laborra.

## Puesta en marcha

1. Instala dependencias:

```bash
npm install
```

2. Arranca json-server en el puerto 3001:

```bash
npm run api
```

3. Arranca la web en modo desarrollo:

```bash
npm run dev
```

4. Abre `http://localhost:5173`

## Capturas por página

| Captura | Qué mostrar |
|---|---|
| Listado con filtros | Página `/` con al menos un filtro aplicado (ej. categoría Coches o precio máximo 200) |
| Ficha como comprador | Página `/listings/listing-1` (Seat Ibiza) con sus 2 ofertas y sin botón de editar/borrar |
| Ficha como vendedor | Página de un anuncio tuyo (ej. como Luis Martín) con el panel "Tu anuncio" y botón Guardar/Borrar |
| Publicar | Página `/listings/new` con el formulario de publicación |

## Tecnologías

- React 19 + TypeScript + Vite
- Redux Toolkit + RTK Query
- React Router DOM
- json-server (primera parte)
- CSS Modules

## Despliegue

- **Web (Netlify):** https://rastro-web-marcodemiguel.netlify.app
- **API (Render):** https://api-rastro-marcodemiguel.onrender.com/api

## Variables de entorno

### Desarrollo local (`.env`)

```
VITE_API_URL=http://localhost:3000/api
```

### Render (API)

| Variable | Valor |
|---|---|
| `MONGODB_URI` | Dirección de MongoDB Atlas |
| `DB_NAME` | `rastro` |
| `CORS_ORIGIN` | `https://rastro-web-marcodemiguel.netlify.app` |

### Netlify (Web)

| Variable | Valor |
|---|---|
| `VITE_API_URL` | `https://api-rastro-marcodemiguel.onrender.com/api` |

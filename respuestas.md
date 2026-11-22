# Respuestas Rastro React

## Pregunta 1 — PARTE 2
¿Por qué `changeFilter` hace una copia con `new URLSearchParams(searchParams)` en vez de cambiar `searchParams` directamente?

Porque `searchParams` es inmutable. Modificarlo directamente no notifica a React Router. Se debe crear una copia nueva, mutar la copia y pasarla a `setSearchParams`. Así React detecta cambio de referencia y actualiza la URL y el componente. Apunte 01: "No cambies el estado: crea uno nuevo".

## Pregunta 2 — PARTE 4
OfferForm y OfferList son hermanos y no se pasan nada. ¿Cómo se entera la lista de que hay una oferta nueva?

A través de RTK Query. Cuando `createOffer` tiene éxito, invalida el tag `"Offer"`, lo que obliga a `useGetOffersQuery` a volver a fetchar los datos automáticamente sin recargar la página.

## Pregunta 3 — PARTE 5
¿Qué cambia en la ficha al cambiar de usuario? ¿Cómo se entera la ficha sin recibir el usuario por props? ¿Se vuelve a pedir el anuncio a la API?

Cambia quién aparece como vendedor y si el vendedor ve el panel de editar/borrar o el comprador ve el formulario de oferta. La ficha se entera porque lee el usuario actual con `useCurrentUser()` del Context, que reacciona al cambio del desplegable sin recargar. No se vuelve a pedir el anuncio a la API; solo cambia el renderizado condicional del aside.

## Pregunta 4 — PARTE 6
¿Por qué hacen falta `PATCH` y `DELETE` en la lista y `Content-Type` en las cabeceras? ¿Qué petición de tu web fallaría sin cada uno?

`PATCH` se necesita para cambiar el precio de un anuncio (SellerPanel). Sin `PATCH` en `Access-Control-Allow-Methods`, esa petición fallaría con CORS. `DELETE` se necesita para borrar un anuncio (SellerPanel). Sin `DELETE`, fallaría también con CORS. `Content-Type` se necesita para enviar JSON en peticiones `POST` y `PATCH` (ofertar, publicar, cambiar precio). Sin `Content-Type` en `Access-Control-Allow-Headers`, esas peticiones fallarían con CORS.

## Pregunta 5 — PARTE 6
¿Por qué al volver a la ficha no suben las visitas y al recargar sí?

La API suma una visita en cada `GET /listings/:id`. Al volver al listado y entrar otra vez, React Router reusa el componente y RTK Query sirve la caché sin hacer una petición nueva, por lo que las visitas no suben. Al recargar, la página se monta de nuevo y se hace una petición fresca a la API, que sí suma la visita.


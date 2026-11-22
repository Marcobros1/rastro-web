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


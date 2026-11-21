# Respuestas Rastro React

## Pregunta 1
¿Por qué `changeFilter` hace una copia con `new URLSearchParams(searchParams)` en vez de cambiar `searchParams` directamente?

Porque `searchParams` es inmutable. Modificarlo directamente no notifica a React Router. Se debe crear una copia nueva, mutar la copia y pasarla a `setSearchParams`. Así React detecta cambio de referencia y actualiza la URL y el componente. Apunte 01: "No cambies el estado: crea uno nuevo".


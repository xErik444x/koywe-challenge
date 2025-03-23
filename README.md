data:
https://dev.to/trickaugusto/ddd-dependency-injection-e-facade-com-nestjs-525c

principios solid:
https://mugan86.medium.com/nestjs-aplicando-solid-357b80d4245c

La estructura que presentas sugiere una arquitectura limpia y separada por capas:

bll (Business Logic Layer): Lógica de negocio.
dal (Data Access Layer): Acceso a datos (bases de datos, APIs externas, etc.).
facades: Puntos de entrada simplificados para interactuar con la lógica de negocio.
models: Definiciones de datos (interfaces, clases).
providers/exchange-rate: Proveedores específicos, como el de tasas de cambio.

Prisma:
https://docs.nestjs.com/recipes/prisma

inicializar prisma despues de hacer el pnpm i:

> npx prisma init

Antes de ejecutar el proyecto, si la base de datos está sin tablas ni nada:
npx prisma generate

levantar solo postgres del docker-compose:
docker-compose up -d database

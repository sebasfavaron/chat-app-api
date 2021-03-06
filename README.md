# Balanz chat app API

El API se desarrolló en **NodeJS** version > 10.16.0 usando el framework **Express**, además está conectada a una base de datos NoSQL **MongoDB**, ejecutada como servicio en cloud desde **MongoDB Atlas**. 
  
## Configuración de Ambiente

 Crear archivo `.env` en la raíz del proyecto, guiarse del template `.env-example`. Allí se debe configurar el **DB_URL** que es el endpoint del cluster de **MongoDB Atlas**. Existen 3 bases de datos predefinidas (development, production y test), que la aplicación apuntará automáticamente según el modo de ejecución **NODE_ENV** (prod o dev) o durante los Test Automáticos. Por último configurar el **DB_USER** y **DB_PASS** (usuario y password de base de datos).

## Ejecución para Development

 1. Realizar la instalación de los módulos `npm install`.
 2. Ejecutar la aplicación `npm start`.
 3. Realizar los request al endpoint `localhost:3000`.

## Ejecución de Tests

Los **tests automáticos** se desarrollaron con las bibliotecas **Jest** y **Supertest** donde se realizaron diferentes test de los métodos expuestos en la **API**, logrando un **coverage** > 93%.

 Ejecutar el test `npm test`, la respuesta arroja en consola los resultados de los tests y del coverage. También en la **carpeta coverage** se pueden ver los resultados de los mismos.

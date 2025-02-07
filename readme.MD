# Reto de codigo coordinadora mercantil

## Pasos para correr la app
1. Crear un archivo .env con las variables que pasé por el correo
2. Ejecutar el comando `yarn dev`
3. Abrir la ruta http://localhost:3005/coordi/ms-coordinadota-test/api/v1/docs para ver el swagger
4. De ahi para adelante puedes probar los diferentes endpoints

## Comandos para correr los tests
- Se espera tener bastante la mayor covertura, porfavor correr este comando. Se aplica la estructura When, Given, Then
- Compando para correr test de integracion, que son la mayoria
    `yarn test:integracion`
- Compando para correr test de unitarios
    `yarn test:unitarios`
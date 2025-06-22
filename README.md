# backend_peluqueria

Este proyecto utiliza MySQL como Base de Datos
Una vez clonado el proyecto desde GitHub, debe seguir los siguientes pasos:

1. Ejecutar el comando: npm i, esto instalará las dependencias necesarias para el correcto funcionamiento del proyecto

2. Debe crear un archivo .env tomando como ejemplo el archivo: .example.env Deben incluirse las siguientes variables: 
    - DB_NAME: corresponde al nombre de la BD
    - DB_HOST: corresponde a la ip o hosting donde esta alojado la DB
    - DB_PORT: corresponde al puerto donde se encuntra levantado la DB
    - DB_USER: corresponde al usuario que tiene acceso a la DB
    - DB_PASSWORD: corresponde a la clave del usuario que tiene acceso a la DB
    - PORT: corresponde al puerto donde será levantado el proyecto del backend 
    - JWT_SECRET: corresponde a un código utilizado para firmar el token al iniciar sesión

    Notas: 
    - Pueden tomarse los valores indicados en el archivo .example.env
    - Se debe tener MySQL Workbench o un servidor que tenga disponible MySQL

3. En la carpeta raíz del proyecto se encuentra el archivo index.js, dentro del archivo en la línea 24 debe colocarse la IP y Puerto en el cual se encuentra levantado el proyecto del frontend, esto es requerido debido a los conflictos generados por CORS

4. Una vez realizados todos los pasos anteriores debe ejecutar el siguiente comando en la terminal: npm run serve, esto levantará el proyecto en su ip local utilizando el puerto indicado en la variable PORT del archivo .env
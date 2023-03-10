# crypto-tracker
Repositorio con el código fuente de la prueba técnica de Disruptive Studio.

## Estructura
El presente proyecto consta de 2 carpetas:
- client
- server

La primera de estas contiene el código fuente de una aplicación inicializada con Create-React-App mientras que la segunda contiene el código fuente de una aplicación hecha con Node.js la cual se integra con el API de Messari.io para obtener información sobre los valores y equivalencias de varias criptomonedas.

---
## Variables de ambiente (client)
Estas variables deben constar en el archivo `.env` dentro de la carpeta `client`:
```bash
## URL hacia el server y para obtener imágenes de las criptomonedas
REACT_APP_API_URL=http://XXXXXXXX:XXXX
REACT_APP_API_IMAGES_URL=https://XXXXXX-XXXXXX.XXXXXXX.XX/XXXXXX
REACT_APP_WEBSOCKET_URL=ws://XXXXXXXXX:XXXX/XXXXXXXXXX

# ID encriptado que el server verifica si es válido
REACT_APP_APP_ID=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

## Scripts (client)
En el directorio `client`, se encuentran los siguientes scripts:

```bash
# Ejecuta la aplicación cliente en modo Desarrollo.\
# Abre la direcciíon [http://localhost:3000](http://localhost:3000) en una pestaña del navegador predefinido, la cual se actualizará si se realizan cambios en el código fuente. También mostrará si hay algún error durante la ejecución del proyecto.
# Más información en la sección [deployment](https://facebook.github.io/create-react-app/docs/deployment).
npm start

# Ejecuta todas las pruebas
npm run test

# Prepara la aplicación para Producción en la carpeta `build`.\
# Si el proceso se realiza correctamente, React optimizará el build para un mejor rendimiento.
# El build es minificado y los nombres de archivos incluirán los hashes.\
# La aplicación está lista para deployar!
npm run build
```

---
## Variables de ambiente (server)
Estas variables deben constar en el archivo `.env` dentro de la carpeta `server`:
```bash
# Port number
PORT=5000

# Messari
MESSARI_API_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXX
MESSARI_API_URL=https://XXXX.XXXXXXX.XX/XXX

# Cryptr
CRYPTR_SECRET=XXXXXXXXXXXXXXXXX

# JWT
JWT_SECRET=XXXXXXXXXXXXXXX
```

## Scripts (server)
En el directorio `server`, se encuentran los siguientes scripts:

```bash
# Para ejecutar en modo Desarrollo:
npm run dev

# Para el modo Producción:
npm start

# Ejecuta todas las pruebas
npm run test

# Ejecuta todas las pruebas en modo observación
npm run test:watch

# Ejecuta las pruebas y verifica la cobertura
npm run coverage

# Arregla errores de formateo
npm run lint:fix
```

## Validación (server)
Los esquemas para validar están en el directorio `src/validations` y son usados por los routes el cual llama a la función middleware `validate`.

```javascript
const express = require('express');
const controller = require('../controllers/XXXX');
const validate = require('../middlewares/validate');
const validation = require('../validations/XXXX.validation');

const router = express.Router();

router.post('/my-route', validate(validation.method1), controller.routeHandler);
```

## Linting

El Linter usa [ESLint](https://eslint.org/) y [Prettier](https://prettier.io).

Se usan las reglas de [Airbnb JavaScript style guide](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base) con ciertas modificaciones.

Para modificar la configuration de ESLint, actualice el archivo `.eslintrc.json`.

Para evitar que un archivo o carpeta sea formateado, agreguelo en `.eslintignore`.

## Autor
Julián A
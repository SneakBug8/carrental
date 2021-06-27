Project landing page: http://k-2021-2.std-1482.ist.mospolytech.ru/

## How to run

### Dev

1. Run `npm run-script watch` in one console.
2. `cd client && npm start` in separate console.
3. `cd admin && npm start` in third console.

### Production

1. `cd client && npm run-script build`
2. Make sure not to move/rename client folder from it default location
3. `npm start` in main folder for Backend & Frontend on one ExpressJS server
4. `cd admin && npm start` in separate console for admin panel
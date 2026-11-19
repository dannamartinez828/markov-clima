# Tasks

## 1. Modelo y validación de la matriz

- [x] 1.1 Crear `markov.js` como módulo puro compatible con `module.exports` y el navegador, implementar `validarMatriz` y agregar `test/markov.test.js` con casos de matriz válida, filas inválidas y valores fuera de rango; configurar `package.json` con `"test": "node --test"` y verificar con `npm test`.
- [x] 1.2 Implementar `multiplicarVectorMatriz` y `distribucionEnPasos` con los tres estados y la matriz especificada, para los pasos 1, 3, 5 y 10 desde cada estado inicial; agregar pruebas de resultados y orden en `test/markov.test.js` y verificar con `npm test`.

## 2. Interfaz y presentación de resultados

- [x] 2.1 Crear `index.html` con el selector de estado inicial, la tabla, Chart.js por CDN y `markov.js`; verificar en el navegador que aparecen los tres estados y los cuatro horizontes.
- [x] 2.2 Implementar la gráfica de barras agrupadas por paso y actualizar tabla y gráfica cuando cambia el estado inicial; verificar en el navegador que ambas vistas muestran los mismos valores para Soleado, Nublado y Lluvioso y que `npm test` pasa.

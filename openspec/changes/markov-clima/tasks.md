# Tasks

## 1. Modelo y validación de la matriz

- [ ] 1.1 Implementar la validación de dimensiones, rango de probabilidades y suma de cada fila en un módulo JavaScript puro; agregar pruebas `node:test` para la matriz válida, filas inválidas y valores fuera de rango, y verificar con `node --test`.
- [ ] 1.2 Implementar el modelo con los tres estados y la matriz especificada, y calcular las distribuciones para los pasos 1, 3, 5 y 10 desde cada estado inicial; agregar pruebas de resultados y orden de salida, y verificar con `node --test`.

## 2. Interfaz y presentación de resultados

- [ ] 2.1 Crear la página HTML estática con el selector de estado inicial y la tabla de resultados, y cargar Chart.js por CDN sin build; verificar en el navegador que aparecen los tres estados y los cuatro horizontes.
- [ ] 2.2 Implementar la gráfica de barras agrupadas por paso y actualizar tabla y gráfica cuando cambia el estado inicial; verificar en el navegador que ambas vistas muestran los mismos valores para Soleado, Nublado y Lluvioso y que el proyecto sigue pasando `node --test`.

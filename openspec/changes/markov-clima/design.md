# Design

## Context

El repositorio no tiene implementación preexistente. La motivación y el alcance funcional están en [proposal.md](./proposal.md); los contratos observables están en los tres specs de este cambio. La solución debe ejecutarse sin build y las pruebas deben poder ejecutarse con `node --test`.

## Goals / Non-Goals

**Goals:**
- Separar el cálculo y la validación de la manipulación del DOM para probar las funciones deterministas con las herramientas integradas de Node.js.
- Mantener una única fuente de datos para los resultados presentados en la tabla y en la gráfica.
- Evitar herramientas de compilación y dependencias de runtime aparte de Chart.js cargado desde CDN.

**Non-Goals:**
- Permitir editar la matriz o añadir estados y horizontes configurables por la persona usuaria.
- Añadir persistencia, servidor de aplicación, API o proceso de empaquetado.

## Decisions

1. **Un módulo JavaScript puro compatible con CommonJS y el navegador.** Implementar las funciones de Markov en `markov.js` con una envoltura UMD sencilla: Node las obtiene mediante `module.exports` y el navegador mediante un objeto global. La página puede cargarlo como un script clásico y los tests pueden importarlo con `require`, sin transpilar, duplicar la lógica ni requerir módulos ES.

2. **Cálculo mediante multiplicación repetida.** Crear el vector unitario del estado inicial y aplicar la matriz de transición repetidamente hasta el mayor horizonte; guardar las distribuciones en los pasos 1, 3, 5 y 10. Esto es matemáticamente equivalente a multiplicar el vector por la matriz elevada a cada exponente requerido, evita implementar una operación general de exponenciación de matrices que no aporta valor para estos cuatro horizontes y reduce errores de orden. Los datos se mantienen como probabilidades entre 0 y 1.

3. **Matriz fija con validación antes del pronóstico.** Definir la matriz en el modelo, conservar el orden Soleado, Nublado, Lluvioso y validarla antes de calcular o presentar resultados. La validación comprueba dimensiones compatibles, valores entre 0 y 1 y sumas de fila dentro de la tolerancia de 1e-9 del spec; si falla, la aplicación debe mostrar un error explícito en lugar de producir un pronóstico. No se ofrece edición de la matriz porque el único dato que el requisito pide elegir es el estado inicial.

4. **Chart.js desde CDN y actualización coordinada de vistas.** El HTML carga Chart.js desde CDN y presenta la tabla junto con un gráfico de barras agrupadas: categorías de horizonte en el eje horizontal y una serie por estado. Al cambiar el estado inicial, recalcular una sola vez, actualizar la tabla y actualizar la instancia existente del gráfico para que ambas vistas correspondan al mismo pronóstico. Frente a generar un gráfico por selección, reutilizar la instancia evita duplicados y acumulación de recursos.

5. **Pruebas con `node:test` y sin dependencias de prueba.** Usar `test/markov.test.js` para validar la matriz y los resultados de todos los estados y horizontes. El `package.json` solo declara el script `test` que ejecuta `node --test`; no añade dependencias. La integración visual se comprueba en el navegador y `markov.js` permanece aislado del DOM para que sus pruebas sean deterministas.

## Risks / Trade-offs

- [La CDN de Chart.js puede no estar disponible] → La aplicación no tendrá una gráfica sin conexión; mantener la lógica y los resultados tabulares independientes de Chart.js y mostrar un mensaje visible si el gráfico no se puede inicializar.
- [Chart.js requiere conectividad al CDN] → Mantener el cálculo y la tabla independientes de la gráfica y presentar un mensaje visible si la biblioteca no está disponible.
- [El redondeo de punto flotante puede hacer que las sumas difieran mínimamente de 1] → Aplicar la tolerancia especificada al validar filas y conservar los valores sin redondear para los cálculos.

## Migration Plan

No hay datos ni aplicación existentes que migrar. Abrir la página estática y ejecutar `npm test` (o `node --test`); no se requiere despliegue de backend ni hay una migración que revertir.

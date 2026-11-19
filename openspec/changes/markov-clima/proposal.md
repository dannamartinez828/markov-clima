# Proposal

## Why

La aplicación permitirá explorar cómo evoluciona la probabilidad del clima a partir de un estado inicial usando una cadena de Markov. Hoy el repositorio no contiene una aplicación ni especificaciones existentes para esta funcionalidad; una definición verificable permitirá construirla y probarla sin depender de un proceso de compilación.

## What Changes

- Definir el modelo de tres estados climáticos y calcular las distribuciones para 1, 3, 5 y 10 pasos a partir del estado inicial seleccionado.
- Validar que la matriz de transición configurada tenga valores probabilísticos y que cada fila sume 1.
- Presentar los resultados en una gráfica de barras agrupadas por paso y en una tabla.
- Especificar una aplicación estática con HTML, JavaScript puro y Chart.js por CDN, y pruebas ejecutables con `node --test`.

## Capabilities

### New Capabilities
- `markov-model`: Modelo de transición y cálculo de distribuciones para los pasos solicitados.
- `transition-matrix-validation`: Validación de probabilidades y sumas de filas de la matriz.
- `forecast-interface`: Selección del estado inicial y presentación gráfica y tabular de resultados.

### Modified Capabilities

Ninguna.

## Impact

El repositorio contiene actualmente únicamente la estructura de OpenSpec, sin código de aplicación, pruebas ni documentación de producto. La implementación prevista añadirá una página HTML estática y módulos JavaScript comprobables con Node.js; Chart.js se cargará desde CDN. No se prevén cambios de API externa ni un paso de build.

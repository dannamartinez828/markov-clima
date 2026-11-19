# Pronóstico del clima con cadenas de Markov

## Problema

Esta aplicación usa una cadena de Markov para estimar la distribución de probabilidad del clima después de varios pasos, partiendo de un estado inicial elegido por la persona usuaria.

## Estados y matriz de transición

Cada fila indica el estado actual y cada columna la probabilidad del siguiente estado.

| Estado actual | Soleado | Nublado | Lluvioso |
| --- | ---: | ---: | ---: |
| Soleado | 0.7 | 0.2 | 0.1 |
| Nublado | 0.3 | 0.4 | 0.3 |
| Lluvioso | 0.2 | 0.4 | 0.4 |

## Ejecutar

- **Aplicación:** abre `index.html` en un navegador. Chart.js se carga desde un CDN, por lo que la gráfica requiere conexión a Internet.
- **Pruebas:** ejecuta `npm test` desde la carpeta del proyecto.

## SDD y OpenSpec

El desarrollo siguió SDD (Specification-Driven Development) con el flujo **propose → apply → archive**:

1. **Propose:** se definieron la propuesta, el diseño, las tareas y los escenarios de aceptación.
2. **Apply:** se implementó la aplicación y se completaron las tareas verificadas.
3. **Archive:** se sincronizaron los delta specs con las especificaciones principales y se archivó el cambio.

Los artefactos del cambio están en [`openspec/changes/archive/2026-11-19-markov-clima/`](openspec/changes/archive/2026-11-19-markov-clima/). Las especificaciones principales están en:

- [`openspec/specs/markov-model/spec.md`](openspec/specs/markov-model/spec.md)
- [`openspec/specs/transition-matrix-validation/spec.md`](openspec/specs/transition-matrix-validation/spec.md)
- [`openspec/specs/forecast-interface/spec.md`](openspec/specs/forecast-interface/spec.md)

## Evidencia

El historial de commits muestra el proceso en etapas: especificación OpenSpec (`f53774c`), implementación (`41bda6a`), pruebas (`6c78d1b`) y archivo del cambio (`ea07ab3`). Puedes consultarlo con:

```sh
git log --oneline
```

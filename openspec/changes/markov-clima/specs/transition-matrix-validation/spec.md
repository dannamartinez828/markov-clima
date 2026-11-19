# Spec Delta

## Purpose

Garantizar que solo se utilice una matriz de transición formada por probabilidades válidas y filas que representen distribuciones completas.

## ADDED Requirements

### Requirement: Validar las probabilidades de transición
El sistema SHALL aceptar la matriz únicamente si todas sus entradas están entre 0 y 1 inclusive y la suma de cada fila es 1, considerando una tolerancia numérica de 1e-9.

#### Scenario: Aceptar la matriz climática especificada
- **GIVEN** la matriz contiene las filas [0.7, 0.2, 0.1], [0.3, 0.4, 0.3] y [0.2, 0.4, 0.4]
- **WHEN** se valida la matriz
- **THEN** la validación tiene éxito

#### Scenario: Rechazar una fila cuya suma no es uno
- **GIVEN** una fila de la matriz suma 0.9
- **WHEN** se valida la matriz
- **THEN** la validación falla e identifica la fila que no suma 1

#### Scenario: Rechazar una entrada fuera del rango probabilístico
- **GIVEN** una entrada de la matriz es menor que 0 o mayor que 1
- **WHEN** se valida la matriz
- **THEN** la validación falla e identifica la entrada inválida

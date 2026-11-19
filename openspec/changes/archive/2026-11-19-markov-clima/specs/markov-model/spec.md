# Spec Delta

## Purpose

Define cómo evoluciona la distribución de probabilidad del clima cuando se parte de un estado conocido y se aplican las transiciones especificadas a lo largo de varios pasos.

## ADDED Requirements

### Requirement: Calcular distribuciones por pasos
El sistema SHALL representar los estados en el orden Soleado, Nublado y Lluvioso y SHALL calcular la distribución en 1, 3, 5 y 10 pasos mediante la distribución inicial multiplicada por la matriz de transición elevada al número de pasos.

#### Scenario: Calcular un paso desde Soleado
- **GIVEN** la distribución inicial es [1, 0, 0] y la matriz indicada para los estados climáticos
- **WHEN** se calcula la distribución después de 1 paso
- **THEN** el resultado es [0.7, 0.2, 0.1] en el orden Soleado, Nublado y Lluvioso

#### Scenario: Calcular todos los horizontes requeridos
- **GIVEN** se ha seleccionado cualquiera de los tres estados como estado inicial
- **WHEN** se solicita el pronóstico
- **THEN** el sistema devuelve una distribución para cada uno de los pasos 1, 3, 5 y 10, en ese orden, con tres probabilidades asociadas a los estados

#### Scenario: Aplicar la transición para un estado inicial distinto
- **GIVEN** la distribución inicial es [0, 0, 1], correspondiente a Lluvioso
- **WHEN** se calcula la distribución después de 1 paso
- **THEN** el resultado es [0.2, 0.4, 0.4] en el orden Soleado, Nublado y Lluvioso

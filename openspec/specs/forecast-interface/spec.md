# forecast-interface Specification

## Purpose

Permitir que una persona configure el estado inicial del pronóstico y comprenda la evolución de las probabilidades mediante una tabla y una gráfica coordinadas.

## Requirements

### Requirement: Seleccionar el estado inicial
La interfaz SHALL permitir seleccionar Soleado, Nublado o Lluvioso como estado inicial del pronóstico.

#### Scenario: Mostrar todos los estados iniciales disponibles
- **GIVEN** la interfaz del pronóstico está cargada
- **WHEN** la persona abre el selector de estado inicial
- **THEN** puede elegir Soleado, Nublado o Lluvioso

#### Scenario: Actualizar el pronóstico al cambiar el estado inicial
- **GIVEN** la persona selecciona un estado inicial
- **WHEN** se actualiza el pronóstico
- **THEN** la tabla y la gráfica muestran las distribuciones calculadas desde ese estado

### Requirement: Mostrar resultados tabulares y gráficos
La interfaz SHALL presentar las distribuciones de los pasos 1, 3, 5 y 10 en una tabla y en una gráfica de barras agrupadas por paso, con una serie para cada estado climático.

#### Scenario: Consultar los resultados en ambos formatos
- **GIVEN** hay un pronóstico calculado
- **WHEN** la persona consulta los resultados
- **THEN** la tabla y la gráfica representan los mismos valores para Soleado, Nublado y Lluvioso en los pasos 1, 3, 5 y 10

#### Scenario: Distinguir estados y horizontes en la presentación
- **GIVEN** se muestran resultados de un pronóstico
- **WHEN** la persona interpreta la gráfica y la tabla
- **THEN** cada valor se puede asociar inequívocamente con uno de los pasos 1, 3, 5 o 10 y uno de los estados climáticos

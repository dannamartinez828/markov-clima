const test = require("node:test");
const assert = require("node:assert/strict");
const {
  estados,
  matrizTransicion,
  pasosPronostico,
  validarMatriz,
  multiplicarVectorMatriz,
  distribucionEnPasos,
} = require("../markov");

const matrizClimatica = [
  [0.7, 0.2, 0.1],
  [0.3, 0.4, 0.3],
  [0.2, 0.4, 0.4],
];

function assertArrayClose(actual, esperado, tolerancia = 1e-12) {
  assert.equal(actual.length, esperado.length);
  actual.forEach((valor, indice) => {
    assert.ok(Math.abs(valor - esperado[indice]) <= tolerancia);
  });
}

test("validarMatriz acepta la matriz climática especificada", () => {
  assert.equal(validarMatriz(matrizClimatica), true);
});

test("validarMatriz acepta diferencias dentro de la tolerancia numérica", () => {
  assert.equal(validarMatriz([[0.7, 0.2, 0.1000000005], [0, 1, 0], [0, 0, 1]]), true);
});

test("validarMatriz rechaza e identifica una fila cuya suma no es uno", () => {
  assert.throws(() => validarMatriz([[0.7, 0.2, 0], [0.3, 0.4, 0.3], [0.2, 0.4, 0.4]]), /fila 1.*suma/i);
});

test("validarMatriz rechaza entradas fuera del rango probabilístico", () => {
  assert.throws(() => validarMatriz([[1.1, 0, 0], [0, 1, 0], [0, 0, 1]]), /fila 1, columna 1/i);
  assert.throws(() => validarMatriz([[-0.1, 0.6, 0.5], [0, 1, 0], [0, 0, 1]]), /fila 1, columna 1/i);
});

test("validarMatriz rechaza dimensiones incompatibles", () => {
  assert.throws(() => validarMatriz([[1, 0], [0, 1, 0]]), /fila 2.*2 valores/i);
});

test("multiplicarVectorMatriz aplica las transiciones respetando el orden de estados", () => {
  assert.deepEqual(multiplicarVectorMatriz([1, 0, 0], matrizTransicion), [0.7, 0.2, 0.1]);
  assertArrayClose(multiplicarVectorMatriz([1, 2, 3], matrizTransicion), [1.9, 2.2, 1.9]);
});

test("distribucionEnPasos calcula los cuatro horizontes desde Soleado", () => {
  const resultados = distribucionEnPasos("Soleado");
  const esperados = [
    [0.7, 0.2, 0.1],
    [0.511, 0.286, 0.203],
    [0.47183, 0.30318, 0.22499],
    [0.4617417177, 0.3076031906, 0.2306550917],
  ];

  assert.deepEqual(resultados.map((resultado) => resultado.paso), [1, 3, 5, 10]);
  resultados.forEach((resultado, indice) => {
    assertArrayClose(resultado.probabilidades, esperados[indice]);
  });
});

test("distribucionEnPasos inicia cada estado con su vector unitario", () => {
  const esperadosUnPaso = [
    [0.7, 0.2, 0.1],
    [0.3, 0.4, 0.3],
    [0.2, 0.4, 0.4],
  ];

  estados.forEach((estado, indice) => {
    const resultados = distribucionEnPasos(estado);
    assert.deepEqual(resultados[0].probabilidades, esperadosUnPaso[indice]);
    assert.deepEqual(resultados.map((resultado) => resultado.paso), pasosPronostico);
    resultados.forEach(({ probabilidades }) => {
      assert.equal(probabilidades.length, estados.length);
      assert.ok(probabilidades.every((valor) => valor >= 0 && valor <= 1));
      assert.ok(Math.abs(probabilidades.reduce((suma, valor) => suma + valor, 0) - 1) < 1e-9);
    });
  });
});

test("distribucionEnPasos rechaza un estado inicial desconocido", () => {
  assert.throws(() => distribucionEnPasos("Ventoso"), /Estado inicial desconocido/i);
});

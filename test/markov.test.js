const test = require("node:test");
const assert = require("node:assert/strict");
const {
  matrizTransicion: MATRIZ,
  validarMatriz,
  distribucionEnPasos,
} = require("../markov");

test("cada fila de MATRIZ suma 1", () => {
  MATRIZ.forEach((fila) => {
    assert.ok(Math.abs(fila.reduce((suma, valor) => suma + valor, 0) - 1) < 1e-9);
  });
});

test("en 1 paso desde Soleado el resultado es [0.7, 0.2, 0.1]", () => {
  assert.deepEqual(distribucionEnPasos("Soleado")[0].probabilidades, [0.7, 0.2, 0.1]);
});

test("las distribuciones en los pasos 1, 3, 5 y 10 suman 1", () => {
  const resultados = distribucionEnPasos("Soleado");

  assert.deepEqual(resultados.map(({ paso }) => paso), [1, 3, 5, 10]);
  resultados.forEach(({ probabilidades }) => {
    assert.ok(Math.abs(probabilidades.reduce((suma, valor) => suma + valor, 0) - 1) < 1e-9);
  });
});

test("una matriz inválida lanza un error", () => {
  assert.throws(() => validarMatriz([
    [0.7, 0.2, 0],
    [0.3, 0.4, 0.3],
    [0.2, 0.4, 0.4],
  ]));
});

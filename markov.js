(function (root, factory) {
  const api = factory();

  if (typeof module === "object" && module.exports) {
    module.exports = api;
  } else {
    root.MarkovClima = api;
  }
})(globalThis, function () {
  const estados = Object.freeze(["Soleado", "Nublado", "Lluvioso"]);
  const matrizTransicion = Object.freeze([
    Object.freeze([0.7, 0.2, 0.1]),
    Object.freeze([0.3, 0.4, 0.3]),
    Object.freeze([0.2, 0.4, 0.4]),
  ]);
  const pasosPronostico = Object.freeze([1, 3, 5, 10]);

  function validarMatriz(matriz, tolerancia = 1e-9) {
    if (!Array.isArray(matriz) || matriz.length === 0) {
      throw new TypeError("La matriz debe ser un arreglo no vacío.");
    }

    const dimension = matriz.length;

    for (let fila = 0; fila < dimension; fila += 1) {
      if (!Array.isArray(matriz[fila]) || matriz[fila].length !== dimension) {
        throw new TypeError(`La fila ${fila + 1} debe contener ${dimension} valores.`);
      }

      let suma = 0;
      for (let columna = 0; columna < dimension; columna += 1) {
        const valor = matriz[fila][columna];
        if (typeof valor !== "number" || !Number.isFinite(valor) || valor < 0 || valor > 1) {
          throw new RangeError(`La entrada de la fila ${fila + 1}, columna ${columna + 1} debe estar entre 0 y 1.`);
        }
        suma += valor;
      }

      if (Math.abs(suma - 1) > tolerancia) {
        throw new RangeError(`La fila ${fila + 1} suma ${suma}; debe sumar 1.`);
      }
    }

    return true;
  }

  function multiplicarVectorMatriz(vector, matriz) {
    validarMatriz(matriz);
    if (!Array.isArray(vector) || vector.length !== matriz.length) {
      throw new TypeError(`El vector debe contener ${matriz.length} valores.`);
    }

    for (let indice = 0; indice < vector.length; indice += 1) {
      if (typeof vector[indice] !== "number" || !Number.isFinite(vector[indice])) {
        throw new TypeError(`El valor ${indice + 1} del vector debe ser un número finito.`);
      }
    }

    return matriz[0].map((_, columna) =>
      vector.reduce((suma, valor, fila) => suma + valor * matriz[fila][columna], 0)
    );
  }

  function distribucionEnPasos(estadoInicial) {
    const indiceInicial = estados.indexOf(estadoInicial);
    if (indiceInicial === -1) {
      throw new RangeError(`Estado inicial desconocido: ${estadoInicial}.`);
    }

    validarMatriz(matrizTransicion);
    let distribucion = estados.map((_, indice) => Number(indice === indiceInicial));
    const resultados = [];

    for (let paso = 1; paso <= pasosPronostico[pasosPronostico.length - 1]; paso += 1) {
      distribucion = multiplicarVectorMatriz(distribucion, matrizTransicion);
      if (pasosPronostico.includes(paso)) {
        resultados.push({ paso, probabilidades: distribucion });
      }
    }

    return resultados;
  }

  return {
    estados,
    matrizTransicion,
    pasosPronostico,
    validarMatriz,
    multiplicarVectorMatriz,
    distribucionEnPasos,
  };
});

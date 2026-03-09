const calculadora = require("../../models/calculadora.js");

test("2 mais 2 deveria dar quatro", () => {
  const resultado = calculadora.somar(2, 2);
  expect(resultado).toBe(4);
});

test("5 mais 100 deveria dar 105", () => {
  const resultado = calculadora.somar(5, 100);
  expect(resultado).toBe(105);
});

test("'banana' mais 100 deveria dar 'Erro'", () => {
  const resultado = calculadora.somar("banana", 100);
  expect(resultado).toBe("Erro");
});

test("100 mais 'banana' dar 'Erro'", () => {
  const resultado = calculadora.somar(100, "banana");
  expect(resultado).toBe("Erro");
});

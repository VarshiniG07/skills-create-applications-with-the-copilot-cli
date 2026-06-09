const { calc } = require('../calculator');

describe('Calculator basic operations', () => {
  test('2 + 3 (add) -> 5', () => {
    expect(calc('add', 2, 3)).toBe(5);
  });

  test('2 + 3 (+) -> 5', () => {
    expect(calc('+', 2, 3)).toBe(5);
  });

  test('10 - 4 (sub) -> 6', () => {
    expect(calc('sub', 10, 4)).toBe(6);
  });

  test('10 - 4 (-) -> 6', () => {
    expect(calc('-', 10, 4)).toBe(6);
  });

  test('45 * 2 (mul) -> 90', () => {
    expect(calc('mul', 45, 2)).toBe(90);
  });

  test('45 * 2 (*) -> 90', () => {
    expect(calc('*', 45, 2)).toBe(90);
  });

  test('20 / 5 (div) -> 4', () => {
    expect(calc('div', 20, 5)).toBe(4);
  });

  test('20 / 5 (/) -> 4', () => {
    expect(calc('/', 20, 5)).toBe(4);
  });

  test('Division by zero throws', () => {
    expect(() => calc('div', 1, 0)).toThrow(/Division by zero/i);
  });

  // New operations
  test('5 % 2 (mod) -> 1', () => {
    expect(calc('mod', 5, 2)).toBe(1);
  });

  test('5 % 2 (%) -> 1', () => {
    expect(calc('%', 5, 2)).toBe(1);
  });

  test('2 ^ 3 (pow) -> 8', () => {
    expect(calc('pow', 2, 3)).toBe(8);
  });

  test('2 ^ 3 (^) -> 8', () => {
    expect(calc('^', 2, 3)).toBe(8);
  });

  test('sqrt 16 -> 4', () => {
    expect(calc('sqrt', 16)).toBe(4);
  });

  test('Modulo by zero throws', () => {
    expect(() => calc('mod', 5, 0)).toThrow(/Modulo by zero/i);
  });

  test('Square root of negative number throws', () => {
    expect(() => calc('sqrt', -9)).toThrow(/Square root of negative/i);
  });

  // Additional requested tests
  test('Large exponent: 2^50', () => {
    expect(calc('pow', 2, 50)).toBe(Math.pow(2, 50));
  });

  test('Floating-point multiplication: 5.5 * 2 -> 11', () => {
    expect(calc('*', 5.5, 2)).toBeCloseTo(11);
  });

  test('Floating-point modulo: 5.5 % 2 -> 1.5', () => {
    expect(calc('mod', 5.5, 2)).toBeCloseTo(1.5);
  });

  test('Floating-point sqrt: sqrt 2', () => {
    expect(calc('sqrt', 2)).toBeCloseTo(Math.sqrt(2));
  });

  test('Negative base power: (-2)^3 -> -8', () => {
    expect(calc('pow', -2, 3)).toBe(-8);
  });

  test('Negative base power even exponent: (-2)^2 -> 4', () => {
    expect(calc('pow', -2, 2)).toBe(4);
  });

  test('Negative operands addition: -5 + -3 -> -8', () => {
    expect(calc('add', -5, -3)).toBe(-8);
  });

  test('Unsupported operation throws', () => {
    expect(() => calc('foobar', 2, 3)).toThrow(/Unsupported operation/i);
  });
});

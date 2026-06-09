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

  test('Unsupported operation throws', () => {
    expect(() => calc('foobar', 2, 3)).toThrow(/Unsupported operation/i);
  });
});

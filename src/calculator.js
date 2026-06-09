#!/usr/bin/env node

// Node.js CLI Calculator
// Supported operations:
//   add  -> addition (+)
//   sub  -> subtraction (-)
//   mul  -> multiplication (×)
//   div  -> division (/)
//
// Usage examples:
//   node src/calculator.js add 2 3    # -> 5
//   node src/calculator.js sub 5 2    # -> 3
//   node src/calculator.js mul 4 6    # -> 24
//   node src/calculator.js div 10 2   # -> 5

function showHelp() {
  const help = `Usage: node src/calculator.js <operation> <a> <b>

Operations:
  add   addition (a + b)
  sub   subtraction (a - b)
  mul   multiplication (a * b)
  div   division (a / b)
  mod   modulo (a % b)
  pow   exponentiation (a ** b)
  sqrt  square root (sqrt a)  -- accepts a single operand

Examples:
  node src/calculator.js add 2 3    # -> 5
  node src/calculator.js div 10 2   # -> 5
  node src/calculator.js mod 10 3   # -> 1
  node src/calculator.js pow 2 8    # -> 256
  node src/calculator.js sqrt 9     # -> 3
`;
  console.log(help);
}

function isNumeric(n) {
  return typeof n === 'number' && !Number.isNaN(n) && Number.isFinite(n);
}

function parseNumber(s) {
  const n = Number(s);
  return Number.isNaN(n) ? null : n;
}

// Additional operations
function modulo(a, b) {
  if (b === 0) throw new Error('Modulo by zero is not allowed');
  return a % b;
}

function power(base, exponent) {
  return Math.pow(base, exponent);
}

function squareRoot(n) {
  if (n < 0) throw new Error('Square root of negative number is not allowed');
  return Math.sqrt(n);
}

function calc(op, a, b) {
  switch (op) {
    case 'add':
    case '+':
      return a + b;
    case 'sub':
    case '-':
      return a - b;
    case 'mul':
    case '*':
    case 'x':
    case 'X':
      return a * b;
    case 'div':
    case '/':
      if (b === 0) {
        throw new Error('Division by zero is not allowed');
      }
      return a / b;
    case 'mod':
    case '%':
      return modulo(a, b);
    case 'pow':
    case '^':
      return power(a, b);
    case 'sqrt':
      // For sqrt, 'a' holds the operand; ignore b
      return squareRoot(a);
    default:
      throw new Error(`Unsupported operation: ${op}`);
  }
}

// CLI entry
function main(argv = process.argv.slice(2)) {
  if (argv.length === 0 || argv.includes('-h') || argv.includes('--help')) {
    showHelp();
    process.exit(0);
  }

  const op = argv[0];

  // 'sqrt' accepts a single operand; other ops expect two operands
  if (op === 'sqrt') {
    if (argv.length < 2) {
      console.error('Error: sqrt requires a single numeric operand.');
      showHelp();
      process.exitCode = 1;
      return;
    }
    const a = parseNumber(argv[1]);
    if (a === null) {
      console.error('Error: operand must be a valid number.');
      process.exitCode = 1;
      return;
    }
    try {
      const result = calc(op, a, null);
      console.log(result);
    } catch (err) {
      console.error('Error:', err.message);
      process.exitCode = 1;
    }
    return;
  }

  // Default: require two operands
  if (argv.length < 3) {
    console.error('Error: operation and two numeric operands are required.');
    showHelp();
    process.exitCode = 1;
    return;
  }

  const a = parseNumber(argv[1]);
  const b = parseNumber(argv[2]);

  if (a === null || b === null) {
    console.error('Error: both operands must be valid numbers.');
    process.exitCode = 1;
    return;
  }

  try {
    const result = calc(op, a, b);
    // Print result as plain value for scripting use
    console.log(result);
  } catch (err) {
    console.error('Error:', err.message);
    process.exitCode = 1;
  }
}

// Only run main when executed directly (not when required by tests)
if (typeof require !== 'undefined' && require.main === module) {
  main();
}

// Export for unit testing
module.exports = { calc, parseNumber, showHelp, main, modulo, power, squareRoot };

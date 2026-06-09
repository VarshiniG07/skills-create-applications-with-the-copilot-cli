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

Examples:
  node src/calculator.js add 2 3    # -> 5
  node src/calculator.js div 10 2   # -> 5
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
    default:
      throw new Error(`Unsupported operation: ${op}`);
  }
}

// CLI entry
(function main() {
  const argv = process.argv.slice(2);
  if (argv.length === 0 || argv.includes('-h') || argv.includes('--help')) {
    showHelp();
    process.exit(0);
  }

  if (argv.length < 3) {
    console.error('Error: operation and two numeric operands are required.');
    showHelp();
    process.exitCode = 1;
    return;
  }

  const op = argv[0];
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
})();

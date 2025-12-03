import { readFileSync } from 'fs';

function readInput(filename = 'day03/input.txt') {
  return readFileSync(filename, 'utf-8').trim();
}

function part1(input) {
  const lines = input.split('\n');
  console.log('Part 1:');

  let sum = 0;
  
  for (let line of lines) {
    let firstInd = maxIndLine(line.substring(0, line.length - 1));
    let secondIndShifted = maxIndLine(line.substring(firstInd + 1, line.length));
    let joltage = Number("" + line[firstInd] + line[firstInd + 1 + secondIndShifted]);
    sum += joltage;
  }

  return sum;

}

function maxIndLine(line) {
  let lineArr = line.split("");
  let maxInd = 0;
  for (let i = 1; i < line.length; i++) {
    if (line[i] > line[maxInd]) {
      maxInd = i;
    }
  }
  return maxInd;
}


function part2(input) {
  const lines = input.split('\n');

  console.log('Part 2:');

  let sum = 0;

  for (let line of lines) {
    let joltage = findNDigitNumber(line, 12);
    //console.log(joltage);
    sum += joltage;
  }

  return sum;

}

function findNDigitNumber(line, n) {
  if (n >= line.length) {
    return Number(line);
  }

  let charArr = [];
  const lineArr = line.split("");

  let start = 0;
  let end = line.length - n + 1;

  while (charArr.length < n) {
    let currInd = findMaxInWindow(lineArr, start, end);
    charArr.push(lineArr[currInd]);
    start = currInd + 1;
    end += 1;
  }

  return Number(charArr.join(""));
}

function findMaxInWindow(lineArr, start, end) {
  let maxInd = start;
  for (let i = start + 1; i < end; i++) {
    if (lineArr[i] > lineArr[maxInd]) {
      maxInd = i;
    }
  }
  return maxInd;
}

function main() {
  const input = readInput();

  console.log('=== Advent of Code Solver ===\n');

  const answer1 = part1(input);
  console.log('Answer:', answer1);
  console.log();

  const answer2 = part2(input);
  console.log('Answer:', answer2);
}

main();

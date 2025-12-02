import { readFileSync } from 'fs';

function readInput(filename = 'day02/input.txt') {
  return readFileSync(filename, 'utf-8').trim();
}

function part1(input) {
  const pairs = input.split(',');
  console.log('Part 1:');
  let sum = 0;
  for (let pair of pairs) {
    let nums = pair.split('-');
    let invIDsum = analyzePair(nums[0], nums[1]);
    sum += invIDsum;
  }
  return sum;
}

function analyzePair(num1, num2) {
  let half;
  if (num1.length % 2 == 0) {
    half = num1.substring(0, Math.floor(num1.length / 2));
  } else {
    half = Math.pow(10, Math.floor(num1.length / 2));
  }
  let doubleHalf = "" + half + half;
  let sum = 0;
  if (Number(doubleHalf) < Number(num1)) {
    half = String(Number(half) + 1);
    doubleHalf = "" + half + half;
  }
  while (Number(doubleHalf) <= Number(num2)) {
    sum += Number(doubleHalf);
    half = String(Number(half) + 1);
    doubleHalf = "" + half + half;
  }
  return sum;
}

function part2(input) {
  const pairs = input.split(',');
  console.log('Part 2:');

  let sum = 0;
  for (let pair of pairs) {
    let nums = pair.split('-');
    let invIDsum = analyzePairNewRules(nums[0], nums[1]);
    sum += invIDsum;
  }
  return sum;

}

function analyzePairNewRules(num1, num2) {
  let minBase = 2;
  let maxBase = num2.length;

  let resSet = new Set();
  for (let base = minBase; base <= maxBase; base++) {
    const resBase = analyzePairByN(num1, num2, base);
    resBase.forEach(el => resSet.add(el));
  }

  let sum = 0;
  for (let num of resSet) {
    sum += num;
  }
  
  return sum;
}

function analyzePairByN (num1, num2, base) {
    let chunk;
    if (num1.length % base == 0) {
      chunk = num1.substring(0, Math.floor(num1.length / base));
    } else {
      chunk = String(Math.pow(10, Math.floor(num1.length / base)));
    }
    let repChunk = chunk.repeat(base);
    const resSet = new Set();
    if (Number(repChunk) < Number(num1)) {
      chunk = String(Number(chunk) + 1);
      repChunk = chunk.repeat(base);
    }
    while (Number(repChunk) <= Number(num2)) {
      resSet.add(Number(repChunk));
      chunk = String(Number(chunk) + 1);
      repChunk = chunk.repeat(base);
    }
    return resSet;
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

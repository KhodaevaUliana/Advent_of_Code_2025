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
  const lines = input.split('\n');

  console.log('Part 2:');


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

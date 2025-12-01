import { readFileSync } from 'fs';

function readInput(filename = 'day01/input.txt') {
  return readFileSync(filename, 'utf-8').trim();
}

function part1(input) {
  const lines = input.split('\n');
  console.log('Part 1:');
  console.log('Input has', lines.length, 'lines');

  let position = 50;
  const dialSize = 100;
  let zerosCounter = 0;
  
  for (let line of lines) {
    const [_, direction, amount] = line.match(/^([LR])(\d+)$/);
    if (direction == 'L') {
      position = (position - Number(amount) + dialSize) % dialSize;
    }
    if (direction == 'R') {
      position = (position + Number(amount) + dialSize) % dialSize;
    }

    if (position === 0) {
      zerosCounter++;
    }
    
    //console.log(position);
  }
  
  
  return zerosCounter;
}

function part2(input) {
  const lines = input.split('\n');
  
  console.log('Part 2:');
  console.log('Input has', lines.length, 'lines');
  
  return 0;
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

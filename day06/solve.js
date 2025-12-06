import { readFileSync } from 'fs';

function readInput(filename = 'day06/input.txt') {
  return readFileSync(filename, 'utf-8').trim();
}

function part1(input) {
  const grid = input.split('\n');
  console.log('Part 1:');
  const signs = grid[grid.length - 1].trim().split(/\s+/);
  const numbers = readOffNumbers(grid);
  let sum = 0;
  
  for (let i = 0; i < signs.length; i++) {
    let res;
    if (signs[i] === '+') {
      res = 0;
      for (let j = 0; j < numbers.length; j++) {
        res += numbers[j][i];
      }
    }

    if (signs[i] === '*') {
      res = 1;
      for (let j = 0; j < numbers.length; j++) {
        res *= numbers[j][i];
      }
    }
    sum += res;
  }

  return sum;


}

function readOffNumbers(grid) {
  const res = [];

  for (let i = 0; i < grid.length - 1; i++) {
    res.push(grid[i].trim().split(/\s+/).map(el => Number(el)));
  }

  return res;
}


function part2(input) {
  const grid = input.split('\n');
  
  console.log('Part 2:');

  const signs = grid[grid.length - 1].trim().split(/\s+/);
  const problems = readOffProblemsVertically(grid);
  //console.log(problems);

  let sum = 0;

  for (let i = 0; i < signs.length; i++) {
    let res;
    if (signs[i] === '+') {
      res = 0;
      for (let j = 0; j < problems[i].length; j++) {
        res += problems[i][j];
      }
    }

    if (signs[i] === '*') {
      res = 1;
      for (let j = 0; j < problems[i].length; j++) {
        res *= problems[i][j];
      }
    }
    sum += res;
  }

  return sum;
  

}

function readOffProblemsVertically(grid) {
  const problems = [];
  let currProblem = [];
  for (let i = 0; i < grid[0].length; i++) {
    const currNumber = [];
    for (let j = 0; j < grid.length - 1; j++) {
      if (grid[j][i] != ' ') {
        currNumber.push(grid[j][i]);
      }
    }
    if (currNumber.length === 0) {
      problems.push(currProblem);
      currProblem = [];
    } else {
      currProblem.push(Number(currNumber.join("")));
    }
  }
  problems.push(currProblem);
  return problems;
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

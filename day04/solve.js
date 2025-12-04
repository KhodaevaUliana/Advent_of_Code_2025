import { readFileSync } from 'fs';

function readInput(filename = 'day04/input.txt') {
  return readFileSync(filename, 'utf-8').trim();
}

function part1(input) {
  const grid = input.split('\n');
  console.log('Part 1:');

  let accessible = 0;
  
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === '@' && countNeighbours(grid, i, j) < 4) {
        accessible++;
      }
    }
  }

  return accessible;


}

function countNeighbours(grid, row, column) {
  let cnt = 0;
  
  if (row > 0) {
    if (grid[row - 1][column] === '@') {
      cnt++;
    }
    if (column > 0 && grid[row - 1][column - 1] === '@') {
      cnt++;
    }
    if (column < grid[0].length - 1 && grid[row - 1][column + 1] === '@') {
      cnt++;
    }
  }
  
  if (column > 0 && grid[row][column - 1] === '@') {
    cnt++;
  }
  
  if (column < grid[0].length - 1 && grid[row][column + 1] == '@') {
    cnt++;
  }

  if (row < grid.length - 1) {
    if (grid[row + 1][column] === '@') {
      cnt++;
    }
    if (column > 0 && grid[row + 1][column - 1] === '@') {
      cnt++;
    }
    if (column < grid[0].length - 1 && grid[row + 1][column + 1] == '@') {
      cnt++;
    }
  }

  return cnt;
  
}



function part2(input) {
  const grid = input.split('\n');
  const gridArr = [];
  for (let line of grid) {
    gridArr.push(line.split(""));
  }

  console.log('Part 2:');

  let accessible = 0;

  let removedThisTurn = 0;

  do {
    removedThisTurn = 0;
    for (let i = 0; i < gridArr.length; i++) {
      for (let j = 0; j < gridArr[0].length; j++) {
        if (gridArr[i][j] === '@' && countNeighbours(gridArr, i, j) < 4) {
          accessible++;
          removedThisTurn++;
          gridArr[i][j] = 'x';
        }
      }
    }
  } while (removedThisTurn > 0);

 
  return accessible;


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

import { readFileSync } from 'fs';

function readInput(filename = 'day07/input.txt') {
  return readFileSync(filename, 'utf-8').trim();
}

function part1(input) {
  const grid = input.split('\n');
  console.log('Part 1:');

  const[startRow, startCol] = findStart(grid);
  let beams = new Set();
  beams.add(startCol);

  let numSplits = 0;

  for (let row = startRow + 1; row < grid.length; row++) {
    let nextBeams = new Set();
    for (let col = 0; col < grid[0].length; col++) {
      if (beams.has(col)) {
        if (grid[row][col] === '^') {
          numSplits++;
          if (col > 0) {
            nextBeams.add(col - 1);
          }
          if (col < grid[0].length - 1) {
            nextBeams.add(col + 1);
          }
        } else {
          nextBeams.add(col);
        }
      }     
    }

    beams = nextBeams;
  }

  return numSplits;


}


function findStart(grid) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === 'S') {
        return [i, j];
      }
    }
  }

  return [-1, -1];
}

function part2(input) {
  const grid = input.split('\n');

  console.log('Part 2:');

  const[startRow, startCol] = findStart(grid);
  let beams = new Set();
  let beamReps = new Map();
  beams.add(startCol);
  beamReps.set(startCol, 1);

  for (let row = startRow + 1; row < grid.length; row++) {
    const nextBeams = new Set();
    const nextBeamReps = new Map();
    for (let col = 0; col < grid[0].length; col++) {
      if (beams.has(col)) {
        if (grid[row][col] === '^') {
          if (col > 0) {
            if (nextBeams.has(col - 1)) {
              nextBeamReps.set((col - 1), nextBeamReps.get(col - 1) + beamReps.get(col));
            } else {
              nextBeams.add(col - 1);
              nextBeamReps.set((col - 1), beamReps.get(col));
            }
          }
          if (col < grid[0].length - 1) {
            if (nextBeams.has(col + 1)) {
              nextBeamReps.set((col + 1), nextBeamReps.get(col + 1) + beamReps.get(col));
            } else {
              nextBeams.add(col + 1);
              nextBeamReps.set((col + 1), beamReps.get(col));
            }
          }
        } else {
          if (nextBeams.has(col)) {
            nextBeamReps.set(col, nextBeamReps.get(col) + beamReps.get(col));
          } else {
            nextBeams.add(col);
            nextBeamReps.set(col, beamReps.get(col));
          }
        }
      }     
    }

    beams = nextBeams;
    beamReps = nextBeamReps;
  }

  let cnt = 0;

  for (let beam of beams) {
    cnt += beamReps.get(beam);
  }

  return cnt;


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

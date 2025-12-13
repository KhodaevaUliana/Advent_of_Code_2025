import { readFileSync } from 'fs';

function readInput(filename = 'day12/input.txt') {
  return readFileSync(filename, 'utf-8').trim();
}

function part1(input) {
  const lines = input.split('\n');
  console.log('Part 1:');
  const [tasks, taskForNum] = readOffTasks(lines);

  
  let cnt = 0;
  
  const areas = [5, 7, 7, 6, 7, 7]; //areas of each piece
  
  for (let taskNum = 0; taskNum < tasks.length; taskNum++) {
    const dims = tasks[taskNum].split("x").map(el => Number(el));
    const area = dims[0] * dims[1];
    const presents = taskForNum.get(taskNum);
    let lowestBoundary = 0;
    //add to lowest boundary the area of every piece

    for (let i = 0; i < presents.length; i++) {
      lowestBoundary += areas[i] * presents[i];
    }
    if (area < lowestBoundary) {
      //we can't fit the pieces because their total area is larger than that of the tree
      continue;
    }
    let highestBoundary = 0;
     //the highest boundary for evert piece is 9 (it fits in 3 X 3 square), except 0, 3 and 5: if we rotate them, we can fit them in a way that every pair takes only 12 (for 0 and 3) or 16 (for 5) 
    for (let i = 0; i < presents.length; i++) {
      if (i === 0) {
        highestBoundary += 6 * presents[i]; //for 0, even if the num of pieces is odd, the rest fits in taking only 6 extra tiles
      } else if (i === 3) {
        highestBoundary += 6 * presents[i];
        if (presents[i] % 2 == 1) {
          highestBoundary += 3; //if presents[i] is odd for this type, the last piece takes 3 X 3
        }
      } else if (i === 5) {
        highestBoundary += 8 * presents[i];
        if (presents[i] % 2 == 1) {
          highestBoundary += 1; //if presents[i] is odd for this type, the last piece takes 3 X 3
        }
      } else {
        highestBoundary += 9 * presents[i];
      }
    }

    if (highestBoundary > area) {
      console.log("Complicated!") //turns out we never output this!!!
    } else {
      cnt++;
    }
    
  }
  return cnt;
}

function readOffTasks(lines) {
  const re = /^(\d+x\d+):(\s+(\d+))+/;
  let ind = 0;

  //skip the shaped for now
  while (!lines[ind].match(re)) {
    ind++;
  }
  let start = ind;

  const taskNums = [];
  const taskForNum = new Map();

  let taskNum = 0;

  for (let i = start; i < lines.length; i++) {
    const [head, nums] = lines[i].split(":");
    const numArr = nums.trim().split(/\s+/).map(el => Number(el));
    taskNums.push(head);
    taskForNum.set(taskNum, numArr);
    taskNum++;
  }

  return [taskNums, taskForNum];
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

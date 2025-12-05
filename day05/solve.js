import { readFileSync } from 'fs';

function readInput(filename = 'day05/input.txt') {
  return readFileSync(filename, 'utf-8').trim();
}

function part1(input) {
  const [ranges, nums] = processInput(input);

  
  console.log('Part 1:');

  //merge intervals and sort their starts
  const[mergedRanges, rangeStarts] = mergeAndSortIntervals(ranges);
  
  let cntFresh = 0;

  for (let num of nums) {
    let ind = binarySearch(rangeStarts, num);
    //console.log(ind);
    if (ind != -1) {
      if (mergedRanges.get(rangeStarts[ind]) >= num) {
        cntFresh++;
      }
    } 
    
  }
  
  return cntFresh;
}

function mergeAndSortIntervals(ranges) {
  
  const rangeStarts = Array.from(ranges.keys()).sort((a, b) => a - b);
  const mergedRanges = new Map();
  const mergedStarts = [];

  let currStart = rangeStarts[0];
  let currEnd = ranges.get(rangeStarts[0]);

  for (let start of rangeStarts) {
    if (start <= currEnd) {
      if (ranges.get(start) > currEnd) {
        currEnd = ranges.get(start);
      }
    } else {
      mergedStarts.push(currStart);
      mergedRanges.set(currStart, currEnd);
      
      currStart = start;
      currEnd = ranges.get(start);
    }
  }

  mergedStarts.push(currStart);
  mergedRanges.set(currStart, currEnd);

  return[mergedRanges, mergedStarts];
  
}

function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  if (target < arr[0]) {
    return -1;
  }
  
  while (right - left > 1) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) {
      return mid;
    }
    if (arr[mid] < target) {
      left = mid;
    } else {
      right = mid;
    }
  }

  if (arr[right] <= target) {
    return right;
  } else {
    return left;
  }
}



function processInput(input) {
  const lines = input.split('\n');
  //read off ranges until the blank line
  const ranges = new Map();
  let line = lines[0];
  let ind = 0;
  while (line && line.trim() !== "") {
    const [num1, num2] = line.split("-");
    if (!ranges.has(Number(num1)) || ranges.get(Number(num1)) < Number(num2)) {
      ranges.set(Number(num1), Number(num2));
    }
    ind++;
    line = lines[ind];
  }
  //move past the blank line
  ind++;
  line = lines[ind];
  //read off numbers
  const nums = [];
  while (ind < lines.length) {
    const val = lines[ind].trim();
    if (val !== "") nums.push(Number(val));
    ind++;
  }
  return [ranges, nums];
}




function part2(input) {
  //we don't need the 2nd part of the input now! Too lazy to rewrite the script tho
  const ranges = processInput(input)[0];
  
  console.log('Part 2:');

  //merge intervals and sort their starts
  const mergedRanges = mergeAndSortIntervals(ranges)[0];

  let cnt = 0;
  
  for (let start of mergedRanges.keys()) {
    cnt += mergedRanges.get(start) - start + 1;
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

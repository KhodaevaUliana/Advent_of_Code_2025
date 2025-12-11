import { readFileSync } from 'fs';
import { isBoxedPrimitive } from 'util/types';

function readInput(filename = 'day10/input.txt') {
  return readFileSync(filename, 'utf-8').trim();
}

function part1(input) {
  const lines = input.split('\n');
  console.log('Part 1:');

  let sum = 0;

  for (let line of lines) {
    const [state, buttons] = readOffLine(line);
    let numSwitch = solver(state, buttons);
    sum += numSwitch;
  }

  return sum;

}

function solver(state, buttons) {
  let curr = "0".repeat(state.length);
  let numSets = 2**(buttons.length);
  let minSwitch = Infinity;
  
  for (let mask = 1; mask < numSets; mask++) {
    let switchCnt = 0;
    let bin = mask.toString(2);
    if (bin.length < buttons.length) {
      bin = "0".repeat(buttons.length - bin.length) + bin;
    }
    
    for (let i = 0; i < bin.length; i++) {
      if (bin[i] === '1') {
        curr = xorBin(curr, buttons[i]);
        switchCnt++;
      }
    }
    if (curr === state) {
     
      if (switchCnt < minSwitch) {
        minSwitch = switchCnt;
      }
    }
  }
  return minSwitch;
  
}



function xorBin(a, b) {
  let res = "";
  for (let i = 0; i < a.length; i++) {
    res += (a[i] ^ b[i]); 
  }
  return res;
}


function readOffLine(line) {
  const regex = /^(\[[#.]+\])\s*((?:\([^)]*\)\s*)+)/;
  const [_, stateStr, buttonString] = String(line).match(regex);

  const stateArr = [];
  for (let i = 1; i < stateStr.length - 1; i++) {
    if (stateStr[i] === '#') {
      stateArr.push(1);
    } else {
      stateArr.push(0);
    }
  }

  const state = stateArr.join("");

  const buttonsStrArr = buttonString.split(/\s+/);

  const buttons = [];

  for (let buttonStr of buttonsStrArr) {
    const buttonSet = new Set();
    if (buttonStr.length != 0) {
      buttonStr = buttonStr.substring(1, buttonStr.length - 1);
      buttonStr.split(",").forEach(el => buttonSet.add(Number(el)));
    }
    const button = [];
    for (let i = 0; i < state.length; i++) {
      if (buttonSet.has(i)) {
        button.push(1);
      } else {
        button.push(0);
      }
    }
    buttons.push(button.join(""));
  }
  return [state, buttons];
}





function part2(input) {
  const lines= input.split('\n');

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

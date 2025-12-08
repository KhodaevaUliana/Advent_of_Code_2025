import { readFileSync } from 'fs';
import { isBoxedPrimitive } from 'util/types';

function readInput(filename = 'day08/input.txt') {
  return readFileSync(filename, 'utf-8').trim();
}

function part1(input) {
  const lines = input.split('\n');
  console.log('Part 1:');

  const boxes = readOffBoxes(lines);
  const dist = pairDistances(boxes);
  const pairsSort = Array.from(dist.keys()).sort((a, b) => dist.get(a) - dist.get(b));

  const numConnections = 1000;

  const circuits = [];
  

 

  for (let i = 0; i < numConnections; i++) {
    const pair = pairsSort[i];
    let indFirst = findBoxInCircuits(circuits, pair[0]);
    let indSecond = findBoxInCircuits(circuits, pair[1]);
    if (indFirst != -1) {
      if (indSecond != -1) {
        if (indFirst != indSecond) {
          circuits[indSecond].forEach(el => circuits[indFirst].add(el));
          circuits.splice(indSecond, 1);
        }
      } else {
        circuits[indFirst].add(pair[1]);
      }
      continue;
    }
    if (indSecond != -1) {
      circuits[indSecond].add(pair[0]);
      continue;
    }

    const newSet = new Set();
    newSet.add(pair[0]);
    newSet.add(pair[1]);
    circuits.push(newSet);
    
  }


  circuits.sort((s1, s2) => s2.size - s1.size);

  /*console.log(circuits[0]);
  console.log(circuits[1]);
  console.log(circuits[2]);*/
  return circuits[0].size * circuits[1].size * circuits[2].size;
  


}

function findBoxInCircuits(circuits, boxInd) {
  for (let i = 0; i < circuits.length; i++) {
    if (circuits[i].has(boxInd)) {
      return i;
    }
  }
  return -1;
}

function readOffBoxes(lines) {
  const boxes = new Map();
  let ind = 0;
  for (let line of lines) {
    boxes.set(ind, line.split(",").map(el => Number(el)));
    ind++;
  }
  return boxes;
}

function pairDistances(boxes) {
  const dist = new Map();
  for (let i = 0; i < boxes.size; i++) {
    for (let j = i + 1; j < boxes.size; j++) {
      dist.set([i, j], boxDist(boxes.get(i), boxes.get(j)));
    }
  }
  return dist;
}

function boxDist(box1, box2) {
  return (box1[0] - box2[0])**2 + (box1[1] - box2[1])**2 + (box1[2] - box2[2])**2;
}

function part2(input) {
  const lines= input.split('\n');

  const boxes = readOffBoxes(lines);
  const dist = pairDistances(boxes);
  const pairsSort = Array.from(dist.keys()).sort((a, b) => dist.get(a) - dist.get(b));


  const circuits = [];


  let i = 0;

  

  while (circuits.length === 0 || circuits.length > 1 || (circuits.length === 1 && circuits[0].size < boxes.size)){
    const pair = pairsSort[i];
    i++;
    let indFirst = findBoxInCircuits(circuits, pair[0]);
    let indSecond = findBoxInCircuits(circuits, pair[1]);
    if (indFirst != -1) {
      if (indSecond != -1) {
        if (indFirst != indSecond) {
          if (indFirst < indSecond) {
            circuits[indSecond].forEach(el => circuits[indFirst].add(el));
            circuits.splice(indSecond, 1);
          } else {
            circuits[indFirst].forEach(el => circuits[indSecond].add(el));
            circuits.splice(indFirst, 1);
          }
        }
      } else {
        circuits[indFirst].add(pair[1]);
      }
      continue;
    }
    if (indSecond != -1) {
      circuits[indSecond].add(pair[0]);
      continue;
    }

    const newSet = new Set();
    newSet.add(pair[0]);
    newSet.add(pair[1]);
    circuits.push(newSet);

   

  }
  
  console.log('Part 2:');
  return boxes.get(pairsSort[i - 1][0])[0] *  boxes.get(pairsSort[i - 1][1])[0];
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

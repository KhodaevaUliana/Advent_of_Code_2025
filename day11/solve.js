import { readFileSync } from 'fs';

function readInput(filename = 'day11/input.txt') {
  return readFileSync(filename, 'utf-8').trim();
}

function part1(input) {
  const lines = input.split('\n');
  console.log('Part 1:');

  const adjList = readOffInput(lines);
  //console.log(adjList);

  return countWays("you", adjList);
  

}

function countWays(currNode, adjList) {
  let cnt = 0;

  if (adjList.get(currNode).indexOf("out") !== -1) {
    return 1;
  } else {
    for (let node of adjList.get(currNode)) {
      cnt += countWays(node, adjList);
    }
  }
  return cnt;
}



function countWaysToDest(currNode, dest, adjList, cache) {
  //well, there are cycles!!!!
  if (cache.has(currNode)) return cache.get(currNode);
  
  let cnt = 0;

  if (currNode == dest) {
    //return visitedPath.has("fft") && visitedPath.has("dac") ? 1 : 0;
    return 1;
  }
  if (currNode == "out") {
    return 0;
  }

  for (let next of adjList.get(currNode) || []) {
    cnt += countWaysToDest(next, dest, adjList, cache);
  }
  cache.set(currNode, cnt);

  return cnt;
}

function findSCC(adjList) { //strongly connected components
  
}

function readOffInput(lines) {
  const adjList = new Map();

  for (let line of lines) {
    const nodesArr = line.split(" ");
    let head = nodesArr.shift();
    head = head.substring(0, head.length - 1);
    adjList.set(head, nodesArr);
  }

  return adjList;
}

function part2(input) {
  const lines = input.split('\n');

  console.log('Part 2:');

  const adjList = readOffInput(lines);
 

  let cntFftDac = countWaysToDest("fft", "dac", adjList, new Map());
  let cntDacFft = countWaysToDest("dac", "fft", adjList, new Map());

  let cnt = 0;

  if (cntFftDac > 0) {
    cnt += countWaysToDest("svr", "fft", adjList, new Map()) * cntFftDac *
      countWaysToDest("dac", "out", adjList, new Map());
  }

  if (cntDacFft > 0) {
    cnt += countWaysToDest("svr", "dac", adjList, new Map()) * cntDacFft *
      countWaysToDest("fft", "out", adjList, new Map());
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

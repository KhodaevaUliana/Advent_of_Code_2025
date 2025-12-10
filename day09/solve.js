import { readFileSync } from 'fs';

function readInput(filename = 'day09/input.txt') {
  return readFileSync(filename, 'utf-8').trim();
}

function part1(input) {
  const lines = input.split('\n');
  console.log('Part 1:');

  const points = readOffPoints(lines);

  let maxArea = -Infinity;

  for (let i = 0; i < points.length; i++) {
    for (let j = 0; j < points.length; j++) {
      let area = Math.abs((points[j][0] - points[i][0] + 1) * (points[j][1] - points[i][1] + 1));
      if (area > maxArea) {
        maxArea = area;
      }
    }
  }

  return maxArea;


}

function readOffPoints(lines) {
  const res = [];

  for (let line of lines) {
    res.push(line.split(",").map(el => Number(el)));
  }

  return res;
}


function part2(input) {
  const lines = input.split('\n');

  console.log('Part 2:');

  let points = readOffPoints(lines);
  
  const [horizOffset, vertOffset, maxHoriz, maxVert] = findMins(points);
  

  const pointsShifted = [];

  points.forEach(el => pointsShifted.push([el[0] - horizOffset, el[1] - vertOffset]));

  points = pointsShifted;

  const boundary = findBoundary(points);

  const mask = [];
  console.log(maxHoriz + " " + maxVert);

  for (let i = 0; i <= maxHoriz; i++) {
    const row = [];
    for (let j = 0; j <= maxVert; j++) {
      if (boundary.has(i + "," + j)) {
        row.push(1);
      } else {
        row.push(0);
      }
    }
    mask.push(row);
    //mask.push(row.join(""));
  }
  //mask.forEach(row => console.log(row));
  const filledMask = fillMask(mask, points);

  //filledMask.forEach(row => {const joined = row.join(""); console.log(joined)});

  //not every rectangle works here!!! They must be inside!!!!
  const heights = maskHystograms(mask);
  console.log();
  //heights.forEach(row => {const joined = row.join(","); console.log(joined)});
  console.log();
  let maxArea = -Infinity;

  points.sort((p1, p2) => {
    if (p1[0] === p2[0]) {
      return (p1[1] - p2[1]);
    } else {
      return (p1[0] - p2[0]);
    }
  });

  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      let area = (points[j][0] - points[i][0] + 1) * (points[j][1] - points[i][1] + 1);
      if (area > maxArea && checkRect(points[i], points[j], heights)) {
        maxArea = area;
      }
    }
  }

  return maxArea;
   
}

function checkRect(p1, p2, heights) {
  const height = p2[0] - p1[0] + 1;
  const row = p2[0];
  for (let col = p1[1]; col <= p2[1]; col++) {
    if (heights[row][col] < height) {
      return false;
    }
  }
  return true;
}

function maskHystograms(mask) {
  const heightsAll = [];
  
  let heights = new Array(mask[0].length).fill(0);

  for (let row = 0; row < mask.length; row++) {
    const newHeights = new Array(mask[0].length).fill(0);
    for (let col = 0; col < mask[0].length; col++) {
      newHeights[col] = (mask[row][col] === 1) ? (heights[col] + 1) : 0;
    }
    heights = newHeights;
    heightsAll.push(heights);
    //console.log(heights);

  }

  return heightsAll;
}

/*function largestRectHystogram(heights) {
  const stack = [];
  let max = 0;

  for (let i = 0; i <= heights.length; i++) {
    //virtual last bar equal to 0
    const curHeight = (i === heights.length) ? 0 : heights[i];

    while (stack.length > 0 && curHeight < heights[stack[stack.length - 1]]) {
      //finalize the rectangle
      //its height
      const height = heights[stack.pop()];
      //where is the left border?
      const leftIndex = stack.length === 0 ? -1 : stack[stack.length - 1];
      const width = i - leftIndex - 1;
      const area = height * width;
      if (area > max) {
        max = area;
      }
      
    }
    stack.push(i);
    
  }
  return max;
}*/

function fillMask(mask, points) {
  for (let i = 0; i < mask.length; i++) {
    console.log(i);
    for (let j = 0; j < mask[0].length; j++) {
      if (mask[i][j] !== 1) {
        if (rayIntersection(i, j, points)) {
          mask[i][j] = 1;
        }
      }
    }
  }
  return mask;
}

//ray == vertical line (row, col) => +infty
function rayIntersection(row, col, points) {
  let intersections = 0;

  for (let i = 0; i < points.length; i++) {
    const p1 = points[i];
    const p2 = points[(i + 1) % points.length];

    if (p1[1] === p2[1]) {
      continue;
    }

    //check whether we can intersect columns
    if (!(p1[1] < col && p2[1] < col) && !(p1[1] > col && p2[1] > col)) {
      const rowIntersect = p1[0] + ((col - p1[1]) * (p2[0] - p1[0])) / (p2[1] - p1[1]);
      if (rowIntersect >= row) {
        intersections++;
      }
    }
  }

  return intersections % 2 === 1;
}


function findMins(points) {
  let minHoriz = Infinity;
  let minVert = Infinity;
  let maxHoriz = -Infinity;
  let maxVert = -Infinity;

  for (let i = 0; i < points.length; i++) {
    if (points[i][0] < minHoriz) {
      minHoriz = points[i][0];
    }
    if (points[i][1] < minVert) {
      minVert = points[i][1];
    }
    if (points[i][0] > maxHoriz) {
      maxHoriz = points[i][0];
    }
    if (points[i][1] > maxVert) {
      maxVert = points[i][1];
    }
  }

  return  [minHoriz, minVert, maxHoriz, maxVert];
  
}





function findBoundary(pointsOrig) {
  const points = [...pointsOrig];
  const boundary = new Set();

  boundary.add(points[0][0] + "," + points[0][1]);
  points.push(points[0]);
  

  for (let i = 1; i < points.length; i++) {
    if (points[i][0] === points[i - 1][0]) {
      //horizontal
      let currCol = points[i - 1][1];
      if (points[i][1] > points[i - 1][1]) {
        currCol++;
        while (currCol <= points[i][1]) {
          boundary.add(points[i][0] + "," + currCol);
          currCol++;
        }
      } else {
        currCol--;
        while (currCol >= points[i][1]) {
          boundary.add(points[i][0] + "," + currCol);
          currCol--;
        }
      }
    }
    if (points[i][1] === points[i - 1][1]) {
      //vertical
      let currRow = points[i - 1][0];
      if (points[i][0] > points[i - 1][0]) {
        currRow++;
        while (currRow <= points[i][0]) {
          boundary.add(currRow +"," + points[i][1]);
          currRow++;
        }
      } else {
        currRow--;
        while (currRow >= points[i][0]) {
          boundary.add(currRow +"," + points[i][1]);
          currRow--;
        }
      }
    }
  }
  return boundary;
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

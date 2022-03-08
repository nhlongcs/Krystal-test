/*
 - Process the raw data to get the gold map and robot's steps
 - Make the robot move on the map by steps data
 - Check Robot's positions, gold is collected on map if valid positions
*/

const input = `2 3
1 4 3
4 3 1
0 0
RRDUDLL`;

function parseStringArrayToNumber(strArray) {
  return strArray.map((value) => Number(value));
}

function parseInput(rawData) {
  const dataRows = rawData.split("\n");

  const mapSize = dataRows[0].split(" ");
  const map = dataRows
    .slice(1, dataRows.length - 2)
    .map((row) => parseStringArrayToNumber(row.split(" ")));
  const [x, y] = parseStringArrayToNumber(
    dataRows[dataRows.length - 2].split(" ")
  );
  const steps = dataRows[dataRows.length - 1].split("").map((step) => {
    switch (step) {
      case "R":
        return [0, 1];
      case "L":
        return [0, -1];
      case "U":
        return [-1, 0];
      case "D":
        return [1, 0];
      default:
        throw Error("Invalid steps data");
    }
  });

  return {
    mapSize: parseStringArrayToNumber(mapSize),
    map,
    x,
    y,
    steps,
  };
}

function validateCordinates(x, y, mapSize) {
  if (x < 0 || x > mapSize[0] - 1) {
    return false;
  }

  if (y < 0 || y > mapSize[1] - 1) {
    return false;
  }

  return true;
}

function main() {
  let { mapSize, map, x, y, steps } = parseInput(input);

  let goldCollectedAmount = map[x][y];

  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    x += step[0];
    y += step[1];

    if (!validateCordinates(x, y, mapSize)) {
      goldCollectedAmount = 0;
      break;
    }

    goldCollectedAmount += map[x][y];
    map[x][y] = 0;
  }

  return goldCollectedAmount;
}

console.log(main());

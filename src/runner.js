import fs from "fs";

//import rm_dupe_move from "./rm_dupe_move.js";
import move from "./move.js";
import validator from "./validator.js";
import Position from "./position.js";
import dfs from "./dfs.js";

/**
 * Given a mine, runs the miner through the mine collecting gold along the way.
 *
 * @param  {array} mine - A n x m multidimensional array respresenting the mine.
 * @param  {string} logFile - A file location where moves of the miner should be logged to.
 * @param  {Number} yStart - The y dimension starting position for the miner.
 *
 * @return {Number} The total gold collected by the miner.
 */
const run = async (mine, logFile, yStart = 0) => {
  if (!mine) throw new Error("a mine is required");
  if (!logFile) throw new Error("a logFile is required");

  let finalScore = 0;
  let position = new Position(0, 0);
  let maxIndex = 0;
  let paths = Array();
  let mineTracking = new Array();

  for (let i = 0; i < mine.length; i++) {
    let row = new Array();
    for (let j = 0; j < mine[0].length; j++) {
      row.push(new Set());
    }
    mineTracking.push(row);
  }

  let testPaths = Array();
  for (let i = 0; i < mine.length; i++) {
    let position = new Position(0, i);
    let testPath = Array();
    await dfs(mine, position, mineTracking, true, true, true, testPath, testPaths);
  }
  
  console.log(mine);
  console.log(mineTracking);
  console.log(testPaths);


  for (var i = 0; i < mine.length; i++) {
    let currentX = 0;
    position = new Position(0, i);
    let score = 0;
    let path = Array();
    path.push(position);

    while (position.x < mine[0].length - 1 && position.isValid(mine)) {

      if (position.x !== currentX) {
        throw new Error(
          `Current position must be at x === ${currentX}, not ${position}`
        );
      }
      
      position = await move(mine, position);
      path.push(position);
      
      currentX = path.length - 1;
      
      if (!position.isValid(mine) || mine[position.y][position.x] === 0) {
        break;
      }
  
    }

    for (var j = 0; j < path.length; j++) {
      score += mine[path[j].y][path[j].x];
    }

    if (score > finalScore) {
      maxIndex = i;
    }
    finalScore = Math.max(score, finalScore);
    paths.push(path);
  }

  for (var i = 0; i < paths[maxIndex].length; i++) {
    log(logFile, paths[maxIndex][i]);
  }

  return finalScore;
};

/**
 * Logs the miner's current position to a log file. This file is used for validation
 * of all moves in the run.
 *
 * @param  {string} logFile - A file location where the given position should be logged to.
 * @param  {Object} position - The current location of the miner.
 *
 * @return {undefined}
 */
const log = (logFile, position) => {
  fs.appendFileSync(logFile, `${position.toString()}\n`);
};

export default {
  run
};

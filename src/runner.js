import fs from "fs";

import move from "./move.js";
import Position from "./position.js";

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

  let noneZeroTrace = new Array();
  for (var i = 0; i < mine.length; i++) {
    let noneZeroRows = new Array();
    for (var j = 0; j < mine[0].length; j++) {
      if (mine[i][j] != 0) {
        let noneZeroPos = new Position(i, j);
        noneZeroRows.push(noneZeroPos.toString());
      }
      else {
        noneZeroRows.push('End');
      }
    }
    noneZeroTrace.push(noneZeroRows);
  }

  console.log(noneZeroTrace);

  for (var i = 0; i < mine.length; i++) {
    let currentX = 0;
    position = new Position(0, i);
    let score = 0;
    let path = Array();
    path.push(position);
    let rightFlag = true;
    let rightUpFlag = true;
    let rightDownFlag = true;

    while (position.x < mine[0].length - 1 && position.isValid(mine)) {

      if (position.x !== currentX) {
        throw new Error(
          `Current position must be at x === ${currentX}, not ${position}`
        );
      }

      let currentPos = position;
      
      position = await move(mine, position, rightFlag, rightUpFlag, rightDownFlag);

      if (typeof mine[position.y] === 'undefined' || typeof mine[position.y][position.x] === 'undefined') {
        break;
      }
      
      /*if (!position.isValid(mine) || mine[position.y][position.x] === 0) {
        break;
      }*/

      if ((position.y - currentPos.y) === 0) {
        rightFlag = false;
        rightUpFlag = true;
        rightDownFlag = true;
      }
      if ((position.y - currentPos.y) === 1) {
        rightFlag = true;
        rightUpFlag = true;
        rightDownFlag = false;
      }
      if ((position.y - currentPos.y) === -1) {
        rightFlag = true;
        rightUpFlag = false;
        rightDownFlag = true;
      }
      path.push(position);
      currentX = path.length - 1;
  
    }

    for (var j = 0; j < path.length; j++) {
      if (mine[path[j].y][path[j].x] === 0) {
        break;
      }
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
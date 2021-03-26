import Position from "./position.js";

/**
 * Replace the logic in this function with your own custom movement algorithm.
 *
 * This function should run in a reasonable amount of time and should attempt
 * to collect as much gold as possible.
 *
 * Remember, landing outside the mine's boundary or on a "0" on the mine will
 * result in the run completing.
 *
 * @param  {array} mine - A n x m multidimensional array respresenting the mine.
 * @param  {object} position - The current position of the miner, will be undefined on the first move
 *
 * @return {Position} The new position of the miner.
 */
const move = (mine, position, rightFlag, rightUpFlag, rightDownFlag) => {
  // Greedy Algorithm
  let newX = (position && position.x + 1) || 0;
  let currMax = 0;

  let rightVal;
  let rightUpVal;
  let rightDownVal;
  let rightPos = new Position(newX, position.y);
  let rightUpPos = new Position(newX, position.y - 1);
  let rightDownPos = new Position(newX, position.y + 1);

  if (rightPos.isValid(mine) && rightFlag) {
    rightVal = mine[rightPos.y][rightPos.x];
    currMax = Math.max(rightVal, currMax);
  }
  if (rightUpPos.isValid(mine) && rightUpFlag) {
    rightUpVal = mine[rightUpPos.y][rightUpPos.x];
    currMax = Math.max(rightUpVal, currMax);
  }
  if (rightDownPos.isValid(mine) && rightDownFlag) {
    rightDownVal = mine[rightDownPos.y][rightDownPos.x];
    currMax = Math.max(rightDownVal, currMax);
  }

  if (currMax === rightDownVal) {
    return rightDownPos;
  }
  if (currMax === rightUpVal) {
    return rightUpPos
  }
  if (currMax === rightVal) {
    return rightPos;
  }
  else {
    if (rightDownFlag && newX < mine[0].length && rightDownPos.y < mine.length && rightDownPos.y >= 0) {
      return rightDownPos;
    }
    if (rightUpFlag && newX < mine[0].length && rightUpPos.y < mine.length && rightUpPos.y >= 0) {
      return rightUpPos;
    }
    if (rightFlag && newX < mine[0].length && rightPos.y < mine.length && rightPos.y >= 0) {
      return rightPos;
    }
  }



};

export default move;
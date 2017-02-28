/*
const board = [
  [1,0,],
  [,,],
  [,,]
]
*/

const move = (space, player, board) => {
  // returns board with new piece in place

  /*
    STATE
    board (spaces, counter),
    whose turn
    names of players
    state of play: waiting to start, playing, draw, win ( + winner)
  */
}

const isSpaceFree = (space, board) => {
  const [y, x] = space.split(":");
  return board[y][x] === undefined;
}

const threeInALine = (line, counter) =>
  line.filter(elt => elt !== undefined).length === 3 && line.every(elt => elt === counter);

const getCols = board => {
  const col0 = [ board[0][0], board[1][0], board[2][0], ];
  const col1 = [ board[0][1], board[1][1], board[2][1], ];
  const col2 = [ board[0][2], board[1][2], board[2][2], ];
  return [ col0, col1, col2, ];
}

const getDiagonals = board => {
  const d1 = [ board[0][0], board[1][1], board[2][2], ];
  const d2 = [ board[0][2], board[1][1], board[2][0], ];
  return [d1, d2];
}

const getAllLines = board => {
  return board
    .concat(getCols(board))
      .concat(getDiagonals(board));
};

const findLine = (board, counter) => {
  const map = [
    // rows
    ["0:0", "0:1", "0:2"], ["1:0", "1:1", "1:2"], ["2:0", "2:1", "2:2"],

    // cols
    ["0:0", "1:0", "2:0"], ["0:1", "1:1", "2:1"], ["0:2", "1:2", "2:2"],

    // diagonals
    ["0:0", "1:1", "2:2"], ["0:2", "1:1", "2:0"],
  ];
  const index = getAllLines(board)
    .findIndex((line, index) => threeInALine(line, counter));
  if (index > -1) {
    return {
      line: map[index],
      winner: counter,
    }
  } else {
    return null;
  }
}

const eval = (board) => {

};

module.exports = {
  isSpaceFree: isSpaceFree,
  threeInALine: threeInALine,
  getCols: getCols,
  getDiagonals: getDiagonals,
  getAllLines: getAllLines,
  findLine: findLine,
};

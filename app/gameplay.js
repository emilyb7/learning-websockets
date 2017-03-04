const move = (space, user, player, round, board) => {
  const [y, x] = space.split(":");
  if (board[y][x] === undefined && user === player && round !== null) {
    const newBoard = updateBoard(space, player, board);
    const outcome = findLine(player, round, newBoard);
    const nextPlayer = outcome === null
      ? player === 0 ? 1 : 0
      : null;
    const result = {
      board: newBoard,
      player: nextPlayer,
      round: outcome === null ? round + 1 : null,
      win: outcome,
      success: true,
    }
    if (result.win !== null) {
      if (result.win.win === 1) {
        console.log(`player ${result.win.winner} wins`);
      } else {
        console.log("it's a draw!");
      }
    }
    return result;
  } else {
    console.log("not your turn");
    return {
      success: false,
    }
  }
}

const updateBoard = (space, player, board) => {
  const [y, x] = space.split(":").map(n => parseInt(n));
  const row0 = y !== 0 ? board[0].slice(0) : board[0].slice(0, x).concat([player]).concat(board[0].slice(x + 1));
  const row1 = y !== 1 ? board[1].slice(0) : board[1].slice(0, x).concat([player]).concat(board[1].slice(x + 1));
  const row2 = y !== 2 ? board[2].slice(0) : board[2].slice(0, x).concat([player]).concat(board[2].slice(x + 1));
  return [row0, row1, row2];
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

const findLine = (player, round, board) => {
  const map = [
    // rows
    ["0:0", "0:1", "0:2"], ["1:0", "1:1", "1:2"], ["2:0", "2:1", "2:2"],

    // cols
    ["0:0", "1:0", "2:0"], ["0:1", "1:1", "2:1"], ["0:2", "1:2", "2:2"],

    // diagonals
    ["0:0", "1:1", "2:2"], ["0:2", "1:1", "2:0"],
  ];
  const index = getAllLines(board)
    .findIndex((line, index) => threeInALine(line, player));

  return index > -1
    ? { win: 1, line: map[index], winner: player, }
    : round === 8
      ? { win: 0, line: null, winner: null, }
      : null;
};

module.exports = {
  updateBoard: updateBoard,
  threeInALine: threeInALine,
  getCols: getCols,
  getDiagonals: getDiagonals,
  getAllLines: getAllLines,
  findLine: findLine,
  move: move,
};

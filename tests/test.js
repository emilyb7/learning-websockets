const test = require('tape');

const updateBoard = require('../app/gameplay.js').updateBoard;
const threeInALine = require('../app/gameplay.js').threeInALine;
const getCols = require('../app/gameplay.js').getCols;
const getDiagonals = require('../app/gameplay.js').getDiagonals;
const getAllLines = require('../app/gameplay.js').getAllLines;
const findLine = require('../app/gameplay.js').findLine;
const move = require('../app/gameplay.js').move;

test("move takes all variables from the game and updates the state", (t) => {
  // params: space, user, player, round, board
  const board1 = [[0,undefined,1],[undefined,undefined,undefined],[undefined,undefined,undefined]];
  const result1 = {
    board: [[0,undefined,1],[undefined,0,undefined],[undefined,undefined,undefined]],
    player: 1,
    round: 3,
    win: null,
    success: true,
  };
  t.deepEqual(move("1:1", 0, 0, 2, board1), result1);
  t.end();
})

test("updateBoard takes a space, player and an array representing the board, and returns the board with the player's piece in place", (t) => {
  const board1 = [[undefined,undefined,undefined],[undefined,undefined,undefined],[undefined,undefined,undefined]];
  t.deepEqual(updateBoard("0:0", 1, board1), [[1,undefined,undefined],[undefined,undefined,undefined],[undefined,undefined,undefined]] );

  const board2 = [[0,1,undefined],[undefined,undefined,undefined],[undefined,undefined,undefined]];
  t.deepEqual(updateBoard("0:2", 0, board2), [[0,1,0],[undefined,undefined,undefined],[undefined,undefined,undefined]] );

  const board3 = [[0,1,0],[0,1,undefined],[undefined,undefined,undefined]];
  t.deepEqual(updateBoard("1:2", 1, board3), [[0,1,0],[0,1,1],[undefined,undefined,undefined]] );

  const board4 = [[0,undefined,1],[undefined,undefined,undefined],[undefined,undefined,undefined]];
  t.deepEqual(updateBoard("1:1", 0, board4), [[0,undefined,1],[undefined,0,undefined],[undefined,undefined,undefined]]);

  t.end();
});

test("threeInALine takes a 3-element array and a value to check for, and returns true if all the elements are equal to the value", (t) => {
  t.equals(threeInALine([0, 0, 0], 0), true);
  t.equals(threeInALine([1, 1, 1], 0), false);
  t.equals(threeInALine([, 1, 1], 1), false);
  t.end();
});

test("getCols takes an array representing the board and returns a 2-d array representing the columns", (t) => {
  const board1 = [[undefined,undefined,undefined],[undefined,undefined,undefined],[undefined,undefined,undefined]];
  const board2 = [[1,1,1],[undefined,undefined,undefined],[undefined,undefined,undefined]];
  const board3 = [[1,undefined,1],[0,undefined,0],[undefined,undefined,undefined]];
  const board4 = [[0,undefined,1],[undefined,undefined,undefined],[undefined,undefined,undefined]];
  t.deepEqual(getCols(board1), [[undefined,undefined,undefined],[undefined,undefined,undefined],[undefined,undefined,undefined]], "returns 3 empty cols");
  t.deepEqual(getCols(board2), [[1,undefined,undefined],[1,undefined,undefined],[1,undefined,undefined]], "returns 3 cols");
  t.deepEqual(getCols(board3), [[1,0,undefined],[undefined,undefined,undefined],[1,0,undefined]], "returns 3 cols");
  t.deepEqual(getCols(board4), [[0,undefined,undefined],[undefined,undefined,undefined],[1,undefined,undefined]])
  t.end();
});

test("getDiagonals takes an array representing the board and returns a 2-d array representing the diagonal lines", (t) => {
  const board1 = [[undefined,undefined,undefined],[undefined,undefined,undefined],[undefined,undefined,undefined]];
  const board2 = [[1,1,1],[undefined,undefined,undefined],[undefined,undefined,undefined]];
  t.deepEqual(getDiagonals(board1), [[undefined,undefined,undefined],[undefined,undefined,undefined], ], "empty board returns empty lines");
  t.deepEqual(getDiagonals(board2), [[1,undefined,undefined],[1,undefined,undefined], ]);
  t.end();
});

test("getAllLines gets an array of all possible combinations of lines", (t) => {
  const board1 = [[undefined,undefined,undefined],[undefined,undefined,undefined],[undefined,undefined,undefined]];
  const expected1 = [
    [undefined,undefined,undefined],[undefined,undefined,undefined],[undefined,undefined,undefined],
    [undefined,undefined,undefined],[undefined,undefined,undefined],[undefined,undefined,undefined],
    [undefined,undefined,undefined],[undefined,undefined,undefined],
  ];
  t.deepEqual(getAllLines(board1), expected1, "empty board gives 5 arrays of undefined elements");
  t.end();
});

test("findLine takes the id of the player, the current round, and the board, checks the board for a winning line", (t) => {
  // no winner
  const board1 = [[undefined,undefined,undefined],[undefined,undefined,undefined],[undefined,undefined,undefined]];
  const board2 = [[1,undefined,1],[0,undefined,0],[undefined,undefined,undefined]];
  t.deepEqual(findLine(1, 0, board1), null, "returns null if board is empty");
  t.deepEqual(findLine(1, 3, board2), null, "returns null if no winner found");

  // winner
  const board3 = [[1,1,1],[0,undefined,0],[undefined,undefined,undefined]];
  const result3 = {
    win: 1,
    line: ["0:0", "0:1", "0:2"],
    winner: 1,
  };
  t.deepEqual(findLine(1, 4, board3), result3, "finds position of winning line in first row");

  const board4 = [[0,undefined,1],[1,0,0],[undefined,undefined,0]];
  const result4 = {
    win: 1,
    line: ["0:0", "1:1", "2:2"],
    winner: 0,
  };
  t.deepEqual(findLine(0, 4, board4), result4, "finds diagonal line");
  t.end();
});

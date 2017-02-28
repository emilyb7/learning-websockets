const test = require('tape');

const isSpaceFree = require('../gameplay.js').isSpaceFree;
const threeInALine = require('../gameplay.js').threeInALine;
const getCols = require('../gameplay.js').getCols;
const getDiagonals = require('../gameplay.js').getDiagonals;
const getAllLines = require('../gameplay.js').getAllLines;
const findLine = require('../gameplay.js').findLine;

test("isSpaceFree takes details of a space on the board and the current board and returns whether or not that space would be availeble", (t) => {
  const board1 = [[undefined,undefined,undefined],[undefined,undefined,undefined],[undefined,undefined,undefined]];
  const board2 = [[undefined,0,1],[undefined,undefined,undefined],[undefined,undefined,undefined]];
  const board3 = [[1,0,undefined],[undefined,undefined,undefined],[undefined,undefined,undefined]];
  t.equals(isSpaceFree("0:0", board1), true, "returns true when the board is empty");
  t.equals(isSpaceFree("0:0", board2), true, "returns true when other spaces are occupied but not this one");
  t.equals(isSpaceFree("0:0", board3), false, "returns false when space is occupied");
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
  t.deepEqual(getCols(board1), [[undefined,undefined,undefined],[undefined,undefined,undefined],[undefined,undefined,undefined]], "returns 3 empty cols");
  t.deepEqual(getCols(board2), [[1,undefined,undefined],[1,undefined,undefined],[1,undefined,undefined]], "returns 3 cols");
  t.deepEqual(getCols(board3), [[1,0,undefined],[undefined,undefined,undefined],[1,0,undefined]], "returns 3 cols");

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

test("findLine checks the board for a winning line", (t) => {
  // no winner
  const board1 = [[undefined,undefined,undefined],[undefined,undefined,undefined],[undefined,undefined,undefined]];
  const board2 = [[1,undefined,1],[0,undefined,0],[undefined,undefined,undefined]];
  t.deepEqual(findLine(board1, 1), null, "returns null if board is empty");
  t.deepEqual(findLine(board2, 1), null, "returns null if no winner found");

  // winner
  const board3 = [[1,1,1],[0,undefined,0],[undefined,undefined,undefined]];
  const result3 = {
    line: ["0:0", "0:1", "0:2"],
    winner: 1,
  };
  t.deepEqual(findLine(board3, 1), result3, "finds position of winning line in first row");

  const board4 = [[0,undefined,1],[1,0,0],[undefined,undefined,0]];
  const result4 = {
    line: ["0:0", "1:1", "2:2"],
    winner: 0,
  };
  t.deepEqual(findLine(board4, 0), result4, "finds diagonal line");
  t.end();
});

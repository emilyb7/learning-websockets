import React from 'react';

import gameplay from './../gameplay.js';

const move = gameplay.move;

const state = {
  board: [[undefined,undefined,undefined],[undefined,undefined,undefined],[undefined,undefined,undefined]],
}

const Board = () => (
  <div id="board">
    <div className="row" id="row-0">
      <div className="space" id="space-0:0"></div>
      <div className="space" id="space-0:1"></div>
      <div className="space" id="space-0:2"></div>
    </div>
    <div className="row" id="row-1">
      <div className="space" id="space-1:0"></div>
      <div className="space" id="space-1:1"></div>
      <div className="space" id="space-1:2"></div>
    </div>
    <div className="row" id="row-2">
      <div className="space" id="space-1:0"></div>
      <div className="space" id="space-1:1"></div>
      <div className="space" id="space-1:2"></div>
    </div>
  </div>
);

export default Board;

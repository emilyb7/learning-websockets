const defaultState = {
  players: [
    {
      id: 0,
      name: "player1",
      counter: "x",
    },
    {
      id: 1,
      name: "player2",
      counter: "o",
    },
],
  game: {
    board: [[undefined,undefined,undefined],[undefined,undefined,undefined],[undefined,undefined,undefined]],
    player: 0,
    round: 0,
    win: null,
  },
};

import { move } from './../gameplay.js';

export default (state = defaultState, action) => {
  switch(action.type) {
    case 'MOVE':
      // return something;
      const nextIteration = move(action.space, state.game.player, state.game.round, state.game.board);
      const result = Object.assign({}, state, {
        game: {
          board: nextIteration.board,
          player: nextIteration.player,
          round: nextIteration.round,
          win: nextIteration.win,
        }
      });
      return result;
    default:
      return state;
  }
};

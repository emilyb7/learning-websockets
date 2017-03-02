const defaultState = {
  currentPlayer: null,
  players: [
    {
      id: 0,
      name: "player1",
      counter: "",
      currentPlayer: false,
    },
    {
      id: 1,
      name: "player2",
      counter: "",
      currentPlayer: false,
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
      const nextIteration = move(action.space, state.currentPlayer, state.game.player, state.game.round, state.game.board);
      if (nextIteration.success === false) return state;
      else return Object.assign({}, state, {
        game: {
          board: nextIteration.board,
          player: nextIteration.player,
          round: nextIteration.round,
          win: nextIteration.win,
        }
      });
    case 'NEW-PLAYERS':
      const playerid = action.response.playerid;
      return Object.assign({}, state, { currentPlayer: playerid, });
    default:
      return state;
  }
};

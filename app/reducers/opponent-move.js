import { move } from './../gameplay.js';

export default (state, action) => {
  if (action.response.player === state.currentPlayer) return state;

  const player = state.currentPlayer === 0 ? 1 : 0;

  const nextIteration = move(action.response.space, player, state.game.player, state.game.round, state.game.board);
  const msg = JSON.stringify({
    type: 'OPPONENT-MOVE',
    player: state.game.player,
    space: action.space
  });

  return nextIteration.success === false
  ? state
  : Object.assign({}, state, {
    game: {
      board: nextIteration.board,
      player: nextIteration.player,
      round: nextIteration.round,
      win: nextIteration.win,
    },
    messages: state.messages,
  });
};

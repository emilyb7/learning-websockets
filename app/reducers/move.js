import { move } from './../gameplay.js';

export default (state, action) => {
  const nextIteration = move(action.space, state.currentPlayer, state.game.player, state.game.round, state.game.board);
  return nextIteration.success === false
  ? state
  : Object.assign({}, state, {
    game: {
      board: nextIteration.board,
      player: nextIteration.player,
      round: nextIteration.round,
      win: nextIteration.win,
    },
  });
}

import { move } from './../gameplay.js';

export default (state, { player, space, }) => {
  if (player === state.currentPlayer) return state;

  const opponent = state.currentPlayer === 0
    ? 1
    : 0;

  const nextIteration = move(
    space, opponent, state.game.player, state.game.round, state.game.board
  );

  console.log("iter", nextIteration);

  return nextIteration.success === false
    ? state
    : {
      ...state,
      game: {
        board: nextIteration.board,
        player: nextIteration.player,
        round: nextIteration.round,
        win: nextIteration.win,
      },
    };
};

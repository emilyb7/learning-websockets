import React from 'react';

const Feedback = ({ message, currentPlayer, game, }) => {

  const player = game.player;

  const isTurn = currentPlayer != null && player != null
    ? player === currentPlayer
      ? 'Your turn'
      : 'Opponent\'s turn'
    : game.win
      ? game.win.winner + ' wins'
      : '';

  return (
    <div className="feedback">
      <p>{ message }</p>
      <p>{ isTurn }</p>
    </div>
  );
};

export default Feedback;

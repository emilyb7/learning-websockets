import React from 'react';
import { connect, } from 'react-redux';

import Board from './../components/board.jsx';

import socket from './../sockets.js';

const Game = props => {

  return (
    <Board
      currentPlayer={ props.currentPlayer }
      game={ props.game }
      players={ props.players }
      actionMove={ props.actionMove }
    />
  );
};

const mapStateToProps = state => ({
  currentPlayer: state.currentPlayer,
  game: state.game,
  players: state.players,
  messages: state.messages,
});

const mapDispatchToProps = dispatch => ({
  actionMove: (event) => { dispatch({ type: 'MOVE', space: event.target.id, }) },
  //actionNewPlayer: (playerId) => { dispatch({ type: 'NEW-PLAYERS', playerId: playerId, }); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);

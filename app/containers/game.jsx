import React from 'react';
import { connect, } from 'react-redux';

import Board from './../components/board.jsx';
import Feedback from './../components/feedback.jsx';

import socket from './../sockets.js';

const Game = props => {

  return (
    <div className="game">
      <Board
        currentPlayer={ props.currentPlayer }
        game={ props.game }
        players={ props.players }
        actionMove={ props.actionMove }
      />
    <Feedback
      message={ props.feedback }
      currentPlayer={ props.currentPlayer }
      game={ props.game }
    />
    </div>
  );
};

const mapStateToProps = state => ({
  currentPlayer: state.currentPlayer,
  game: state.game,
  players: state.players,
  messages: state.messages,
  feedback: state.feedback,
});

const mapDispatchToProps = dispatch => ({
  actionMove: (event) => { dispatch({ type: 'MOVE', space: event.target.id, }) },
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);

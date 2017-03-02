import React from 'react';
import Board from './board.js';

class App extends React.Component {

  render () {

    const store = this.props.store;
    const socket = this.props.socket;

    return (
      <div>
        <h1>Sockety</h1>
        <Board
          socket = { socket }
          value={ store.getState() }
          actionMove={ event => store.dispatch({ type: 'MOVE', space: event.target.id }) }
        />
      </div>
    );
  }
};

export default App;

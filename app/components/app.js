import React from 'react';
import Board from './board.js';
import Store from './../reducers/index.js';
import { createStore } from 'redux';

class App extends React.Component {
  render () {
    const store = this.props.store;
    return (
      <div>
        <h1>Sockety</h1>
        <Board
          value={ store.getState() }
          actionMove={ event => store.dispatch({ type: 'MOVE', space: event.target.id }) }
        />
      </div>
    );
  }
};

export default App;

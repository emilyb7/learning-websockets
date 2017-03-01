import React from 'react';
import Board from './board.js';
import Store from './../reducers/index.js';
import { createStore } from 'redux';

class App extends React.Component {

  render () {

      console.log("web socketing");

      var url = "ws://localhost:7777/echo";

      var socket = new WebSocket(url);

      socket.onopen = function (event) {
        socket.send("hello server");
      }

      socket.onmessage = function (event) {
        console.log(event.data);
      }

      socket.onclose = function (event) {
        console.log("disconnected");
      }
      
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

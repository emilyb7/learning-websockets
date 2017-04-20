import React from 'react';
import { connect, } from 'react-redux';

import socket from './../sockets.js';

class SocketManager extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: props.messages,
    };
  };

  componentWillMount() {
    const checkMessages = messages => messages.filter(ms => !ms.sent).length;

    if (checkMessages(this.props.messages)) {
      this.props.actionSend();
      updateMessages();
    }
    console.log("state", this.state);
  }

  updateMessages() {
    this.setState({
      messages: this.props.messages,
    })
  }

  render() {
    return (
      <div className="socket-container">
        <p></p>
      </div>
    );
  }


};

const mapStateToProps = state => ({
  messages: state.messages,
});

const mapDispatchToProps = dispatch => ({
  actionSend: () => { dispatch({ type: 'SEND', }) },
});

export default connect(mapStateToProps, mapDispatchToProps)(SocketManager);

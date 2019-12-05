import React, { Component } from 'react';
import Login from './components/Login';
import MessagingPanel from './components/MessagingPanel';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      username: null
    };
  }

  setUsername = (username) => {
    this.setState({ username });
  }

  render() {
    return (
      <div id="wrapper">
        {
          !this.state.username ?
            <Login setUsername={this.setUsername} /> :
            <MessagingPanel username={this.state.username} />
        }
      </div>
    );
  }
}

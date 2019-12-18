import React, { Component, Fragment } from 'react';
import DisplayConversation from './DisplayConversation';
import MessagingBox from './MessagingBox';

// Variant #2 - advanced implementation
export default class MessagingPanel extends Component {
  constructor() {
    super();

    this.state = {
      messages: [],
      ws: null
    };

    this.timeout = 250;
  }

  componentDidMount() {
    this.connect();
  }

  connect = () => {
    let ws = new WebSocket("ws://localhost:9090/");
    let connectInterval;

    ws.onopen = () => {
      console.log("connected websocket main component");
      this.setState({ ws: ws });
      this.timeout = 250; // reset timer to 250 on open of websocket connection
      clearTimeout(connectInterval); // clear Interval on on open of websocket connection
    };

    ws.onclose = e => {
      console.log(
        `Socket is closed. Reconnect will be attempted in ${Math.min(
            10000 / 1000,
            (this.timeout + this.timeout) / 1000
        )} second.`,
        e.reason
      );

      //increment retry interval
      this.timeout = this.timeout + this.timeout;
      //call check function after timeout
      connectInterval = setTimeout(this.check, Math.min(10000, this.timeout));
    };

    ws.onerror = err => {
      console.error(
        "Socket encountered error: ",
        err.message,
        "Closing socket"
      );
      ws.close();
    };

    ws.onmessage = (message) => {
      const data = JSON.parse(message.data);
      console.log(data);
      this.setState({
        messages: [...this.state.messages, data]
      });
    }

  }

  check = () => {
    const { ws } = this.state;
    //check if websocket instance is closed, if so call `connect` function.
    if (!ws || ws.readyState === WebSocket.CLOSED) {
      this.connect();
    }
  };

  getMessage = (message) => {
    const data = {
      username: this.props.username,
      message
    };

    try {
      this.state.ws.send(JSON.stringify(data));
    } catch (e) {
      console.error( e.message );
    }
  }

  render() {
    return (
      <Fragment>
        <DisplayConversation messages={this.state.messages} />
        <MessagingBox getMessage={this.getMessage} />
      </Fragment>
    );
  }
}

/*

// Variant #1 - simple implementation

export default class MessagingPanel extends Component {
  constructor() {
    super();
    this.state = { messages: [] };
    this.ws = new WebSocket("ws://localhost:9090/");
  }

  componentDidMount() {
    this.ws.onopen = (data) => {
      console.log("connected");
    }

    this.ws.onclose = () => {
      console.log("disconnected");
    }

    this.ws.onerror = (err) => {
      console.error(
        "Socket encountered error: ",
        err.message,
        "Closing socket"
      );
      this.ws.close();
    }

    this.ws.onmessage = (message) => {
      const data = JSON.parse(message.data);
      console.log(data);
      this.setState({
        messages: [...this.state.messages, data]
      });
    }
  }

  getMessage = (message) => {
    const data = {
      username: this.props.username,
      message
    };

    this.ws.send(JSON.stringify(data));
  }

  render() {
    return (
      <Fragment>
        <DisplayConversation messages={this.state.messages} />
        <MessagingBox getMessage={this.getMessage} />
      </Fragment>
    );
  }
}

*/

import React, { Component, Fragment } from 'react';
import DisplayConversation from './DisplayConversation';
import MessagingBox from './MessagingBox';

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

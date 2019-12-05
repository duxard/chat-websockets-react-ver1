import React, { Component } from 'react';

export default class MessagingBox extends Component {
  messageHandler = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.props.getMessage(e.target.value);
      e.target.value = "";
    }
  }
  render() {
    return (
      <div id="messagingBox">
        <textarea onKeyDown={this.messageHandler}></textarea>
      </div>
    );
  }
}

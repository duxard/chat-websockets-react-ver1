import React, { Component } from 'react';

export default class DisplayConversation extends Component {
  render() {
    return (
      <div id="displayConversation">
        {
          this.props.messages.map(message => {
            return (
              <div key={message.count}> {message.username}: {message.message} </div>
            );
          })
        }
      </div>
    );
  }
}

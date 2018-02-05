import React from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import Backend from '../Backend';

class Chat extends React.Component {
  state = {
    messages: []
  };

  componentWillMount() {}

  render() {
    return (<GiftedChat messages={this.state.messages} onSend={(message) => {
        Backend.SendMessage(message);
      }} user={{
        _id: Backend.getUid(),
        name: this.props.username
      }}/>);
  }

  componentDidMount() {
    Backend.loadMessages((message) => {
      this.setState((previousState) => {
        return {
          messages: GiftedChat.append(previousState.messages, message)
        };
      });
    });
  }

  ComponentWillUnmount() {
    Backend.closeChat();
  }
}

Chat.defaultProps = {
  username: 'user'
};

export default Chat;

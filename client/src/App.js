import React, { Component } from 'react';
import './App.css';
import { Messages } from './components/messages';
import { SendMessage } from './components/sendMessage';
import { TypingAlert } from './components/typingAlert';
import { Login } from './components/login';
import { UserList } from './components/user-list';
import io from 'socket.io-client';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      //username: 'test', //for dev testing
      username: '',
      landingPage: '',
      socket: io('http://localhost:8000'),
      users: [] //DELETE TEST USERS
    }
  }

  componentWillMount() {
    window.addEventListener('beforeunload', () => {
      this.state.socket.emit('user left', this.state.username);
    });
    this.state.socket.on('user joined', data => {
      this.setState({
        users: data.userList
      })
    });
    this.state.socket.on('user left', data => {
      this.setState({
        users: data.userList
      })
    });
  }

  getUsername = (username) => {
    this.setState({
      username: username
    });
  };

  //Could use context for the second return function so I don't have to pass socket as props for each.
  render() {
    if (this.state.username === '') {
      return (
        <div className="login-container">
          <Login getUsername={this.getUsername} socket={this.state.socket} />
        </div>
      );
    }
    return (
      <div className="app-container">
        <div className="user-list test">
          <UserList users={this.state.users} />
        </div>
        <div className="messages test">
          <Messages socket={this.state.socket} />
        </div>
        <div className="typing-alert test">
          <TypingAlert socket={this.state.socket} />
        </div>
        <div className="send-message test ">
          <SendMessage username={this.state.username} socket={this.state.socket} />
        </div>
      </div>
    );
  }
}

export default App;

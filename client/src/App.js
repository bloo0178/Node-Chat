import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import './App.css';
import Login from './components/login/login';
import ChatBox from './components/chat-box/chat-box';
import io from 'socket.io-client';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      landingPage: '',
      socket: io('http://localhost:8000'),
      users: [] 
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
    return (
      this.state.username === '' ?
        <Router>
          <div>
            <Redirect to="/login" />
            <Route path="/login"
              render={props =>
                <Login {...props}
                  getUsername={this.getUsername}
                  socket={this.state.socket} />} />
          </div>
        </Router>
        :
        <Router>
          <div>
            <Redirect to="/" />
            <Route path="/"
              render={props =>
                <ChatBox {...props} users={this.state.users}
                  socket={this.state.socket} username={this.state.username} />} />
          </div>
        </Router>
    )
  }
}

export default App;

import React from 'react';
import { Messages } from './messages';
import { SendMessage } from './sendMessage';
import { TypingAlert } from './typingAlert';
import { UserList } from './user-list';
import '../../App.css';
import './chat-box.css'

const ChatBox = (props) => {
return (
    <div className="chat-box-container">
      <div className="user-list test">
        <UserList users={props.users} />
      </div>
      <div className="messages test">
        <Messages socket={props.socket} />
      </div>
      <div className="typing-alert test">
        <TypingAlert socket={props.socket} />
      </div>
      <div className="send-message test ">
        <SendMessage username={props.username} socket={props.socket} />
      </div>
    </div>
  );
}

export default ChatBox; 


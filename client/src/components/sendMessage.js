import React from 'react';
import './send-message.css';

class SendMessage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            message: '',
            typingTimeout: 0
        };
    }

    /*Adds a delay before emitting that the user is done typing.*/
    handleDoneTyping = () => {
        if (this.state.typingTimeout) {
            clearTimeout(this.state.typingTimeout);
        }
        this.setState({
            typingTimeout: setTimeout(() => {
                this.props.socket.emit('typing', { status: false });
            }, 2000)
        })
    }

    handleMsgChange = (event) => {
        this.setState({ message: event.target.value });
        console.log(this.props.username + ' typing');
        this.props.socket.emit('typing', { status: true, username: this.props.username });
    }

    sendMsg = () => {
        let data = { message: this.state.message, username: this.props.username };
        this.props.socket.emit('chat message', data);
        this.setState({ message: '' })
        this.props.socket.emit('typing', { status: false });
    }

    render() {
        return (
            <div className="snd-msg-container">
                    <textarea value={this.state.message} onChange={this.handleMsgChange}
                        onKeyUp={this.handleDoneTyping}></textarea>
                    <button onClick={this.sendMsg}>Send</button>
            </div>
        )
    }

}

export { SendMessage };
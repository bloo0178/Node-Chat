import React from 'react';

class TypingAlert extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            typing: ''
        }
    }

    componentWillMount() {
        this.props.socket.on('typing', (data) => {
            if (data.status === true) {
                this.setState({ typing: data.username + ' is typing' });
            } else {
                this.setState({ typing: '' });
            }
        })
    }

    render() {
        return (
            <div>
                {this.state.typing}
            </div>
        )
    }
}

export { TypingAlert }
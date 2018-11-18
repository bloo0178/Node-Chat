import React from 'react';


class Messages extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            message: '',
            log: [],
            typing: ''
        };
    }

    componentWillMount() {
        this.props.socket.on('chat message', data => {
            this.setState({
                log: [...this.state.log, data.username + ': ' + data.message]
            })
        })
        this.props.socket.on('user joined', data => {
            this.setState({
                log: [...this.state.log, (data.username + ' has joined')]
            })
        })
        this.props.socket.on('user left', data => {
            this.setState({
                log: [...this.state.log, (data.username + ' has left')]
            })
        })
    }

    render() {
        return (
            <div>
                <ul>
                    {this.state.log.map((msg) => {
                        return (
                            <li key={msg.id}>
                                <div>
                                    {msg}
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>

        )
    }
}

export { Messages };
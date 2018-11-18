import React from 'react';
import '../App.css';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ''
        }
    }

    handleChange = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    render() {
        return (
            <div>
                <input placeholder="Enter Username" onChange={this.handleChange}></input>
                <button onClick={this.handleClick}>Submit</button>
            </div>
        )
    }

}

export { Login }; 

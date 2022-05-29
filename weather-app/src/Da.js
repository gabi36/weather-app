import React from "react";
import App from "./weather/weather";
import Login from "./login";

export default class FirstPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: false
        }

        this.handleChangeLogin = this.handleChangeLogin.bind(this)
    }

    handleChangeLogin = () => {
        this.setState({
            login: true
        })
    }

    render() {
        return (
            <App/>
            /*<div>
                {this.state.login ?
                    <App/>
                    :
                    <Login onChange={this.handleChangeLogin}/>}
                {/!*<Login onChange={this.handleChangeLogin}/>*!/}
            </div>*/
        )
    }
}

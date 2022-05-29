import React from "react";
import "./App.css"

export default class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: ""
        }

        this.handleChangeUsername = this.handleChangeUsername.bind(this)
        this.handleChangePassword = this.handleChangePassword.bind(this)
    }

    handleChangeUsername = (e) => {
        this.setState({username: e.target.value})
    }

    handleChangePassword = (e) => {
        this.setState({password: e.target.value})
    }

    performLogin=()=>{
        if(this.state.username === "gabi" && this.state.password==="gabi")
            this.props.onChange()
    }

    render(){
        return(
            <div className="login">
                <label>Username</label><input type="text" onChange={this.handleChangeUsername}/><br/>
                <label>Password</label><input type="password" onChange={this.handleChangePassword}/><br/>
                <button onClick={this.performLogin}>Login</button>
            </div>
        )
    }
}
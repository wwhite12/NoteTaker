import React from "react";


class Login extends React.Component {
    state = {
        username: "",
        password: ""
    }


    handleInputChange = event => {
        const { value, name } = event.target;

        this.setState({
            [name]: value

        });

    };



    handleFormSubmit = event => {
        event.preventDefault();
        if (!this.state.username || !this.state.password) {
            alert("Enter username and password");
        } else {
            localStorage.setItem("username", this.state.username);

        }

        this.setState({
            username: "",
            password: ""
        });

    }

    render() {
        return (
            <div>
                <form className="form">
                    <input
                        value={this.state.username}
                        name="username"
                        onChange={this.handleInputChange}
                        type="email"
                        placeholder="Email Address"
                    />
                    <input
                        value={this.state.password}
                        name="password"
                        onChange={this.handleInputChange}
                        type="password"
                        placeholder="password"
                    />
                    <button onClick={this.handleFormSubmit}>Login</button>

                </form>
            </div>

        )

    }





}


export default Login
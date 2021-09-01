import "../css/style.css";
import rightArrow from "../images/right_arrow.svg";

import React from "react";
import { fetchUsername, matchUsername, signin } from "../apis/api";
import { errorRender } from "./errorRender";

class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.inUsername = React.createRef();
        this.inUsernameError = React.createRef();
        this.inPassword = React.createRef();
        this.inPasswordError = React.createRef();
    }

    state = {
        username: "",
        validUsername: false,
        password: "",
        validPassword: false,
    };

    renderValidUsername = async () => {
        const username = this.state.username;

        if (username < 1) {
            errorRender(this.inUsername.current, null, this.inUsernameError.current, null, false);
            this.setState({ validUsername: false, username: "" });
        } else if (!matchUsername(this.state.username)) {
            errorRender(
                this.inUsername.current,
                "not-valid",
                this.inUsernameError.current,
                "Not a valid username!",
                false,
            );
            this.setState({ validUsername: false });
        } else {
            try {
                const data = await fetchUsername(username).then((res) => res.data);
                if (!data.available) {
                    errorRender(this.inUsername.current, "valid", this.inUsernameError.current, null, true);
                    this.setState({ validUsername: true });
                } else {
                    errorRender(
                        this.inUsername.current,
                        "not-valid",
                        this.inUsernameError.current,
                        "User not registered!",
                        false,
                    );
                    this.setState({ validUsername: false });
                }
            } catch (error) {
                console.log(error);
                errorRender(
                    this.inUsername.current,
                    "not-valid",
                    this.inUsernameError.current,
                    "Please try again later!",
                    false,
                );
                this.setState({ validUsername: false });
            }
        }
    };

    renderValidPassword() {
        const password = this.state.password;
        if (password.length < 1) {
            errorRender(this.inPassword.current, null, this.inPasswordError.current, null, false);
            this.setState({ validPassword: false });
        } else if (password.length < 6) {
            errorRender(
                this.inPassword.current,
                "not-valid",
                this.inPasswordError.current,
                "Minumum 6 character long",
                false,
            );
            this.setState({ validPassword: false });
        } else {
            errorRender(this.inPassword.current, "valid", this.inPasswordError.current, null, true);
            this.setState({ validPassword: true });
        }
    }

    usernameTimeOut;
    validateUsername = (event) => {
        event.preventDefault();
        this.setState({ username: event.target.value.trim() });
        clearTimeout(this.usernameTimeOut);
        this.usernameTimeOut = setTimeout(() => {
            this.renderValidUsername();
        }, 500);
    };

    passwordTimeOut;
    validatePassword = (event) => {
        event.preventDefault();
        this.setState({ password: event.target.value.trim() });
        clearTimeout(this.passwordTimeOut);
        this.passwordTimeOut = setTimeout(() => {
            this.renderValidPassword();
        }, 700);
    };

    onSignin = async (event) => {
        event.preventDefault();

        if (!this.state.validUsername) {
            errorRender(
                this.inUsername.current,
                "not-valid",
                this.inUsernameError.current,
                "Username required!",
                false,
            );
            return;
        } else if (!this.state.validPassword) {
            errorRender(
                this.inPassword.current,
                "not-valid",
                this.inPasswordError.current,
                "Password required!",
                false,
            );
            return;
        }

        const username = this.state.username;
        const password = this.state.password;

        const res = await signin(username, password);
        if (res.data.code === 301) {
            window.location.pathname = res.data.redirect;
        } else {
            errorRender(this.inPassword.current, "not-valid", this.inPasswordError.current, res.data.message, false);
        }
    };

    render() {
        return (
            <div className="signin container">
                <form className="option form">
                    <span className="welcome">Welcome Back.</span>
                    <input
                        type="text"
                        className="pad"
                        value={this.state.username}
                        placeholder="Username"
                        spellCheck="false"
                        autoComplete="on"
                        ref={this.inUsername}
                        onChange={this.validateUsername}
                        required={true}
                    />
                    <span className="Error inUsernameError" ref={this.inUsernameError}></span>
                    <input
                        type="password"
                        className="pad"
                        value={this.state.password}
                        autoComplete="off"
                        placeholder="Password"
                        ref={this.inPassword}
                        onChange={this.validatePassword}
                    />
                    <span className="Error inPasswordError" ref={this.inPasswordError}></span>
                    <button type="submit" onClick={this.onSignin}>
                        <span>Log in</span>
                        <div className="arrow arrow-right">
                            <img src={rightArrow} alt="arrow" />
                        </div>
                    </button>
                </form>
                <div className="controls justify-signin">
                    <div className="ctl-signup">
                        Not a user?
                        <button
                            type="button"
                            onClick={(event) => {
                                event.preventDefault();
                                this.props.registered(false);
                            }}
                        >
                            Sign up
                        </button>
                    </div>
                    <button type="button" className="ctl-forgot">
                        Forgot password?
                    </button>
                </div>
            </div>
        );
    }
}

export default Signin;

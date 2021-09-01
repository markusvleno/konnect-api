import "../css/style.css";
import React from "react";
import arrow from "../images/right_arrow.svg";
import { fetchUsername, matchEmail, matchUsername, signup } from "../apis/api";

import { errorRender } from "./errorRender";

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.upEmail = React.createRef();
        this.upEmailError = React.createRef();
        this.upPassword = React.createRef();
        this.upPasswordError = React.createRef();
        this.upRePassword = React.createRef();
        this.upRePasswordError = React.createRef();
        this.upUsername = React.createRef();
        this.upUsernameError = React.createRef();
        this.upName = React.createRef();
        this.upNameError = React.createRef();
    }

    state = {
        next: false,
        email: "",
        validEmail: false,
        password: "",
        validPassword: false,
        rePassword: "",
        validRePassword: false,
        username: "",
        validUsername: false,
        name: "",
        validName: false,
    };

    renderValidEmail() {
        const email = this.state.email;
        if (email.length < 1) {
            errorRender(this.upEmail.current, null, this.upEmailError.current, null, false);
            this.setState({ validEmail: false });
        } else if (!matchEmail(email)) {
            errorRender(this.upEmail.current, "not-valid", this.upEmailError.current, "Not a valid Email", false);
            this.setState({ validEmail: false });
        } else {
            errorRender(this.upEmail.current, "valid", this.upEmailError.current, null, true);
            this.setState({ validEmail: true });
        }
    }

    renderValidPassword() {
        const password = this.state.password;
        if (password.length < 1) {
            errorRender(this.upPassword.current, null, this.upPasswordError.current, null, false);
            this.setState({ validPassword: false });
        } else if (password.length < 6) {
            errorRender(
                this.upPassword.current,
                "not-valid",
                this.upPasswordError.current,
                "Minumum 6 character long",
                false,
            );
            this.setState({ validPassword: false });
        } else {
            errorRender(this.upPassword.current, "valid", this.upPasswordError.current, null, true);
            this.setState({ validPassword: true });
        }
    }

    renderValidRePassword() {
        const password = this.state.password;
        const rePassword = this.state.rePassword;
        if (rePassword.length < 1) {
            errorRender(this.upRePassword.current, null, this.upRePasswordError.current, null, false);
            this.setState({ validRePassword: false });
        } else if (password !== rePassword) {
            errorRender(
                this.upRePassword.current,
                "not-valid",
                this.upRePasswordError.current,
                "Password did not match!",
                false,
            );
            this.setState({ validRePassword: false });
        } else {
            errorRender(this.upRePassword.current, "valid", this.upRePasswordError.current, null, true);
            this.setState({ validRePassword: true });
        }
    }

    renderValidUsername = async () => {
        const username = this.state.username;

        if (username < 1) {
            errorRender(this.upUsername.current, null, this.upUsernameError.current, null, false);
            this.setState({ validUsername: false, username: "" });
        } else if (!matchUsername(this.state.username)) {
            errorRender(
                this.upUsername.current,
                "not-valid",
                this.upUsernameError.current,
                "Not a valid username!",
                false,
            );
            this.setState({ validUsername: false });
        } else {
            try {
                const data = await fetchUsername(username).then((res) => res.data);
                if (data.available) {
                    errorRender(this.upUsername.current, "valid", this.upUsernameError.current, null, true);
                    this.setState({ validUsername: true });
                } else {
                    errorRender(
                        this.upUsername.current,
                        "not-valid",
                        this.upUsernameError.current,
                        "Username name is not available!",
                        false,
                    );
                    this.setState({ validUsername: false });
                }
            } catch (error) {
                console.log(error);
                errorRender(
                    this.upUsername.current,
                    "not-valid",
                    this.upUsernameError.current,
                    "Please try again later!",
                    false,
                );
                this.setState({ validUsername: false });
            }
        }
    };

    renderValidName = () => {
        const name = this.state.name;
        if (name.length < 1) {
            errorRender(this.upName.current, null, this.upNameError.current, null, false);
            this.setState({ validName: false, name: "" });
        } else if (name.length > 20) {
            errorRender(
                this.upName.current,
                "not-valid",
                this.upNameError.current,
                "Maximum 20 character long.",
                false,
            );
            this.setState({ validName: false });
        } else {
            errorRender(this.upName.current, "valid", this.upNameError.current, null, true);
            this.setState({ validName: true });
        }
    };

    emailTimeOut;
    validateEmail = (event) => {
        event.preventDefault();
        this.setState({ email: event.target.value.trim() });
        clearTimeout(this.emailTimeOut);
        this.emailTimeOut = setTimeout(() => {
            this.renderValidEmail();
        }, 700);
    };

    passwordTimeOut;
    validatePassword = (event) => {
        event.preventDefault();
        this.setState({ password: event.target.value.trim(), rePassword: "" });
        this.renderValidRePassword();
        clearTimeout(this.passwordTimeOut);
        this.passwordTimeOut = setTimeout(() => {
            this.renderValidPassword();
        }, 700);
    };

    rePasswordTimeOut;
    validateRePassword = (event) => {
        event.preventDefault();
        this.setState({ rePassword: event.target.value.trim() });
        clearTimeout(this.rePasswordTimeOut);
        this.rePasswordTimeOut = setTimeout(() => {
            this.renderValidRePassword();
        }, 700);
    };

    usernameTimeOut;
    validateUsername = (event) => {
        event.preventDefault();
        this.setState({ username: event.target.value.trim() });
        clearTimeout(this.usernameTimeOut);
        this.usernameTimeOut = setTimeout(() => {
            this.renderValidUsername();
        }, 500);
    };

    nameTimeOut;
    validateName = (event) => {
        event.preventDefault();
        const name = event.target.value;
        this.setState({ name: name });
        clearTimeout(this.nameTimeOut);
        this.nameTimeOut = setTimeout(() => {
            this.renderValidName();
        }, 500);
    };

    onNext = (e) => {
        e.preventDefault();
        if (!this.state.validEmail) {
            errorRender(this.upEmail.current, "not-valid", this.upEmailError.current, "Not a valid email!", false);
        } else if (!this.state.validPassword) {
            errorRender(
                this.upPassword.current,
                "not-valid",
                this.upPasswordError.current,
                "Not a valid password!",
                false,
            );
        } else if (!this.state.rePassword) {
            errorRender(
                this.upRePassword.current,
                "not-valid",
                this.upRePasswordError.current,
                "Password did not match!",
                false,
            );
        } else {
            this.setState({ next: true });
        }
    };

    onBack = (e) => {
        e.preventDefault();
        errorRender(this.upUsername.current, null, this.upUsernameError.current, null, false);
        this.setState({ username: "", validUsername: false, next: false });
    };

    onSignup = async (e) => {
        e.preventDefault();
        if (
            !this.state.validEmail ||
            !this.state.validPassword ||
            !this.state.validRePassword ||
            !this.state.validUsername ||
            !this.state.validName
        ) {
            await alert("Please enter valid details!");
        } else {
            const res = await signup(this.state.email, this.state.password, this.state.username, this.state.name);
            if (res.data.code === 200) {
                this.setState({ next: false });
                this.props.registered(true);
            } else {
                this.setState({ next: false });
            }
        }
    };

    renderCredential = () => {
        return (
            <div className="option">
                <span className="create">Create account.</span>
                <input
                    type="email"
                    className="pad"
                    value={this.state.email}
                    placeholder="Email"
                    autoComplete="off"
                    spellCheck="false"
                    ref={this.upEmail}
                    onChange={this.validateEmail}
                />
                <span className="Error upEmailError" ref={this.upEmailError}></span>
                <input
                    type="password"
                    className="pad"
                    value={this.state.password}
                    autoComplete="off"
                    placeholder="Password"
                    ref={this.upPassword}
                    onChange={this.validatePassword}
                />
                <span className="Error upPasswordError" ref={this.upPasswordError}></span>
                <input
                    type="password"
                    className="pad"
                    value={this.state.rePassword}
                    autoComplete="off"
                    placeholder="Confirm Password"
                    ref={this.upRePassword}
                    onChange={this.validateRePassword}
                />
                <span className="Error upRePasswordError" ref={this.upRePasswordError}></span>
                <button type="button" onClick={this.onNext}>
                    <span>Next</span>
                    <div className="arrow arrow-right">
                        <img src={arrow} alt="arrow" />
                    </div>
                </button>
            </div>
        );
    };

    renderUserDetail = () => {
        return (
            <div className="option">
                <span className="select">Select username.</span>
                <input
                    type="text"
                    className="pad"
                    value={this.state.username}
                    placeholder="Username"
                    autoComplete="off"
                    spellCheck="false"
                    ref={this.upUsername}
                    onChange={this.validateUsername}
                    required={true}
                />
                <span className="Error upUsernameError" ref={this.upUsernameError}></span>
                <input
                    type="text"
                    value={this.state.name}
                    className="pad"
                    placeholder="Name"
                    autoComplete="off"
                    spellCheck="false"
                    ref={this.upName}
                    onChange={this.validateName}
                    required={true}
                />
                <span className="Error upNameError" ref={this.upNameError}></span>

                <button type="button" onClick={this.onBack}>
                    <span>Back</span>
                    <div className="arrow arrow-left">
                        <img src={arrow} alt="arrow" style={{ transform: "rotate(180deg)" }} />
                    </div>
                </button>
                <button type="submit" onClick={this.onSignup}>
                    <span>Sign up</span>
                    <div className="arrow arrow-right">
                        <img src={arrow} alt="arrow" />
                    </div>
                </button>
            </div>
        );
    };

    render() {
        return (
            <div className="signup container">
                <form className="form">{this.state.next ? this.renderUserDetail() : this.renderCredential()}</form>
                <div className="controls justify-signup">
                    <div className="ctl-signup">
                        Already have an account?
                        <button
                            type="button"
                            onClick={(event) => {
                                event.preventDefault();
                                this.props.registered(true);
                            }}
                        >
                            Sign In
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignUp;

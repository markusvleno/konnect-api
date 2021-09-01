import "../css/template.css";
import React from "react";
import Signin from "./Signin";
import Signup from "./Signup";
import logo from "../images/logo.svg";

class Template extends React.Component {
    state = { registered: true };

    setRegister = (value) => {
        this.setState({ registered: value });
    };
    render() {
        return (
            <React.Fragment>
                <div className="template outer-template">
                    <div className="template inner-template"></div>
                </div>
                <div className="logo">
                    <span className="logo-text">
                        K<img className="logo-svg" src={logo} alt="O" />
                        NNECT
                    </span>
                    <span className="logo-description">chat anonymously and securely.</span>
                </div>
                {this.state.registered ? (
                    <Signin registered={this.setRegister} />
                ) : (
                    <Signup registered={this.setRegister} />
                )}
            </React.Fragment>
        );
    }
}

export default Template;

import React from "react";
import "../css/logo.css";
import { logo } from "../images/svgs";

class Logo extends React.Component {
    render() {
        return (
            <React.Fragment>
                <span className="logo">
                    K{logo()}
                    NNECT
                </span>
            </React.Fragment>
        );
    }
}

export default Logo;

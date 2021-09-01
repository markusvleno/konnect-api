import "../css/nav.css";

import React from "react";
import { logo } from "../images/Svgs.jsx";

class Nav extends React.Component {
    state = { navLinkToggle: "false" };

    render() {
        return (
            <div className="Nav">
                <span className="Konnect-text">K{logo()}NNECT</span>
                <ul className="Nav-link">
                    <li className="Nav-li">Home</li>
                    <li className="Nav-li">About</li>
                    <li className="Nav-li">Privacy</li>
                    <li className="Nav-li">Sign in</li>
                </ul>
            </div>
        );
    }
}

export default Nav;

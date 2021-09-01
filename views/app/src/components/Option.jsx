import "../css/option.css";
import React from "react";
import UserDetail from "./UserDetail";

import { conversation, addFriend, settings, logout } from "../images/svgs";

class Option extends React.Component {
    render() {
        return (
            <div className="option">
                <UserDetail />
                <div className="controls">
                    <div className="control-svg tab-conversation">{conversation()}</div>
                    <div className="control-svg tab-add">{addFriend()}</div>
                    <div className="control-svg tab-settings">{settings()}</div>
                    <div className="control-svg tab-logout">{logout()}</div>
                </div>
                <div className="me-photo"></div>
            </div>
        );
    }
}

export default Option;

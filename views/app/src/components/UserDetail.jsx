import "../css/userDetail.css";
import React from "react";
import { useSelector } from "react-redux";

const UserDetail = () => {
    const logo = useSelector((state) => state.user.logo);
    const username = useSelector((state) => state.user.name);

    return (
        <div className="user-detail">
            <img src={logo} alt=" " />
            <span>{username}</span>
        </div>
    );
};

export default UserDetail;

import "../css/users.css";
import React from "react";
import { useSelector } from "react-redux";

const generateList = (user, key) => {
    return (
        <li key={key} className="">
            <img className="profile " src={user.profilePicture} alt="user profile" />
            <div className="name">{user.name}</div>
            <div className="lastMsg">{user.lastMsg}</div>
            <div className="lastMsgTime">{user.lastMsgTime}</div>
        </li>
    );
};

const Users = () => {
    let conversationList = useSelector((state) => state.user.conversation);

    return (
        <>
            <div className="users">
                <ul className="users-list">
                    {conversationList.map((user, index) =>
                        generateList(
                            {
                                name: user.name,
                                profilePicture: user.profilePicture,
                                lastMsg: user.chatLog.at(user.chatLog.length - 1).data,
                                lastMsgTime: user.chatLog.at(user.chatLog.length - 1).date,
                            },
                            index,
                        ),
                    )}
                </ul>
            </div>
        </>
    );
};

export default Users;

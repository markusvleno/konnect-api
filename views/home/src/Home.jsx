import "./css/base.css";
import React from "react";
import Nav from "./conponents/Nav.jsx";

class Home extends React.Component {
    render() {
        return (
            <div className="Base">
                <Nav />
            </div>
        );
    }
}

export default Home;

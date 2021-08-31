import "./style.css";
import React from "react";
import { logo, robotIlustration, gear1, gear2, gear3, gear4, gearinner1, gearinner2, gearinner4 } from "./svgs/Svg";

class App extends React.Component {
    render() {
        return (
            <div className="base">
                <div className="robot-base">
                    {robotIlustration()}
                    <div>{gear1()}</div>
                    <div>{gear2()}</div>
                    <div>{gear3()}</div>
                    <div>{gear4()}</div>
                    <div>{gearinner1()}</div>
                    <div>{gearinner2()}</div>
                    <div>{gearinner4()}</div>
                </div>
                <div className="oops">
                    {logo()}
                    <span>ops!</span>
                </div>
                <span className="quote">
                    We couldn't find the thing you were looking for, but here are some option that might help you to get
                    back on track!.
                </span>
                <div className="control">
                    <span>
                        Go to{" "}
                        <a href="/" style={{ color: "var(--front)" }}>
                            Homepage
                        </a>
                    </span>
                    <span>
                        Contact our{" "}
                        <a href="/" style={{ color: "var(--front)" }}>
                            Support
                        </a>
                    </span>
                </div>
            </div>
        );
    }
}

export default App;

import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Join.css";

const Join = () => {
    const [name, setName] = useState("");
    const [group, setGroup] = useState("");

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading"><p>Welcome to the chatApp.
                    Select a group and join the chat </p></h1>
                <div>
                    <input
                        placeholder="Nick"
                        className="joinInput"
                        type="text"
                        onChange={event => setName(event.target.value)}
                    />
                </div>
                <div>
                    <input
                        placeholder="Group"
                        className="joinInput mt-20"
                        type="text"
                        onChange={event => setGroup(event.target.value)}
                    />
                </div>
                <Link
                    onClick={event => (!name || !group ? event.preventDefault() : null)}
                    to={`/chat?name=${name}&group=${group}`}
                >
                    <button className="button mt-20" type="submit">
                        Sign In
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Join;
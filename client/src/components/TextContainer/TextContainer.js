import React from "react";


import "./TextContainer.css";

const TextContainer = ({ users }) => (
    <div className="textContainer">
        <div>
            <h1>
                React Chat Application{" "}
                <span role="img" aria-label="emoji">
          💬
        </span>
            </h1>
            <h2>
                Welcome in chat application. {" "}
                <span role="img" aria-label="emoji">
          💬
        </span>
            </h2>
            <h2>
                Active users:{" "}
            </h2>
        </div>
    </div>
);

export default TextContainer;
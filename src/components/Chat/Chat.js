import React, { useState, useEffect } from "react";
import io from "socket.io-client";

import "./Chat.css";
import Input from "../Input/Input";
import Messages from '../Messages/Messages';

let socket;

const Chat = ({ location }) => {
    const [message, setMessage] = useState("");
    const END_POINT = "localhost:5000";

    useEffect(() => {
        socket = io(END_POINT);



    }, [END_POINT, location.search]); // (44:50) we have only one new connection

    useEffect(() => {

        return () => {
            socket.emit("disconnect");
            socket.off();
        };
    });

    // function for sending messages
    const sendMessage = (event) => {
        event.preventDefault();
        if (message) {
            // (1:14:27)
            socket.emit("sendMessage", message, () => setMessage(""));
        }
    };


    return (
        <div className="outerContainer">
            <div className="container">
                <Input
                    message={message}
                    setMessage={setMessage}
                    sendMessage={sendMessage}
                />
            </div>
        </div>
    );
};

export default Chat;
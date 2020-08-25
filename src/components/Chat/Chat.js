import React, { useState, useEffect } from "react";
import querystring from "query-string";
import io from "socket.io-client";

import "./Chat.css";

import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from '../Messages/Messages';
import TextContainer from '../TextContainer/TextContainer';

let socket;

const Chat = ({ location }) => {
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    const [users, setUsers] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const END_POINT = "localhost:5000";

    useEffect(() => {
        const { name, room } = querystring.parse(location.search);

        socket = io(END_POINT);

        setName(name);
        setRoom(room);

        socket.emit("join", { name, room }, error => {
            if (error) {
                alert(error);
            }
        });
    }, [END_POINT, location.search]); // (44:50) we have only one new connection

    useEffect(() => {
        socket.on("message", (message) => {
            setMessages([...messages, message]);
        });

        socket.on("roomData", ({ users }) => {
            setUsers(users);
        });

        return () => {
            socket.emit("disconnect");
            socket.off();
        };
    }, [messages]); // userEffect React.DependecyList

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
                <InfoBar room={room} />
                <Messages messages={messages} name={name} />
                <Input
                    message={message}
                    setMessage={setMessage}
                    sendMessage={sendMessage}
                />
                {/* <input
          value={message}
          onChange={event => setMessage(event.target.value)}
          onKeyPress={event =>
            event.key === "Enter" ? sendMessage(event) : null
          }
        /> */}
            </div>
            <TextContainer users={users}/>
        </div>
    );
};

export default Chat;
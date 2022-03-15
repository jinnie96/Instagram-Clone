import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { io } from 'socket.io-client';
import './Chat.css';
let socket;

const Chat = () => {
    const [roomStatus, setRoomStatus] = useState('Nothing here yet! Say hello to the world, below.');
    const [chatInput, setChatInput] = useState("");
    const [messages, setMessages] = useState([]);
    const messagesEnd = useRef(null);

    const user = useSelector(state => state.session.user);

    useEffect(() => {
        // Open socket connection (immediately on creation) + create websocket
        socket = io();

        socket.on("chat", (chat) => {
            setMessages(messages => [...messages, chat]);
            setRoomStatus('');
        });

        // When component unmounts, disconnect
        return (() => {
            socket.disconnect()
        });
    }, []);

    const updateChatInput = (e) => {
        setChatInput(e.target.value)
    };

    // Will emit the message thru the websocket when form is submitted
    const sendChat = (e) => {
        e.preventDefault()
        socket.emit("chat", { user: user.username, msg: chatInput });
        setChatInput("")
    };

    // Chat box will scroll to keep bottom of chat box in view
    const scrollToBottom = () => {
        messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);


    return (user && (
        <div className='chat-container'>
            <div id='room-status'>{roomStatus}</div>
            <div className='chat-messages'>
                {messages.map((message, ind) => (
                    <div key={ind}>{`${message.user}: ${message.msg}`}</div>
                ))}
                <div ref={messagesEnd}></div>
            </div>
            <form className='create-chat' onSubmit={sendChat}>
                <input
                    placeholder='Message...'
                    value={chatInput}
                    onChange={updateChatInput}
                />
                <button id='chat-submit' type="submit" disabled={!chatInput}>Send</button>
            </form>
        </div>
    ))
};


export default Chat;

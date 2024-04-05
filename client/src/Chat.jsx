"use client";
import React from 'react'
import { useState } from "react";
import { useSocket } from "../context/SocketProvider.jsx";
import classes from "./page.module.css";
import './Chat.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRef , useEffect } from 'react';

const Chat = () => {
    const { sendMessage, messages } = useSocket();
    const [message, setMessage] = useState("");

    const [newer , setCurrentTime ] = useState( "" );
     
    useEffect(() => {
        // Call updateTime every second
        const intervalId = setInterval(updateTime, 1000);
        return () => clearInterval(intervalId); // Clean up when component unmounts
    }, []);

    const updateTime = async() => {
        const now = new Date();
        const formattedTime = await  now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        setCurrentTime(formattedTime);
    };

   
    return (
      <div className='container-fluid'> 
      <div className='Hello'>
        Client-Server Architecture
      </div>
      <div className='hello'>
       <div className='Printer'>
          {messages.map((e) => (
            <div style={{ border: "2px solid black" , textAlign: "left" , margin: "10px 70% 10px 10px" , borderRadius : "10px" , padding: "10px"}} className='neww'>{e}<span className='ti'>{newer}</span></div>
          ))}
        </div>
      </div>


        <div className='msg'>
          <input
            id='msg'
            onChange={(e) => setMessage(e.target.value)}
            className={classes["chat-input"]}
            placeholder="Message..."
          />
        
          <button
            onClick={(e) => {
              if (message !== "") {
                sendMessage(message);
                setMessage("");
              } 
            }}
            className={classes["button"]}
          >
            Send
          </button>
        </div>
        
      </div>
    );
}

export default Chat;
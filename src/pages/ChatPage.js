import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

const ChatPage = () => {
  const { conversationId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((state) => state.auth.user);

  const socket = io(process.env.REACT_APP_BACKEND_URL); // Use environment variable

  useEffect(() => {
    // Join the conversation room
    socket.emit("join-conversation", conversationId);

    // Listen for new messages
    socket.on("new-message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Fetch existing messages
    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/conversations/${conversationId}/messages`
    )
      .then((response) => response.json())
      .then((data) => {
        setMessages(data);
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });

    // Cleanup on component unmount
    return () => {
      socket.emit("leave-conversation", conversationId);
      socket.disconnect();
    };
  }, [conversationId]);

  const handleSendMessage = (event) => {
    event.preventDefault();

    if (newMessage.trim() !== "") {
      const message = {
        senderId: user._id,
        conversationId,
        content: newMessage,
      };

      // Send the message to the server
      socket.emit("send-message", message);

      // Update the messages state locally
      setMessages((prevMessages) => [...prevMessages, message]);
      setNewMessage("");
    }
  };

  return (
    <div className="chat-page">
      <h1>Chat with {/* Display the other user's name here */}</h1>
      <div className="message-list">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${
              message.senderId === user._id ? "sent" : "received"
            }`}
          >
            <p>{message.content}</p>
            <span className="timestamp">
              {/* Display the message timestamp here */}
            </span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatPage;

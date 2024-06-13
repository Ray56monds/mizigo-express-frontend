import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Container, TextField, Button, List, ListItem, ListItemText, Typography, Box } from '@mui/material';

const socket = io('http://localhost:3000');

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    const newMessage = { sender: 'User', content: message };
    socket.emit('message', newMessage);
    setMessages([...messages, newMessage]);
    setMessage('');
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          Chat
        </Typography>
        <List>
          {messages.map((msg, index) => (
            <ListItem key={index}>
              <ListItemText primary={`${msg.sender}: ${msg.content}`} />
            </ListItem>
          ))}
        </List>
        <form onSubmit={sendMessage}>
          <TextField
            label="Message"
            fullWidth
            margin="normal"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Send
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Chat;

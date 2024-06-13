import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, List, ListItem, ListItemText, Typography, Box } from '@mui/material';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/notifications', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotifications(response.data);
    };

    fetchNotifications();
  }, []);

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          Notifications
        </Typography>
        <List>
          {notifications.map((notification) => (
            <ListItem key={notification.id}>
              <ListItemText primary={notification.message} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default NotificationsPage;

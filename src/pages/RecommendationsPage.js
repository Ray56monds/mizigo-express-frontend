import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, List, ListItem, ListItemText, Typography, Box } from '@mui/material';

const RecommendationsPage = () => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/recommendations/user1', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRecommendations(response.data);
    };

    fetchRecommendations();
  }, []);

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          Recommendations
        </Typography>
        <List>
          {recommendations.map((recommendation) => (
            <ListItem key={recommendation[0]}>
              <ListItemText primary={`${recommendation[0]}: ${recommendation[1]}`} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default RecommendationsPage;

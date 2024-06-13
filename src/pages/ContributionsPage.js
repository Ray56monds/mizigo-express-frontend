import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, List, ListItem, ListItemText, Typography, Box } from '@mui/material';

const ContributionsPage = () => {
  const [contributions, setContributions] = useState([]);

  useEffect(() => {
    const fetchContributions = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/contributions', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setContributions(response.data);
    };

    fetchContributions();
  }, []);

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          Contributions
        </Typography>
        <List>
          {contributions.map((contribution) => (
            <ListItem key={contribution.id}>
              <ListItemText primary={contribution.content} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default ContributionsPage;

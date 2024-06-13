import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

const Geolocation = () => {
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState(null);

  const getCoordinates = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3000/geolocation',
        { address },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );
      setCoordinates(response.data);
    } catch (error) {
      console.error('Error fetching coordinates', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          Geolocation
        </Typography>
        <form onSubmit={getCoordinates}>
          <TextField
            label="Address"
            fullWidth
            margin="normal"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Get Coordinates
          </Button>
        </form>
        {coordinates && (
          <Box mt={2}>
            <Typography variant="body1">Latitude: {coordinates.lat}</Typography>
            <Typography variant="body1">Longitude: {coordinates.lng}</Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Geolocation;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

const ProfilePage = () => {
  const [profile, setProfile] = useState({ email: '', firstName: '', lastName: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/users/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfile(response.data);
    };

    fetchProfile();
  }, []);

  const handleUpdateProfile = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.put('http://localhost:3000/users/profile', profile, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Profile update failed', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          Profile
        </Typography>
        <form onSubmit={handleUpdateProfile}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            required
          />
          <TextField
            label="First Name"
            fullWidth
            margin="normal"
            value={profile.firstName}
            onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
            required
          />
          <TextField
            label="Last Name"
            fullWidth
            margin="normal"
            value={profile.lastName}
            onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Update Profile
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default ProfilePage;

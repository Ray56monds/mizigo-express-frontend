import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/login', { email, password });
      localStorage.setItem('token', response.data.access_token);
      history.push('/');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default LoginPage;

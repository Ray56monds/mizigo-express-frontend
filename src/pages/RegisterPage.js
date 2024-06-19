import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  CircularProgress,
  Alert,
  AlertTitle,
} from '@mui/material';

const RegisterPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleRegisterSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await axios.post('/api/register', data); // Removed the response variable
      enqueueSnackbar('Registration successful!', { variant: 'success' });
      setIsSubmitting(false);
    } catch (err) {
      setError(err.response.data.message);
      enqueueSnackbar(err.response.data.message, { variant: 'error' });
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>
      {error && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      )}
      <form onSubmit={handleSubmit(handleRegisterSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Email"
              {...register('email', { required: true })}
              error={!!errors.email}
              helperText={errors.email ? 'Email is required' : ''}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              type="password"
              {...register('password', { required: true })}
              error={!!errors.password}
              helperText={errors.password ? 'Password is required' : ''}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
              {isSubmitting ? <CircularProgress size={24} /> : 'Register'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default RegisterPage;

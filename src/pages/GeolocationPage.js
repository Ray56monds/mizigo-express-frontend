import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
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
import { useSnackbar } from 'notistack';
import axios from 'axios';

const GeolocationPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [geolocationData, setGeolocationData] = useState(null);
  const [error, setError] = useState(null);

  const handleGeolocationSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post('/api/geolocation', data);
      setGeolocationData(response.data);
      enqueueSnackbar('Geolocation data fetched successfully!', { variant: 'success' });
      setIsSubmitting(false);
    } catch (err) {
      setError(err.response.data.message);
      enqueueSnackbar(err.response.data.message, { variant: 'error' });
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (location.state?.coordinates) {
      setIsLoading(true);
      const { latitude, longitude } = location.state.coordinates;
      axios
        .post('/api/geolocation', { latitude, longitude })
        .then((response) => {
          setGeolocationData(response.data);
          setIsLoading(false);
        })
        .catch((err) => {
          setError(err.response.data.message);
          enqueueSnackbar(err.response.data.message, { variant: 'error' });
          setIsLoading(false);
        });
    }
  }, [location.state, enqueueSnackbar]);  

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Geolocation
      </Typography>
      {isLoading && (
        <Grid container justifyContent="center" alignItems="center" style={{ height: '200px' }}>
          <CircularProgress />
        </Grid>
      )}
      {error && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      )}
      {geolocationData && (
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Latitude:
            </Typography>
            <Typography variant="body1">{geolocationData.latitude}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Longitude:
            </Typography>
            <Typography variant="body1">{geolocationData.longitude}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              City:
            </Typography>
            <Typography variant="body1">{geolocationData.city}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Region:
            </Typography>
            <Typography variant="body1">{geolocationData.region}</Typography>
          </Grid>
        </Grid>
      )}
      {!isLoading && !geolocationData && (
        <form onSubmit={handleSubmit(handleGeolocationSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Latitude"
                {...register('latitude', { required: true })}
                error={!!errors.latitude}
                helperText={errors.latitude ? 'Latitude is required' : ''}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Longitude"
                {...register('longitude', { required: true })}
                error={!!errors.longitude}
                helperText={errors.longitude ? 'Longitude is required' : ''}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                {isSubmitting ? <CircularProgress size={24} /> : 'Fetch Geolocation'}
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Container>
  );
};

export default GeolocationPage;

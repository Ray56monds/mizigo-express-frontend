import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Mizigo Express
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/contributions">
            Contributions
          </Button>
          <Button color="inherit" component={Link} to="/recommendations">
            Recommendations
          </Button>
          <Button color="inherit" component={Link} to="/profile">
            Profile
          </Button>
          <Button color="inherit" component={Link} to="/login" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

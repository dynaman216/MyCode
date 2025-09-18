// src/MyMuiComponent.js
import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function MyMuiComponent() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          MUI Example
        </Typography>
        <TextField 
          label="Enter your name" 
          variant="outlined" 
          fullWidth 
          margin="normal" 
        />
        <Button variant="contained" color="primary">
          Submit
        </Button>
      </Box>
    </Container>
  );
}

export default MyMuiComponent;
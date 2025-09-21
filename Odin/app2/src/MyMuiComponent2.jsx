import React from 'react';
import { Box, Button, Grid, TextField, Typography, Paper } from '@mui/material';

function MyMuiComponent2() {
  const rows = 5;
  const cols = 6;
  const totalItems = rows * cols;
  const gridItems = Array.from({ length: totalItems }, (_, index) => index + 1);

  return (
    <Box
      sx={{
        // Use a container that is a bit smaller than 100vh to avoid overflow
        // `dvh` is a modern alternative for `vh` that properly handles mobile toolbars,
        // but adding a small buffer with `calc()` works more broadly.
        height: 'calc(100vh - 16px)',
        width: '100%',
        p: 1, // Add a smaller, uniform padding
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box', // Ensure padding doesn't add to total height
        overflowX: 'hidden',
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 1 }}>
        5x6 Grid Example
      </Typography>

      <Box
        sx={{
          flexGrow: 1,
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          gap: 1,
          minHeight: 0,
          overflow: 'auto', // Prevent overflow and allow scrolling if needed
          width: '100%', // Ensure it stretches
          margin: 0,     // Remove any default margin
        }}
      >
        {gridItems.map((itemNumber, index) => (
          <Box
            key={itemNumber}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxSizing: 'border-box',
              height: '100%',
              width: '100%',
            }}
          >
            {/* Conditional rendering for the top row buttons */}
            {index < cols ? (
              <Button variant="contained" fullWidth>
                Button {itemNumber}
              </Button>
            ) : itemNumber === 16 ? (
              // Conditional rendering for the specific text field
              <TextField
                label="Enter your name"
                variant="outlined"
                fullWidth
              />
            ) : (
              <Paper
                sx={{
                  p: 1,
                  textAlign: 'center',
                  height: '100%',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="body1">
                  Item {itemNumber}
                </Typography>
              </Paper>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
}


export default MyMuiComponent2;
import { Box, Stack } from '@mui/material';
import React from 'react';

function NoProductSelected() {
  return (
    <Stack alignItems="center" spacing={4}>
      <Box>Selected product will be shown here</Box>
      <Box textAlign="center">
        Search for products, select one from the list, then set it's discount.
      </Box>
    </Stack>
  );
}

export default NoProductSelected;

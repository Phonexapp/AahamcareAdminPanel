import { Stack } from '@mui/material';
import React from 'react';
import Button from 'src/theme/overrides/Button';
import Typography from 'src/theme/overrides/Typography';
import { Link as RouterLink } from 'react-router-dom';

function titleAndButton({title}) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      <Button
        LinkComponent={RouterLink}
        to="/dashboard/oldageHome/create"
        variant="contained"
        startIcon={<Iconify icon="eva:plus-fill" />}
      >
        {title}
      </Button>
    </Stack>
  );
}

export default titleAndButton;

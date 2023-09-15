import { Box } from '@mui/material';
import React from 'react';

function Lable({ value, statusPopup, row }) {
  const color =
    value === 'Pending'
      ? '#fed200'
      : value === 'Cancelled'
      ? '#f10000'
      : value === 'Ongoing'
      ? '#1662ec'
      : value === 'Completed'
      ? '#00bc53'
      : value === 'Active'
      ? '#00bc53'
      : value === 'Inactive'
      ? '#f10000'
      : '#1662ec';

  const background =
    value === 'Pending'
      ? '#fff9e1'
      : value === 'Cancelled'
      ? '#fee8e6'
      : value === 'Ongoing'
      ? '#e9eaff'
      : value === 'Completed'
      ? '#edffe5'
      : value === 'Active'
      ? '#edffe5'
      : value === 'Inactive'
      ? '#fee8e6'
      : value === 'Fulfilled'
      ? '#edffe5'
      : '#e9eaff';

  

  return (
    <Box
      sx={{
        backgroundColor: background,
        color,
        borderRadius: '5px',
        p: 0.5,
        px: 1,
        display: 'inline-block',
        whiteSpace: 'nowrap',
        cursor: 'pointer',
      }}
      onClick={() => statusPopup(row)}
    >
      {value}
    </Box>
  );
}

export default Lable;

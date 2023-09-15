import { Avatar, Box, Button, Skeleton, Stack, Typography } from '@mui/material';
import { BASE_URL_CLIENT } from '../../utils/BaseUrl';

import logo from '../../assets/logo-with-name.png';
import Qrcode from './Qrcode';

function Head({ item, status, type }) {
  const invoiceData = `${BASE_URL_CLIENT}invoice/${type}/${item}`;
  const color =
    status === 'Received'
      ? '#fed200'
      : status === 'Cancelled'
      ? '#f10000'
      : status === 'Ongoing'
      ? '#1662ec'
      : status === 'Completed'
      ? '#00bc53'
      : status === 'Processing'
      ? '#00bc53'
      : status === 'Inactive'
      ? '#f10000'
      : '#1662ec';

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
      <Box>
        <Box sx={{ width: 300 }}>
          <img src={logo} alt="logo" />
          <Typography variant="body2">
            {' '}
            574/2, 2nd Floor, 2nd Block HMT Layout Vidyaranyapura Bangalore, <br /> Karnataka 560097, IN
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Qrcode invoiceData={invoiceData} />
        {status ? (
          <Button variant="outlined" size="medium" sx={{ color }}>
            {status}
          </Button>
        ) : (
          <Skeleton variant="rectangular" width={'100%'} height={30} />
        )}
      </Box>
    </Stack>
  );
}

export default Head;

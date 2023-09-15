import { Stack, Typography, Box, Avatar } from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';

function Footer() {
  return (
    <Stack
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      spacing={5}
      sx={{ backgroundColor: '#f0f0f0', p: 1.5, mt:2 }}
    >
      <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
        <LocalPhoneOutlinedIcon />
        <Typography> +91 9035 9477 04</Typography>
      </Stack>
      <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
        <EmailOutlinedIcon />
        <Typography> info@ahamcare</Typography>
      </Stack>
    </Stack>
  );
}

export default Footer;

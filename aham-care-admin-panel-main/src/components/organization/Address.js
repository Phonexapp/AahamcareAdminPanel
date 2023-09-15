import { Box, Divider, Paper, Stack, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ContactMailIcon from '@mui/icons-material/ContactMail';

function Address({oldageHome}) {
  return (
    <Paper elevation={2}>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        spacing={4}
        divider={<Divider orientation="vertical" flexItem />}
      >
        <Box
          sx={{
            width: '50%',
            padding: '20px',
            display:"flex",
            flexDirection:"column",
            gap:"10px"
          }}
        >
          <Typography variant="h6" gutterBottom sx={{color:"#9e9e9e", display: 'flex', alignContent: 'center', justifyContent: 'flex-start' }}>
            <LocationOnIcon sx={{color:"#9e9e9e"}} />
            Address
          </Typography>

          <Typography variant="body1" gutterBottom >{oldageHome.address}</Typography>
        </Box>

        <Box
          sx={{
            width: '50%',
            padding: '20px',
            display:"flex",
            flexDirection:"column",
            gap:"10px"
          }}
        >
          
          <Typography variant="h6" gutterBottom sx={{ display: 'flex',gap:"10px", alignContent: 'center', justifyContent: 'flex-start',color:"#9e9e9e"  }}>
            <ContactMailIcon sx={{color:"#9e9e9e"}} />
            Contact
          </Typography>
          
          <Typography variant="body1" gutterBottom>Phone: {oldageHome.phone}</Typography>
          <Typography variant="body1" gutterBottom>Email: {oldageHome.email}</Typography>
        </Box>
      </Stack>
    </Paper>
  );
}

export default Address;

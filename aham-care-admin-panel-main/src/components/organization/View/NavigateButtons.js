import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';

function NavigateButtons({ id }) {
  const navigate = useNavigate();

  const buttons = [
    { title: 'Requiremnt', icon: <LocalMallIcon />, navigate: 'requiremnt' },
    { title: 'Attendance', icon: <PlaylistAddCheckCircleIcon />, navigate: 'attendance' },
    { title: 'Donation', icon: <RequestQuoteIcon />, navigate: 'donation' },
  ];
  return (
    <Container>
      <Grid container spacing={2}>
        {buttons.map((button, i) => (
          <Grid
            key={i}
            item
            xs={12}
            sm={6}
            md={3}
            onClick={() => navigate(`/dashboard/division/organaization/view/${button.navigate}/${id}`)}
          >
            <Paper
              elevation={3}
              sx={{
                backgroundColor: '#dedede',
                p: 2,
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                {button.icon} <Typography>{button.title}</Typography>
              </Box>
              <KeyboardDoubleArrowRightIcon />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default NavigateButtons;

import { Box, Button, Container, Paper, Stack, Typography } from '@mui/material';
import { BASE_URL,CLOUDE_URL } from '../../../utils/BaseUrl';
import Lable from '../../Lable/Lable'
import Discription from './Discription';

function View({ organaization }) {
  return (
    <Container>
      <Paper elevation={3} sx={{ padding: '10px' }}>
        <Box
          elevation={2}
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-end',
            gap: '20px',
          }}
        >
          <img
            src={CLOUDE_URL + organaization.photo}
            alt="No"
            style={{
              height: '150px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              objectFit: 'cover',
              borderRadius: '5px',
            }}
          />

          <Box
            sx={{
              width: '100%',

              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              alignItems: 'flex-start',
              padding: '10px',
            }}
          >
            <Lable value={'Active'}/>
            <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: '30px' }}>
              {' '}
              {organaization?.name}{' '}
            </Typography>
            <Typography variant="body1">{organaization?.place}</Typography>

          </Box>
        </Box>
        <Discription discription={organaization?.discription}/>
      </Paper>
    </Container>
  );
}

export default View;

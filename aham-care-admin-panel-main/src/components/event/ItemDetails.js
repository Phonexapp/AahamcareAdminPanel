import { Box, Button, Divider, Paper, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

function ItemDetail({event}) {
  const navigate = useNavigate()
  const TimeAndDate = moment(event.createdAt).format('MMMM Do YYYY, h:mm:ss a');
  const color = event ?. status === 'Active' ? "#5CFF5C" : event ?. status === "Delete" ? "#FF5349" : "#FFFF8A"
  return (
    <Paper elevation={2}>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{ height: '100%' }}
        divider={<Divider orientation="vertical" flexItem />}
      >
        <Box sx={{width: '100%', height:'100%', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px', alignItems:'center' , justifyContent:'center'}}>
          <span style={{ fontWeight: 'bold', fontSize: '20px' }}>{event?.event}</span>
          <span>
            {event?.discription}
          </span>

          <Button variant="contained" sx={{ width: '50%' }} onClick={()=>navigate(`/dashboard/event/edit/${event._id}`)} >
            Update
          </Button>
        </Box>

        <Box sx={{ width: '100%', padding: '20px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <span style={{ backgroundColor: '#f9fafb', padding: '5px' }}>Created at : <b>{TimeAndDate}</b>  </span>
          <span style={{ backgroundColor: '#f9fafb', padding: '5px' }}>Total tickets : <b>{event ?. totalTickets}</b> </span>
          <span style={{ backgroundColor: '#f9fafb', padding: '5px' }}>Total price : <b>{event?.totalPrice}</b> </span>
          <span style={{ backgroundColor: '#f9fafb', padding: '5px' }}>Unit price : <b>{event?.unitPrice}</b> </span>
          <span style={{ backgroundColor: '#f9fafb', padding: '5px' }}>Remaining tickets : <b>{event?.remainingTickets}</b> </span>
          <span style={{ backgroundColor: '#cefad0', padding: '5px' }}>Starting Date : <b>{event?.startDateTime}</b> </span>
          <span style={{ backgroundColor: '#cefad0', padding: '5px' }}>Ending Date : <b>{event?.endDateTime}</b> </span>
          <span style={{ backgroundColor: color, padding: '5px' }}>Status : <b>{event.status}</b> </span>
        </Box>
      </Stack>
    </Paper>
  );
}

export default ItemDetail;

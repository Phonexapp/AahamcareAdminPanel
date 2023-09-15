import { Box, Paper, Stack, Typography } from '@mui/material';
import moment from 'moment';


function BillTo({item}) {
  const date = moment(item?.createdAt).format('MMMM Do YYYY');
  return (
    <Paper sx={{ mt: 3 }}>
      <Stack sx={{ p:3, borderTop:"1px solid black", borderBottom:"1px solid black"}} direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
        <Box>
            <Typography sx={{color:"#da1b76"}} variant='subtitle1'>Bill to:</Typography>
            <Typography variant='subtitle2'>Mr/Mrs {item?.userId?.name}  </Typography>
            <Typography variant='subtitle2'>{item?.userId?.phone_no}</Typography>
            <Typography variant='subtitle2'>{item?.userId?.email}</Typography>
        </Box>

        <Box>
            <Typography sx={{color:"#da1b76"}} variant='subtitle1'>Organization:</Typography>
          
            <Typography variant='subtitle2'> {item?.organaizationId?.name}</Typography>
            <Typography variant='subtitle2'> {item?.organaizationId?.place}</Typography>
            <Typography variant='subtitle2'> {item?.organaizationId?.phone}</Typography>
           

        </Box>

        <Box>
            <Typography sx={{color:"#da1b76"}} variant='subtitle1'>Invoice:</Typography>
            
          <Typography variant='subtitle2'>Date: <b>{date}</b></Typography>
          <Typography variant='subtitle2'>Invoice No: <b>{item?.invoiceNo}</b>  </Typography>
     
          
           
        </Box>
      </Stack>
    </Paper>
  );
}

export default BillTo;

import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Stack,
} from '@mui/material';

const Invoice = ({  item }) => {
  
  return (
    <Paper sx={{ mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Invoice
      </Typography>
      <TableContainer>
        <Table sx={{ mt: 3 }}>
          <TableHead>
            <TableRow>
              <TableCell>Event</TableCell>
              <TableCell>Booked Tickets</TableCell>
              <TableCell>Unit Price</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{item?.eventId?.event}</TableCell>
              <TableCell>{item?.donatedTickets}</TableCell>
              <TableCell>₹{item?.eventId?.unitPrice}</TableCell>
              <TableCell>₹{item?.eventId?.unitPrice * item?.donatedTickets}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Stack mt={2} direction="column" justifyContent="center" alignItems="flex-end" spacing={2}>
        <Box>
          {' '}
          <Typography variant="h6">Total: ₹{item?.eventId?.unitPrice * item?.donatedTickets}</Typography>
        </Box>
        <Box>
          <Typography variant="h6">Paid amount: ₹{item?.totalAmount}</Typography>
        </Box>
      </Stack>
    </Paper>
  );
};

export default Invoice;

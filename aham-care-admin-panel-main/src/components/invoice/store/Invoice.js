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
              <TableCell>Item</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Unit Price</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{item?.storeId?.item}</TableCell>
              <TableCell>{item?.count}</TableCell>
              <TableCell>₹{item?.storeId?.unitPrice}</TableCell>
              <TableCell>₹{item?.storeId?.unitPrice * item?.count}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Stack mt={2} direction="column" justifyContent="center" alignItems="flex-end" spacing={2}>
        <Box>
          {' '}
          <Typography variant="h6">Total: ₹{item?.storeId?.unitPrice * item?.count}</Typography>
        </Box>
        <Box>
          <Typography variant="h6">Paid amount: ₹{item?.storeId?.unitPrice * item?.count}</Typography>
        </Box>
      </Stack>
    </Paper>
  );
};

export default Invoice;

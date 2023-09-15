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

const Invoice = ({ item }) => {
  const totalPrice = item?.donatedItems?.reduce((acc, item) => {
    const quantity = parseInt(item.quantity,10);
    const unitPrice = parseInt(item.unitPrice,10);
    const itemTotal = quantity * unitPrice;
    return acc + itemTotal;
  }, 0);
  console.log(item, 'dddddddddddddddddddddddddd');
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
            {item?.donatedItems?.map((item) => (
              <TableRow>
                <TableCell>{item?.item}</TableCell>
                <TableCell>{item?.quantity}</TableCell>
                <TableCell>₹ {item?.unitPrice}</TableCell>
                <TableCell>₹ {item?.quantity * item?.unitPrice}</TableCell>
              </TableRow>
            ))}
            
          </TableBody>
        </Table>
      </TableContainer>
      <Stack mt={2} direction="column" justifyContent="center" alignItems="flex-end" spacing={2}>
        <Box>
          {' '}
          <Typography variant="h6">Grand total: ₹ {totalPrice}</Typography>
        </Box>
        <Box>
          <Typography variant="h6">Paid amount: ₹ {item?.totalPrice}</Typography>
        </Box>
      </Stack>
    </Paper>
  );
};

export default Invoice;

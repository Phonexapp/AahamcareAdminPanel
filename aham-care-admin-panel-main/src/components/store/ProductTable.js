import { useNavigate } from 'react-router-dom';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Avatar,
  Stack,
  Box,
} from '@mui/material';

import VisibilityIcon from '@mui/icons-material/Visibility';
import {CLOUDE_URL} from '../../utils/BaseUrl'

function ProductTable({ stores }) {
  const navigate = useNavigate();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Item Name</TableCell>
            <TableCell>Requirement</TableCell>
            <TableCell>Unit Price</TableCell>
            <TableCell>Total Price(g)</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>View</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stores.map((row, i) => (
            <TableRow key={i}>
              <TableCell component="th" scope="row">
                <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={3}>
                  {' '}
                  <Avatar alt={row?.item} src={CLOUDE_URL + row?.photo} /> <Box>{row.item}</Box>{' '}
                </Stack>
              </TableCell>

              <TableCell>{row.requirement}</TableCell>
              <TableCell>{row.unitPrice}</TableCell>
              <TableCell>{row.totalPrice}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>
                <Button onClick={() => navigate(`/dashboard/store/view/${row._id}`)}>
                  <VisibilityIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ProductTable;

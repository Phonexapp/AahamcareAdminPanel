import { Visibility, Edit } from '@mui/icons-material';
import {useNavigate} from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Button,
} from '@mui/material';
import { useState } from 'react';
import StatusDialog from '../OrderStatus';

function DataTable({ rows }) {
  const navigate = useNavigate()
  // ==========================================================
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState('');

  const handleStatusSave = (status) => {
    console.log(`Selected status: ${status}`);
    console.log(`Selected Id: ${selectedId}`);
  };

  const handleStatusClose = () => {
    setIsStatusDialogOpen(false);
  };

  // ==========================================================
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const data = rows;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleView = (id) => {
    // Do something with the selected row, e.g. show a modal with its details
    console.log(`Viewing row with ID ${id}`);
    navigate(`/dashboard/orders/store-view/${id}`)
  };

  const handleEdit = (id) => {
    console.log(`Editing row with ID ${id}`);
    setSelectedId(id);
    setIsStatusDialogOpen(true);
  };
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Store</TableCell>
              <TableCell>Donar</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => (
              <TableRow key={i}>
                <TableCell>{row?.storeId?.item}</TableCell>
                <TableCell>{row?.userId?.name}</TableCell>
                <TableCell>₹ {row?.storeId?.unitPrice * row?.count}</TableCell>
                <TableCell>{row?.status} </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleView(row?._id)} aria-label="view">
                    <Visibility />
                  </IconButton>
                  <IconButton onClick={() => handleEdit(row?._id)} aria-label="edit">
                    <Edit />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      
      <StatusDialog open={isStatusDialogOpen} onClose={handleStatusClose} onSave={handleStatusSave} />
    </>
  );
}

export default DataTable;

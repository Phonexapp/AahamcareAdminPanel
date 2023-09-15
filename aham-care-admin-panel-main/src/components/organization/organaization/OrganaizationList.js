import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Toaster } from 'react-hot-toast';
import { DataGrid } from '@mui/x-data-grid';
import { Helmet } from 'react-helmet-async';

function OrganaizationList({ row, division }) {
  const navigate = useNavigate()
  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      width: 250,
    },
    { field: 'place', headerName: 'Place', width: 200 },
    { field: 'phone', headerName: 'Phone', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },

    // {
    //   field: 'status',
    //   headerName: 'Status',
    //   width: 150,
    //   sortable: false,
    //   filterable: false,
    //   renderCell: (params) => <Lable value={params.value} />,
    // },

    {
      headerName: 'Action',
      width: 250,
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => (
        <Box>
          <Button color="success" onClick={()=>navigate(`/dashboard/division/organaization/view/${row._id}`)}>
            <VisibilityIcon />
          </Button>
          <Button onClick={()=>navigate(`/dashboard/division/edit-organaization/${row._id}`)}>
            <EditIcon   />
          </Button>
          <Button color="error">
            <DeleteIcon />
          </Button>
        </Box>
      ),
    },
  ];

  const getRowId = (row) => row._id;
  const [pageSize, setPageSize] = useState(10);

  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value));
  };
  return (
    <Box>
      <Helmet>
        <title> Aahamcare | Divisions </title>
      </Helmet>
      <Toaster />

      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography variant="h4" gutterBottom>
          {division?.name}
        </Typography>
        <Button
          component={RouterLink}
          to={`/dashboard/division/create-organaization/${division._id}`}
          variant="contained"
        >
          + Add
        </Button>
      </Stack>
      <Paper elevation={3} style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={pageSize}
          rowsPerPageOptions={[pageSize]}
          onPageSizeChange={handlePageSizeChange}
          getRowId={getRowId}
          disableSelectionOnClick
          disableColumnFilter
        />
      </Paper>
    </Box>
  );
}

export default OrganaizationList;

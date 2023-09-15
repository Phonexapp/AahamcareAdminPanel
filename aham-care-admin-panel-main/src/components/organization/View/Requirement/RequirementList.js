import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Toaster } from 'react-hot-toast';
import { DataGrid } from '@mui/x-data-grid';
import Label from '../../../Lable/Lable';
import StatusPopup from '../../../StatusPopup/StatusPopup';
import axios from '../../../../utils/axios';
import { notifySucess, notifyError } from '../../../../utils/alert';

function RequirementList({ row, requirementLists }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [requiremnt, setRequiremnt] = useState({});

  console.log('row', row);
  const navigate = useNavigate();
  const { orgId } = useParams();
  const columns = [
    {
      field: 'item',
      headerName: 'Item',
      width: 250,
    },
    {
      field: 'requirement',
      headerName: 'Requirement',
      width: 150,
      valueGetter: ({ row }) => {
        return `${row.requirement}  ${row.requirementUnit}`;
      },
    },
    {
      field: 'unitPrice',
      headerName: 'Unit price',
      width: 150,
      valueGetter: ({ row }) => {
        return `₹ ${row.unitPrice}  `;
      },
    },
    {
      field: 'totalPrice',
      headerName: 'Total Price',
      width: 150,
      valueGetter: ({ row }) => {
        return `₹ ${row.totalPrice}  `;
      },
    },
    {
      field: 'needs',
      headerName: 'Need',
      width: 150,
      valueGetter: ({ row }) => {
        return `${row.needs}  ${row.requirementUnit}`;
      },
    },

    {
      headerName: 'Status',
      field: 'status',
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => <Label value={row?.status || 'Active'} row={row} statusPopup={statusPopup} />,
    },

    {
      headerName: 'Action',
      width: 250,
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => (
        <Box>
          <Button color="success">
            <VisibilityIcon />
          </Button>
          <Button onClick={()=>editRequirement(row?._id)}>
            <EditIcon />
          </Button>
          {/* <Button color="error">
            <DeleteIcon />
          </Button> */}
        </Box>
      ),
    },
  ];
  // Edit Requirement
  const editRequirement = (id) =>{
    navigate(`/dashboard/division/organaization/view/requiremnt/edit/${id}`)
  }

  // Change Status
  const status = ['Active', 'Inactive','Fulfilled'];
  const statusPopup = (row) => {
    setRequiremnt(row);
    setOpen(true);
    console.log(row, 'id');
  };

  const changeStatus = async (value) => {
    try {
      setLoading(true);
      const { data } = await axios.post(`v1/admin/update-status/${requiremnt?._id}`, { status: value });
      setLoading(false);
      setOpen(false);
      await requirementLists();
      notifySucess(data?.message);
    } catch (error) {
      notifyError(error.message);
      setLoading(false);
    }
  };

  const getRowId = (row) => row._id;
  const [pageSize, setPageSize] = useState(10);

  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value));
  };
  return (
    <Box>
      <Toaster />
      <StatusPopup
        open={open}
        setOpen={setOpen}
        status={status}
        changeStatus={changeStatus}
        loading={loading}
        currentStatus={requiremnt?.status || 'Active'}
      />

      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography variant="h4" gutterBottom>
          Requirement
        </Typography>
        <Button
          component={RouterLink}
          to={`/dashboard/division/organaization/view/requiremnt/create/${orgId}`}
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

export default RequirementList;

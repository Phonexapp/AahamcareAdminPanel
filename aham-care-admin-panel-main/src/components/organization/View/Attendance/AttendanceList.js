import { Avatar, Box, Button, Paper, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { DataGrid } from '@mui/x-data-grid';
import Label from '../../../Lable/Lable';
import {BASE_URL, CLOUDE_URL} from '../../../../utils/BaseUrl';
import axios from '../../../../utils/axios';
import {notifyError,notifySucess} from '../../../../utils/alert';
import StatusPopup from '../../../StatusPopup/StatusPopup';

function AttendenceList({ row, AttendenceLists}) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [atteendance, setAtteendance] = useState({});
  const { orgId } = useParams();
  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      width: 250,
      renderCell:({row})=> <Box sx={{display:'flex', alignItems:'center', justifyContent:'center', gap:1}}><Avatar alt={row?.name} src={ CLOUDE_URL + row ?.photo}/> {row.name} </Box>
    },
    { field: 'place', headerName: 'Place', width: 200 },
    { field: 'age', headerName: 'Age', width: 200 },
    {
      field: 'status',
      headerName: 'Status',
      width: 200,
      renderCell: ({ row }) => <Label value={row?.status || 'Active'} row={row} statusPopup={statusPopup} />,
    },

    {
      headerName: 'Action',
      width: 250,
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => (
        <Box>
          {/* <Button color="success">
            <VisibilityIcon />
          </Button> */}
          <Button variant="contained" onClick={()=>editAttendence(row?._id)}>
            Edit
          </Button>
          {/* <Button color="error">
            <DeleteIcon />
          </Button> */}
        </Box>
      ),
    },
  ];
  // EditAttendence
  const editAttendence = (id)=>{
    navigate(`/dashboard/division/organaization/view/attendance/edit/${id}`);
  }

  // // Change Status
  const status = ['Active', 'Inactive'];
  const statusPopup = (row) => {
    setAtteendance(row);
    setOpen(true);
    console.log(row, 'id');
  };

  const changeStatus = async (value) => {
    try {
      setLoading(true);
      
      const { data } = await axios.patch(`v1/admin/recidence-status/${atteendance?._id}`, { status: value });
      AttendenceLists()
      setLoading(false);
      setOpen(false);
      
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
      <StatusPopup
        open={open}
        setOpen={setOpen}
        status={status}
        changeStatus={changeStatus}
        loading={loading}
        currentStatus={atteendance?.status || 'Active'}
      />
      <Toaster />

      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography variant="h4" gutterBottom>
          Attendance
        </Typography>
        <Button
          component={RouterLink}
          to={`/dashboard/division/organaization/view/attendance/create/${orgId}`}
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

export default AttendenceList;

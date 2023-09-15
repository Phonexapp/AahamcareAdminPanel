import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Chip,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { deepOrange, deepPurple } from '@mui/material/colors';
import { useState } from 'react';
import StatusPopup from '../../../components/StatusPopup/StatusPopup';
import axios from '../../../utils/axios';

function OrgList({ item, getDivisions }) {
  console.log(item)
  const navigate = useNavigate();

  // Change Status
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const status = ['Active', 'Inactive'];

  const changeStatus = async (status) => {
    console.log(status);
    // const {data} =  await axios.patch(`v1/admin/division-status/${item._id}`, {status: status});
    setLoading(false)
    setOpen(false)
    await getDivisions()
  };

  return (
    <Paper elevation={6} sx={{ padding: '10px' }}>
      <StatusPopup
        open={open}
        setOpen={setOpen}
        status={status}
        changeStatus={changeStatus}
        currentStatus={item?.status}
        loading= {loading}
      />
      <Stack
        sx={{ mb: 3, cursor: 'pointer' }}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Box
          onClick={() => navigate(`/dashboard/division/list/${item?._id}`)}
          sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: 1 }}
        >
          <Avatar sx={{ bgcolor: deepPurple[500] }}>{item.name.substring(0, 1)}</Avatar> <b>{item.name}</b>
        </Box>

        <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={3}>
          <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
            {item.status === 'Active' ? (
              <Chip
                onClick={() => setOpen(true)}
                icon={<CheckCircleIcon color="success" />}
                label="Active"
                sx={{ color: '#54D62C' }}
              />
            ) : (
              <Chip
                onClick={() => setOpen(true)}
                icon={<CancelIcon color="error" />}
                label="Inactive"
                sx={{ color: '#FF4842' }}
              />
            )}
          </Stack>
          <Stack
            onClick={() => navigate(`/dashboard/division/edit/${item?._id}`)}
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={1}
          >
            <EditIcon />
          </Stack>
        </Stack>
      </Stack>

      {/* Accordin */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography>Discription</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{item.discription}</Typography>
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
}

export default OrgList;

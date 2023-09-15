import { Box, Button, CardMedia, Divider, Grid, Paper, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import moment from 'moment';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Accordions from '../Accordion/Accordion';
import { CLOUDE_URL } from '../../utils/BaseUrl';
import axios from '../../utils/axios';
import { notifyError, notifySucess, Alert } from '../../utils/alert';
import StatusPopup from '../StatusPopup/StatusPopup';

function ItemDetail({ store, getStore }) {
  const navigate = useNavigate();
  const TimeAndDate = moment(store.createdAt).format('MMMM Do YYYY, h:mm:ss a');
  const color = store?.status === 'Active' ? '#5CFF5C' : store?.status === 'Delete' ? '#FF5349' : '#FFFF8A';
  const activeColor = store.status === 'Inactive' ? 'success' : 'error';
  // Change Status
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const status = ['Active', 'Inactive', 'Fullfilled'];
  const changeStatus = async (value) => {
    try {
      setLoading(true);
      const { data } = await axios.patch(`v1/admin/store-status/${store?._id}`, { status: value });
      setLoading(false);
      setOpen(false);
      await getStore();
      notifySucess(data?.message);
    } catch (error) {
      notifyError(error.message);
      setLoading(false);
    }
  };

  return (
    <Paper elevation={2}>
      <StatusPopup
        open={open}
        setOpen={setOpen}
        status={status}
        changeStatus={changeStatus}
        loading={loading}
        currentStatus={store?.status || 'Active'}
      />

      <Stack
        direction="row"
        justifyContent="center"
        alignItems="flex-end"
        spacing={2}
        sx={{ height: '100%' }}
        divider={<Divider orientation="vertical" flexItem />}
      >
        <Box sx={{ width: '100%', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <span style={{ fontWeight: 'bold', fontSize: '20px' }}>{store?.item}</span>
          <Grid container spacing={2}>
            <Grid item md={6}>
              <CardMedia component="img" height="200" width="200" image={CLOUDE_URL + store?.photo} alt={store?.item} />
            </Grid>
          </Grid>
          <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
            <LoadingButton variant="contained" onClick={() => navigate(`/dashboard/store/edit/${store?._id}`)}>
              <EditIcon /> Edit
            </LoadingButton>
            <LoadingButton loading={loading} variant="contained" color={activeColor} onClick={() => setOpen(true)}>
              Change status
            </LoadingButton>
          </Stack>
        </Box>

        <Box sx={{ width: '100%', padding: '20px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <span style={{ backgroundColor: '#f9fafb', padding: '5px' }}>
            Created at : <b>{TimeAndDate}</b>{' '}
          </span>
          <span style={{ backgroundColor: '#f9fafb', padding: '5px' }}>
            Requiremnet :{' '}
            <b>
              {store?.requirement} {store?.unit}
            </b>{' '}
          </span>
          <span style={{ backgroundColor: '#f9fafb', padding: '5px' }}>
            Total price : <b>{store?.totalPrice}</b>{' '}
          </span>
          <span style={{ backgroundColor: '#f9fafb', padding: '5px' }}>
            Unit price : <b>{store?.unitPrice}</b>{' '}
          </span>
          <span style={{ backgroundColor: '#cefad0', padding: '5px' }}>
            Needs (Balance requirement) :{' '}
            <b>
              {store?.remaining} {store?.unit}
            </b>{' '}
          </span>
          <span style={{ backgroundColor: color, padding: '5px' }}>
            Status : <b>{store.status}</b>{' '}
          </span>
        </Box>
      </Stack>

      <Accordions title={'Discription'} text={store.discription} />
    </Paper>
  );
}

export default ItemDetail;

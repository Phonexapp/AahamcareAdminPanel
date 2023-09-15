import { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import { Box, Divider, Paper, Stack } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PaidIcon from '@mui/icons-material/Paid';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import moment from 'moment';
import { Toaster } from 'react-hot-toast';
import Menu from '../drop-down-menu/DropDownMenu';
import StatusPopup from '../popup/PopupList';
import axios from '../../utils/axios'
import { Alert,notifySucess,notifyError } from '../../utils/alert';

function Donations({ item }) {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const status = ["Received", "Processing", "Completed"]
  const menuItems = ['Print Invoice', 'Change Status', 'Deactivate'];
 
  
 const deleteDonation = async ()=>{
  console.log("delete");
  const {isConfirmed} = await Alert('Are you sure?', 'you want to Delete this')
  if(isConfirmed){
    await axios.delete(`v1/admin/store-donation/${item._id}`)
    notifyError("Deleted Successfully")
  }
 }
  const changeStatus =async (value) => {
    setOpen(false);
    const {data} = await axios.patch(`v1/admin/status/${item._id}`,{status:value})
    notifySucess("status changed successfully")
  };


  const menuFunction = async (value) => {
    if(value === "Change Status"){
      setOpen(true);
    } else if(value === "Delete"){
      deleteDonation()
    } else if(value === "Print Invoice"){
      navigate(`/dashboard/event/donation/invoice/${item?._id}`)
    }
  };
  const date = moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a');
  const color =
    item?.status === 'Received'
      ? '#c5f0cb'
      : item?.status === 'Processing'
      ? '#c5e9f0'
      : item?.status === 'Completed'
      ? '#f0efc5'
      : '';

  return (
    <Paper elevation={2} sx={{ backgroundColor: color }}>
      <Toaster/>
      <StatusPopup 
     
      open={open}
      changeStatus={changeStatus}
      status={status}
      defaultValue={item.status}
      setOpen={setOpen}
      />
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        spacing={2}
        sx={{ height: '100%' }}
        divider={<Divider orientation="vertical" flexItem />}
      >
        <Box sx={{ width: '100%', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <span
            style={{
              color: '#9e9e9e',
              display: 'flex',
              alignContent: 'center',
              justifyContent: 'flex-start',
              gap: '10px',
            }}
          >
            {' '}
            <AccountCircleIcon /> Contributor
          </span>
          <span style={{ fontSize: '20px', fontWeight: 'bold' }}>{item?.userId?.name}</span>
          <span>
            Email : <b>{item?.userId?.email}</b>
          </span>
          <span>
            Phone : <b>{item?.userId?.phone_no}</b>
          </span>
          <span>
            Pancerd No : <b>001242224545</b>
          </span>
          <span>
            Status : <b>{item.status}</b>
          </span>
        </Box>

        <Box sx={{ width: '100%', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
            {' '}
            <span
              style={{
                color: '#9e9e9e',
                display: 'flex',
                alignContent: 'center',
                justifyContent: 'flex-start',
                gap: '10px',
              }}
            >
              <PaidIcon /> Payment details
            </span>
            <Menu menuFunction={menuFunction} menuItems={menuItems} deleteDonation={deleteDonation}  />
          </Box>

          <span>
            Payment ID: <b>{item?.paymentId}</b>
          </span>
          <span>
            Date: <b>{date}</b>
          </span>

          <span>
            Bank: <b>HDFC</b>
          </span>

          <span>
          Donated Tickets: <b>{item.donatedTickets}</b>
          </span>
          <Box
            sx={{
              backgroundColor: '#3944BC',
              fontSize: '50px',
              color: 'white',
              width: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CurrencyRupeeIcon /> {item?.totalAmount}
          </Box>
        </Box>
      </Stack>
    </Paper>
  );
}

export default Donations;

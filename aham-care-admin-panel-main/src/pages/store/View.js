import { Box, Container } from '@mui/material';
import { useParams } from 'react-router-dom';

import { useEffect, useState } from 'react';
import ItemDetail from '../../components/store/ItemDetail';
import Donation from './Donations';
import axios from '../../utils/axios';
import { notifyError } from '../../utils/alert';
import Loading from '../../components/loading/Loading'

function View() {
  const { id } = useParams();
  const [store, setStore] = useState({});
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(false);

  const getStore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`v1/admin/store/${id}`);
      setStore(data.store);
      const donation = await axios.get(`v1/admin/donations/${id}`);
      setDonations(donation.data.donations);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      notifyError(error.message);
    }
  };

  useEffect(() => {
    getStore();
  }, []);
  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Loading loading={loading}/>
      <ItemDetail store={store} getStore={getStore} />
      Donations
      {donations?.length === 0 ? (
        <Box sx={{ color: 'red' }}>No Donations at yet</Box>
      ) : (
        <>
          {donations?.map((item, i) => (
            <Donation key={i} item={item} />
          ))}
        </>
      )}
    </Container>
  );
}

export default View;

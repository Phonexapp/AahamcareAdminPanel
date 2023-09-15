import { Box, Container } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ItemDetail from '../../components/event/ItemDetails';
import axios from '../../utils/axios';
import Donation from '../../components/event/Donation';
import Loading from '../../components/loading/Loading';

function View() {
  const { id } = useParams();
  const [event, setEvent] = useState({});
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(false);

  const getEvent = async () => {
    const { data } = await axios.get(`v1/admin/event/${id}`);
    setEvent(data);
  };

  const eventDonations = async () => {
    const { data } = await axios.get(`v1/admin/eventDonation/${id}`);
    setDonations(data.donations);
  };

  const getData = async () => {
    try {
      setLoading(true);
      await getEvent();
      await eventDonations();
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Loading loading={loading}/>
      <ItemDetail event={event} />
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

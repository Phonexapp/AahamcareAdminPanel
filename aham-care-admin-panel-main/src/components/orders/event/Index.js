import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';

import axios from '../../../utils/axios';
import { notifyError } from '../../../utils/alert';
import EventOrderTable from './EventOrders';
import Loading from '../../loading/Loading';

function Index() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const getAllorders = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('v1/admin/eventOrders');
      setOrders(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      notifyError(error);
    }
  };
  useEffect(() => {
    getAllorders();
  }, []);
  return (
    <>
    <Toaster/>
      <Loading loading={loading} />
      <EventOrderTable rows={orders} />
    </>
  );
}

export default Index;

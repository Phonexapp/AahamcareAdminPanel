import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import axios from '../../../utils/axios';
import { notifyError } from '../../../utils/alert';
import StoreOrderTable from './StoreOrders';
import Loading from '../../loading/Loading';

function Index() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const getAllorders = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('v1/admin/storeOrders');
      setOrders(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      notifyError(error.message);
    }
  };
  useEffect(() => {
    getAllorders();
  }, []);
  return (
    <>
      <Toaster />
      <Loading loading={loading} />
      <StoreOrderTable rows={orders} />
    </>
  );
}

export default Index;

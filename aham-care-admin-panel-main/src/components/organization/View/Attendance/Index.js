import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import AttendanceList from './AttendanceList';
import axios from '../../../../utils/axios';
import { notifyError, notifySucess } from '../../../../utils/alert';
import Loading from '../../../loading/Loading';

function Index() {
  const { orgId } = useParams();
  const [loading, setLoading] = useState(false);
  const [recidence, setRecidence] = useState([]);

  const AttendenceLists = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`v1/admin/getAllRecidence/${orgId}`);
      setRecidence(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      notifyError(error.message);
    }
  };

  useEffect(() => {
    AttendenceLists();
  }, []);
  return (
    <Container>
      <Loading loading={loading} />
      <AttendanceList row={recidence} AttendenceLists={AttendenceLists} />
    </Container>
  );
}

export default Index;

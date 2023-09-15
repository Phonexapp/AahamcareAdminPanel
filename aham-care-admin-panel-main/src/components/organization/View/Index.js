import { useParams } from 'react-router-dom';
import { Container, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import axiosInstance from '../../../utils/axios';
import Head from './Head';
import TabPanel from '../TabPanel';
import Loading from '../../loading/Loading';
import NavigateButtons from './NavigateButtons';

function View() {
  const { id } = useParams();
  console.log(id);
  const [loading, setLoading] = useState(false);
  const [organaization, setOrganaization] = useState({});
  const getOrganaization = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get(`/v1/admin/organaizatioById/${id}`);
      setOrganaization(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrganaization();
  }, []);

  return (
    <Container>
      <Loading loading={loading} />
      <Stack direction="column" justifyContent="center" spacing={1}>
        <Head organaization={organaization} />
        <TabPanel organaization={organaization} />
        <NavigateButtons id={organaization?._id} />
      </Stack>
    </Container>
  );
}

export default View;

import { useParams } from 'react-router-dom';
import { Container, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { getById } from '../../redux/Slices.js/oldageHome';
import axiosInstance from '../../utils/axios';
import Views from '../../components/organization/View';
import TabPanel from '../../components/organization/TabPanel';
import Loading from '../../components/loading/Loading';
import Address from '../../components/organization/Address';

function View() {
  const { id } = useParams();
  console.log(id);
  const [loading, setLoading] = useState(false);
  const [organaization, setOrganaization] = useState({});
  const getOrganaization = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get(`/v1/admin/organaizatioById/${id}`);
      console.log(data, 'organaization');
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
      <Stack direction="column" justifyContent="center" alignItems="flex-end" spacing={4}>
        <Views organaization={organaization} />
        <TabPanel organaization={organaization} />
      </Stack>
    </Container>
  );
}

export default View;

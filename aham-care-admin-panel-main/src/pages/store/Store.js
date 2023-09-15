import React, { useEffect, useState } from 'react';
import { Box, Grid, Stack, Button, Typography, Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import BasicCard from '../../components/card/Card';
import Iconify from '../../components/iconify';
import axios from '../../utils/axios';
import { getStores } from '../../redux/Slices.js/storeSlice';
import Loading from '../../components/loading/Loading';
import ProductTable from '../../components/store/ProductTable';


function Store() {
  const [loading, setLoading] = useState(false);
  const [stores, setStores] = useState([]);

  const getAllStores = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('v1/admin/store');
      setStores(data.stores);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };


  useEffect(() => {
    getAllStores();
  }, []);
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Loading loading={loading}/>
        <Typography variant="h4" gutterBottom>
          Store
        </Typography>
        <Button
          LinkComponent={RouterLink}
          to="/dashboard/store/create"
          variant="contained"
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          Add new srore
        </Button>
      </Stack>
      <Grid container spacing={2}>
        <ProductTable stores={stores} />
      </Grid>
    </Container>
  );
}

export default Store;

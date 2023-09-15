import React, { useEffect, useState } from 'react';
import { Box, Grid, Stack, Button, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import BasicCard from '../../components/card/Card';
import Iconify from '../../components/iconify';
import Loading from '../../components/loading/Loading';
import axios from '../../utils/axios';

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const getAllEvents = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('v1/admin/event');
      setEvents(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllEvents();
  }, []);
  return (
    <Box>
      <Loading loading={loading} />
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Events
        </Typography>
        <Button
          variant="contained"
          startIcon={<Iconify icon="eva:plus-fill" />}
          LinkComponent={RouterLink}
          to="/dashboard/event/create"
        >
          Add new event
        </Button>
      </Stack>
      <Grid container spacing={2}>
        {events.map((event, i) => (
          <Grid key={i} item xs={4}>
            <BasicCard event={event} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Events;

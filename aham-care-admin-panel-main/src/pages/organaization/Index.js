import { Container, Stack, Button, Typography, Grid, Paper, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { useEffect, useReducer, useState } from 'react';
import arrayMove from 'array-move';
import OrgList from './division/DivisionList';
import axios from '../../utils/axios';
import { divisionReducer } from '../../reducers/divisionReducer';
import Loading from '../../components/loading/Loading';

function Index() {
  // Change Order
  const [items, setItems] = useState([]);
  const onSortEnd = ({ oldIndex, newIndex }) => {
    setItems((prevItems) => arrayMove(prevItems, oldIndex, newIndex));
  };

  const SortableItem = SortableElement(({ value }) => (
    <Box
      sx={{
        backgroundColor: '#ffff',
        padding: 1,
        mb: 1,
        borderRadius: 2,
        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
        zIndex: 1000,
        cursor: 'pointer',
      }}
    >
      {value?.name}
    </Box>
  ));

  const SortableList = SortableContainer(({ items }) => {
    return (
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          position: 'absolute',
          top: '45px',
          right: '20px',
          p: 1,
          zIndex: 400,
          backgroundColor: '#f0f0f0',
        }}
      >
        {items.map((value, index) => (
          <SortableItem key={`item-${value.order}`} index={index} value={value} />
        ))}

        <Button onClick={changeOrder} variant="outlined">
          Submit
        </Button>
      </Paper>
    );
  });

  const changeOrder =async () => {
    const newOrderdArray = [];
    const newOrder = items.map((item, i) => {
      const filteredArray = divisions.filter((div) => {
        if (item._id === div._id) {
          newOrderdArray.push({...div, order: i })
          return { ...div, order: i };

        } 

        return null;
      });
      
      return filteredArray;
    });

    
    dispatch({
      type: 'DIVISION_SUCCESS',
      payload: newOrderdArray,
    });

    const {data} = await axios.post('v1/admin/division-order', newOrderdArray);
    console.log('data->',data)

  };

  const [{ loading, error, divisions }, dispatch] = useReducer(divisionReducer, {
    loading: false,
    divisions: [],
    error: '',
  });

  // ===============
  const getDivisions = async () => {
    try {
      dispatch({
        type: 'DIVISION_REQUEST',
      });
      const { data } = await axios.get('v1/admin/division');
      setItems(data);

      dispatch({
        type: 'DIVISION_SUCCESS',
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: 'DIVISION_ERROR',
        payload: error.response.data.message,
      });
    }
  };
  // ===============

  const [orderWindow, setOrderWindow] = useState(false);

  useEffect(() => {
    getDivisions();
  }, []);

  return (
    <Container>
      {loading && <Loading loading={loading} />}
      <Stack sx={{ position: 'relative' }} direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Division
        </Typography>
        <Box>
          <Button onClick={() => setOrderWindow(!orderWindow)} variant="contained" sx={{ mr: 2 }}>
            Change Order
          </Button>

          <Button LinkComponent={RouterLink} to="/dashboard/division/create" variant="contained">
            Create new division
          </Button>
        </Box>

        {orderWindow && <SortableList items={items} onSortEnd={onSortEnd} />}
      </Stack>
      {divisions.length === 0 ? (
        <Typography>No Divisions at yet</Typography>
      ) : (
        <Grid container spacing={2}>
          {divisions.map((item, i) => (
            <Grid key={i} item xs={12} md={6}>
              <OrgList item={item} getDivisions={getDivisions} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default Index;

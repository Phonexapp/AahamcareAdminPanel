import { Button, Container, Grid, InputLabel, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Formik, Form as Forms } from 'formik';
import { useParams } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import * as yup from 'yup';
import axios from '../../utils/axios';
import { Alert, notifySucess, notifyError } from '../../utils/alert';
import Loading from '../loading/Loading';

function Form() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [initialValue, setInitialValue] = useState({
    event: '',
    totalTickets: '',
    startDateTime: '',
    endDateTime: '',
    totalPrice: '',
    unitPrice: '',
    discription: '',
  });

  const handleFormSubmit = async (values, { resetForm }) => {
    if (id) {
      updateEvent(values, resetForm);
      return;
    }

    Alert('Are you sure?', 'you want to add this').then(async (result) => {
      if (result.isConfirmed) {
        await axios.post('v1/admin/event', values);
        notifySucess('Your entry was saved');
        resetForm();
      } else {
        notifyError('Your action was cancelled');
        resetForm();
      }
    });
  };

  // Update Event
  const getInitialValue = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const { data } = await axios.get(`v1/admin/event/${id}`);
      setInitialValue({
        event: data.event,
        totalTickets: data.totalTickets,
        startDateTime: data?.startDateTime,
        endDateTime: data?.endDateTime,
        totalPrice: data?.totalPrice,
        unitPrice: data?.unitPrice,
        discription: data?.discription,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      notifyError(error.message);
    }
  };

  const updateEvent = async (values, resetForm) => {
    try {
      Alert('Are you sure?', 'you want to add this').then(async (result) => {
        if (result.isConfirmed) {
          setLoading(true);
          await axios.put(`v1/admin/editEvent/${id}`, values);
          notifySucess('Your entry was saved');
          setLoading(false);
        } else {
          resetForm()
          notifyError('Your action was cancelled');
        }
      });
    } catch (error) {
      resetForm()
      setLoading(false);
      notifyError(error.message);
    }
  };

  useEffect(() => {
    getInitialValue();
  }, []);

  return (
    <Container>
      <Toaster />
      <Loading loading={loading} />
      <Typography variant="h4" gutterBottom>
        {id ? 'Edit event' : 'Create New Event'}
      </Typography>

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValue}
        validationSchema={checkoutSchema}
        enableReinitialize
      >
        {({ values, errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting }) => (
          <Forms onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item sm={12} md={6}>
                <TextField
                  fullWidth
                  label="Name of the event"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.event}
                  name="event"
                  error={!!touched.event && !!errors.event}
                  helperText={touched.event && errors.event}
                />
              </Grid>
              <Grid item sm={12} md={6}>
                <TextField
                  fullWidth
                  label="Total tickets"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.totalTickets}
                  name="totalTickets"
                  error={!!touched.totalTickets && !!errors.totalTickets}
                  helperText={touched.totalTickets && errors.totalTickets}
                />
              </Grid>

              <Grid item sm={12} md={6}>
                <TextField
                  fullWidth
                  label="Total Price"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.totalPrice}
                  name="totalPrice"
                  error={!!touched.totalPrice && !!errors.totalPrice}
                  helperText={touched.totalPrice && errors.totalPrice}
                />
              </Grid>

              <Grid item sm={12} md={6}>
                <TextField
                  fullWidth
                  label="Unit Price"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.unitPrice}
                  name="unitPrice"
                  error={!!touched.unitPrice && !!errors.unitPrice}
                  helperText={touched.unitPrice && errors.unitPrice}
                />
              </Grid>

              <Grid item sm={12} md={6}>
                <InputLabel shrink htmlFor="datetime-input-end">
                  Pick starting date
                </InputLabel>
                <TextField
                  fullWidth
                  type="datetime-local"
                  id="datetime-input"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.startDateTime}
                  name="startDateTime"
                  error={!!touched.startDateTime && !!errors.startDateTime}
                  helperText={touched.startDateTime && errors.startDateTime}
                />
              </Grid>

              <Grid item sm={12} md={6}>
                <InputLabel shrink htmlFor="datetime-input-end">
                  Pick end date
                </InputLabel>
                <TextField
                  fullWidth
                  type="datetime-local"
                  variant="outlined"
                  id="datetime-input-end"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.endDateTime}
                  name="endDateTime"
                  error={!!touched.endDateTime && !!errors.endDateTime}
                  helperText={touched.endDateTime && errors.endDateTime}
                />
              </Grid>

              <Grid item md={6} sm={12}>
                <TextField
                  id="outlined-multiline-static"
                  label="Discription"
                  multiline
                  fullWidth
                  rows={4}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.discription}
                  name="discription"
                  error={!!touched.discription && !!errors.discription}
                  helperText={touched.discription && errors.discription}
                />
              </Grid>
            </Grid>
            <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
              <Button type="submit" variant="contained" color="success" disabled={isSubmitting}>
                Submit
              </Button>
            </Stack>
          </Forms>
        )}
      </Formik>
    </Container>
  );
}

const checkoutSchema = yup.object().shape({
  event: yup.string().required('Event title is required'),
  totalTickets: yup.number().typeError('Total price must be a number').required('This field required'),
  startDateTime: yup.string().required('Starting Date is required'),
  endDateTime: yup.string().required('Ending Date is required'),
  totalPrice: yup.number().typeError('Total price must be a number').required('Total Price is required'),
  unitPrice: yup.number().typeError('Total price must be a number').required('Unit Price Is required'),
  discription: yup.string().required('Discription Is required'),
});
const initialValues = {
  event: '',
  totalTickets: '',
  startDateTime: '',
  endDateTime: '',
  totalPrice: '',
  unitPrice: '',
  discription: '',
};

export default Form;

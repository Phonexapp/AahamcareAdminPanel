import { Button, Container, Grid, InputLabel, Stack, TextField, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Formik, Form as Forms } from 'formik';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { Toaster } from 'react-hot-toast';
import axiosInstance from '../../../utils/axios';
import Loading from '../../loading/Loading'
import { Alert, notifySucess, notifyError } from '../../../utils/alert';

function Form() {
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState({
    name: '',
    discription: '',
  });

  const [loading, setLoading] = useState(false);
  const getInitialValues = async () => {
    if (!id) return;
    setLoading(true);
    const { data } = await axiosInstance.get(`v1/admin/division/${id}`);
    console.log(data, '->');
    setInitialValues({
      name: data?.name,
      discription: data?.discription,
    });

    setLoading(false);
  };

  const addNewDivision = async (values) => {
    console.log(values, 'values');
    const { data } = await axiosInstance.post('v1/admin/createDivision', values);
    console.log(data);
  };

  const updateDivision = async (values) => {
    console.log(values, 'values');
    const { data } = await axiosInstance.put(`v1/admin/division/${id}`, values);
    notifySucess(data.message);
  };

  

  const handleFormSubmit = async (values, { resetForm }) => {
    Alert('Are you sure?', 'you want to add this').then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        if(!id){
          await addNewDivision(values);
          resetForm();
          notifySucess('Your entry was saved');
        } else {
          await updateDivision(values)
        }
       setLoading(false);
      } else {
        console.log('else');
        notifyError('Your action was cancelled');
        resetForm();
        setLoading(false);
      }
    });
  };

  useEffect(()=>{
    getInitialValues()
  }, [])
  return (
    <Container>
      <Toaster />
      <Loading loading={loading}/>
      <Typography variant="h4" gutterBottom>
        Create New Division
      </Typography>

      <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={checkoutSchema} enableReinitialize>
        {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue, isSubmitting }) => (
          <Forms onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item sm={12} md={12}>
                <TextField
                  fullWidth
                  label="Name of the division"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  name="name"
                  error={!!touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                />
              </Grid>

              <Grid item md={12} sm={12}>
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
            <Stack mt={5} direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
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
  name: yup.string().required('Division Name is required'),
  discription: yup.string().required('Discription Is required'),
});

export default Form;

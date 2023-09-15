import { Button, Container, Grid, InputLabel, Stack, TextField, Typography } from '@mui/material';
import { Formik, Form as Forms } from 'formik';
import * as yup from 'yup';
import { useLocation, useParams } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import axiosInstance from '../../utils/axios';
import { Alert, notifySucess, notifyError } from '../../utils/alert';

function Form() {
  const {id} = useParams('id')
  const location = useLocation();
  console.log('id',id);
 
  
  const addOldageHome = async (values) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });

    formData.append('typeId', id);

    const { data } = await axiosInstance.post('v1/admin/organaization', formData);
    console.log(data);
  };

  const handleFormSubmit = async (values, { resetForm }) => {
    Alert('Are you sure?', 'you want to add this').then(async (result) => {
      if (result.isConfirmed) {
        await addOldageHome(values);
        resetForm();
        notifySucess('Your entry was saved');
      } else {
        console.log('else');
        notifyError('Your action was cancelled');
        resetForm();
      }
    });
  };
  return (
    <Container>
      <Toaster />
      <Typography variant="h4" gutterBottom>
        Create New 
      </Typography>

      <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={checkoutSchema}>
        {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue, isSubmitting }) => (
          <Forms onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item sm={12} md={6}>
                <TextField
                  fullWidth
                  label="Name of the organaization"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  name="name"
                  error={!!touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                />
              </Grid>
              <Grid item md={6} sm={12}>
                <TextField
                  fullWidth
                  label="Place"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.place}
                  name="place"
                  error={!!touched.place && !!errors.place}
                  helperText={touched.place && errors.place}
                />
              </Grid>

              <Grid item md={6} sm={12}>
                <TextField
                  fullWidth
                  label="Phone No"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.phone_no}
                  name="phone_no"
                  error={!!touched.phone_no && !!errors.phone_no}
                  helperText={touched.phone_no && errors.phone_no}
                />
              </Grid>

              <Grid item md={6} sm={12}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                />
              </Grid>

              <Grid item md={6} sm={12}>
                <TextField
                  id="outlined-multiline-static"
                  label="Address"
                  multiline
                  fullWidth
                  rows={4}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.address}
                  name="address"
                  error={!!touched.address && !!errors.address}
                  helperText={touched.address && errors.address}
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

              <Grid item md={6} sm={12}>
                <InputLabel shrink htmlFor="bootstrap-input">
                  Add Cover Photo (*jpeg/jpg)
                </InputLabel>
                <TextField
                  sx={{ width: '100%' }}
                  type="file"
                  onBlur={handleBlur}
                  onChange={(event) => setFieldValue('photo', event.target.files[0])}
                  name="photo"
                  error={!!touched.photo && !!errors.photo}
                  helperText={touched.photo && errors.photo}
                />
              </Grid>

              <Grid item md={6} sm={12}>
                <InputLabel shrink htmlFor="bootstrap-input">
                  Add Document (PDF Files)
                </InputLabel>
                <TextField
                  sx={{ width: '100%' }}
                  type="file"
                  onBlur={handleBlur}
                  onChange={(event) => setFieldValue('pdf', event.target.files[0])}
                  name="pdf"
                  error={!!touched.pdf && !!errors.pdf}
                  helperText={touched.pdf && errors.pdf}
                />
              </Grid>

              {/* <Grid item md={6} sm={12}>
                <InputLabel shrink htmlFor="bootstrap-input">
                  Add Requirement (excel File)
                </InputLabel>
                <TextField
                  type="file"
                  sx={{ width: '100%' }}
                  onBlur={handleBlur}
                  onChange={(event) => setFieldValue('excel', event.target.files[0])}
                  name="excel"
                  error={!!touched.excel && !!errors.excel}
                  helperText={touched.excel && errors.excel}
                />
              </Grid> */}
            </Grid>
            <Stack mt={3} direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
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
  name: yup.string().required('Organaization Name is required'),
  place: yup.string().required('Place is required'),
  email: yup.string().email('invalid email').required('Email is required'),
  phone_no: yup.string().required('Phone Number id required'),
  address: yup.string().required('Address is required'),
  discription: yup.string().required('Discription Is required'),
  photo: yup
    .mixed()
    .required('Please upload a file')
    .test('fileFormat', 'Only jpeg or jpg files are allowed', (value) => {
      if (value) {
        return ['image/jpeg', 'image/jpg'].includes(value.type);
      }
      return true;
    }),

  pdf: yup
    .mixed()
    .required('Please upload a file')
    .test('fileFormat', 'Only pdf files are allowed', (value) => {
      if (value) {
        return ['application/pdf'].includes(value.type);
      }
      return true;
    }),

});
const initialValues = {
  name: '',
  place: '',
  phone_no: '',
  email: '',
  address: '',
  discription: '',
  photo: null,
  // excel: null,
  pdf: null,
};

export default Form;

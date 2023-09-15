import { useEffect, useState } from 'react';
import { Button, CardMedia, Container, Grid, InputLabel, Stack, TextField, Typography } from '@mui/material';
import { Formik, Form as Forms } from 'formik';
import * as yup from 'yup';
import { Link, useLocation, useParams } from 'react-router-dom';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Toaster } from 'react-hot-toast';
import axiosInstance from '../../../utils/axios';
import { Alert, notifySucess, notifyError } from '../../../utils/alert';
import Loading from '../../loading/Loading';
import { CLOUDE_URL } from '../../../utils/BaseUrl';

function Form() {
  const { id } = useParams('id');
  const { orgId } = useParams();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [organaization, setOrganaization] = useState(null);

  const [initialValues, setInitialValues] = useState({
    name: '',
    place: '',
    phone_no: '',
    email: '',
    address: '',
    discription: '',
    photo: null,
    pdf: null,
  });

  const handleImageChange = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
  };

  // Update Orgnaization
  const getInitialValues = async () => {
    try {
      if (!orgId) return;
      setLoading(true);
      const { data } = await axiosInstance.get(`/v1/admin/organaizatioById/${orgId}`);
      setInitialValues({
        name: data?.name,
        place: data?.place,
        phone_no: data?.phone,
        email: data?.email,
        address: data?.address,
        discription: data?.discription,
        photo: null,
        pdf: null,
      });
      setOrganaization(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const updateOrganaization = async (values) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append('typeId', id);
    const { data } = await axiosInstance.put(`v1/admin/organaization/${orgId}`, formData);
    return data;
  };

  const addOrganization = async (values) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append('typeId', id);
    const { data } = await axiosInstance.post('v1/admin/organaization', formData);
  };

  const handleFormSubmit = async (values, { resetForm }) => {
   try {
    Alert('Are you sure?', 'you want to add this').then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        if (orgId) {
          const response = await updateOrganaization(values);
          console.log('res->', response);
          notifySucess('updated successfully');
        } else {
        //  constresponse = await addOrganization(values);
          resetForm();
          notifySucess('Your entry was saved');
        }
        setLoading(false);
      } else {
        notifyError('Your action was cancelled');
        resetForm();
      }
    });
   } catch (error) {
    setLoading(false)
    notifyError(error.message);
   }
  };

  useEffect(() => {
    getInitialValues();
  }, []);
  return (
    <Container>
      <Toaster />
      <Loading loading={loading} />
      <Typography variant="h4" gutterBottom>
        {orgId ? 'Edit Organaization' : 'Create New Organaization'}
      </Typography>

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
        enableReinitialize
      >
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
                  onChange={(event) => {
                    setFieldValue('photo', event.target.files[0]);
                    handleImageChange(event);
                  }}
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
              <Grid item md={6} sm={12}>
                {image && (
                  <CardMedia
                    sx={{ background: '#D0D3D8', p: 0.5, borderRadius: '5px', maxWidth: '150px' }}
                    component="img"
                    alt="Preview"
                    image={image}
                  />
                )}

                {orgId && !image && (
                  <CardMedia
                    sx={{ background: '#D0D3D8', p: 0.5, borderRadius: '5px', maxWidth: '150px' }}
                    component="img"
                    alt="Preview"
                    image={CLOUDE_URL + organaization?.photo}
                  />
                )}
              </Grid>

              <Grid item md={6} sm={12}>
                {orgId && (
                  <Link to={CLOUDE_URL + organaization?.documents} target="_blank" rel="noopener noreferrer">
                    <Button variant="outlined">
                      {' '}
                      <PictureAsPdfIcon sx={{ mr: 1 }} /> View PDF{' '}
                    </Button>
                  </Link>
                )}
              </Grid>
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
    .nullable()
    .test('fileFormat', 'Only jpeg or jpg or png files are allowed', (value) => {
      if (value) {
        return ['image/jpeg', 'image/jpg', 'image/png'].includes(value.type);
      }
      return true;
    }),

  pdf: yup
    .mixed()
    .nullable()
    .test('fileFormat', 'Only pdf files are allowed', (value) => {
      if (value) {
        return ['application/pdf'].includes(value.type);
      }
      return true;
    }),
});

export default Form;

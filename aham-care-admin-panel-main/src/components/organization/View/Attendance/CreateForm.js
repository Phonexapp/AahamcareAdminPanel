import { Container, Grid, CardMedia, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFormik, form } from 'formik';
// import { makeStyles } from '@material-ui/core/styles';
import * as yup from 'yup';
import { Toaster } from 'react-hot-toast';
import { LoadingButton } from '@mui/lab';
import axios from '../../../../utils/axios';
import { Alert, notifySucess, notifyError } from '../../../../utils/alert';

import Loading from '../../../loading/Loading';
import {CLOUDE_URL} from '../../../../utils/BaseUrl';

function Form() {
  const { orgId } = useParams();
  const { attId } = useParams();
  const edit = !!attId;
  const [loadingData, setLoadingData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [speker, setSpeker] = useState({});
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
  };

  //   Add New Recidence
  const addNewRecidence = async (values) => {
    try {
      setLoading(true);
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
      });
      const { data } = await axios.post(`v1/admin/addRecidence/${orgId}`, formData);
      notifySucess('Data added successfully');
      setLoading(false);
    } catch (error) {
      notifyError(error.message);
      setLoading(false);
    }
  };

  const addRecidence = async (values, resetForm) => {
    console.log(values);

    const { isConfirmed } = await Alert('Are you sure?', 'you want to add this');
    if (isConfirmed) {
      addNewRecidence(values);
    } else {
      notifyError('You cancelled this request');
    }
  };

  // Update the Recidence
  const updateRecidence = async (values) => {
    try {
      const { isConfirmed } = await Alert('Are you sure?', 'you want to update this?');
      if (isConfirmed) {
        setLoading(true);
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
          formData.append(key, value);
        });
        const { data } = await axios.put(`v1/admin/update-recidence/${attId}`, formData);
        notifySucess('Updated successfully');
        getInitialValues()
        setLoading(false);
      } else {
        notifyError('You cancelled this request');
      }
    } catch (error) {
      setLoading(false);
      notifyError(error.message);
    }
  };

  const [initialValue, setIntialValue] = useState({
    name: '',
    age: '',
    place: '',
    photo: null,
  });

  const getInitialValues = async () => {
    if (!edit) return;
    setLoadingData(true);
    const { data } = await axios.get(`v1/admin/recidence-by-id/${attId}`);
    setIntialValue({
      name: data?.name,
      age: data?.age,
      place: data?.place,
    });
    setSpeker(data);
    setLoadingData(false);
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue, isSubmitting } = useFormik({
    initialValues: initialValue,
    validationSchema: checkoutSchema,
    enableReinitialize: edit,
    onSubmit: async (values, { resetForm }) => {
      if(edit){
        updateRecidence(values,resetForm)
      }else{
        addRecidence(values, resetForm);

      }
    },
  });

  useEffect(() => {
    getInitialValues();
  }, []);

  return (
    <Container>
      {<Loading loading={loading || loadingData} />}
      <Toaster />
      <Typography variant="h4" gutterBottom>
        {edit ? 'Edit Speker' : 'Add New Member'}
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.name}
              name="name"
              error={!!touched.name && !!errors.name}
              helperText={touched.name && errors.name}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6}>
            <TextField
              fullWidth
              label="Age"
              variant="outlined"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.age}
              name="age"
              error={!!touched.age && !!errors.age}
              helperText={touched.age && errors.age}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6}>
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

          <Grid item xs={12} sm={12} md={6}>
            <TextField
              sx={{ width: '100%' }}
              type="file"
              onBlur={handleBlur}
              onChange={(event) => {
                handleImageChange(event);
                setFieldValue('photo', event.target.files[0]);
              }}
              name="photo"
              error={!!touched.photo && !!errors.photo}
              helperText={touched.photo && errors.photo}
            />
          </Grid>
        </Grid>
        {image && (
          <CardMedia
            sx={{ background: '#D0D3D8', p: 0.5, borderRadius: '5px', maxWidth: '150px', mt: 2 }}
            component="img"
            alt="Preview"
            image={image}
          />
        )}

        {edit && !image && (
          <CardMedia
            sx={{ background: '#D0D3D8', p: 0.5, borderRadius: '5px', maxWidth: '150px', mt: 2 }}
            component="img"
            alt="Preview"
            image={CLOUDE_URL + speker?.photo}
          />
        )}
        <Stack mt={3} direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
          <LoadingButton type="submit" variant="contained" color="success" loading={isSubmitting}>
            Submit
          </LoadingButton>
        </Stack>
      </form>
    </Container>
  );
}

const checkoutSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  place: yup.string(),
  age: yup.string(),

  photo: yup
    .mixed()
    .nullable(true)
    .test('fileFormat', 'Only jpeg or jpg files are allowed', (value) => {
      if (value) {
        return ['image/jpeg', 'image/jpg', 'image/png'].includes(value.type);
      }
      return true;
    }),
});

export default Form;

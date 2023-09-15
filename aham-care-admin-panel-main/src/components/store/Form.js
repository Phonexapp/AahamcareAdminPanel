import { Button, CardMedia, Container, Grid, InputLabel, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Form as Forms } from 'formik';
import { Toaster } from 'react-hot-toast';
import * as yup from 'yup';
import axios from '../../utils/axios';
import { Alert, notifySucess, notifyError } from '../../utils/alert';
import { CLOUDE_URL } from '../../utils/BaseUrl';
import Loading from '../loading/Loading';

function Form() {
  const { storeId } = useParams();
  const edit = !!storeId;
  const [image, setImage] = useState(null);
  const [store, setStore] = useState({});
  const [loading, setLoading] = useState(false);
  const [initialValue, setIntialValue] = useState({
    item: '',
    requiremnt: '',
    unit: '',
    totalPrice: '',
    unitPrice: '',
    discription: '',
    photo: null,
  });

  const handleImageChange = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
  };

  // Add New Store Item
  const createStore = async (values) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      console.log(key, value);
      formData.append(key, value);
    });

    await axios.post('v1/admin/store', formData);
  };
  const handleFormSubmit = async (values, { resetForm }) => {
    if (edit) {
      await updateStore(values);
      return ;
    }

    Alert('Are you sure?', 'you want to add this').then(async (result) => {
      if (result.isConfirmed) {
        await createStore(values);
        resetForm();
        notifySucess('Your entry was saved');
      } else {
        notifyError('Your action was cancelled');
        resetForm();
      }
    });
  };

  // Update Store Items
  const getInitialValues = async (values) => {
    try {
      if (!edit) return;

      setLoading(true);
      const { data } = await axios.get(`v1/admin/store/${storeId}`);
      setIntialValue({
        item: data.store.item,
        requiremnt: data.store.requirement,
        unit: data.store.unit,
        totalPrice: data.store.totalPrice,
        unitPrice: data.store.unitPrice,
        discription: data.store.discription,
        photo: null,
      });
      setStore(data.store);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const updateStore = async (values) => {
    try {
      const { isConfirmed } = await Alert('Are you sure?', 'you want to add this', values);
      if (isConfirmed) {
        setLoading(true);
        const formData = new FormData();

        Object.entries(values).forEach(([key, value]) => {
          console.log(key, value);
          formData.append(key, value);
        });
        const { data } = await axios.put(`v1/admin/store/${storeId}`, formData);
        await getInitialValues();
        notifySucess(data.message);
        setLoading(false);
      } else {
        notifyError('Your action was cancelled');
      }
    } catch (error) {
      setLoading(false);
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
        Create New Store
      </Typography>

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValue}
        validationSchema={checkoutSchema}
        enableReinitialize
      >
        {({ setFieldValue, values, errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting }) => (
          <Forms onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item sm={12} md={6}>
                <TextField
                  fullWidth
                  label="Item"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.item}
                  name="item"
                  error={!!touched.item && !!errors.item}
                  helperText={touched.item && errors.item}
                />
              </Grid>
              <Grid item sm={12} md={6}>
                <TextField
                  fullWidth
                  label="Requirement"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.requiremnt}
                  name="requiremnt"
                  error={!!touched.requiremnt && !!errors.requiremnt}
                  helperText={touched.requiremnt && errors.requiremnt}
                />
              </Grid>

              <Grid item sm={12} md={6}>
                <TextField
                  fullWidth
                  label="Unit (kg / ltr )"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.unit}
                  name="unit"
                  error={!!touched.unit && !!errors.unit}
                  helperText={touched.unit && errors.unit}
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
                  label="Unit price"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.unitPrice}
                  name="unitPrice"
                  error={!!touched.unitPrice && !!errors.unitPrice}
                  helperText={touched.unitPrice && errors.unitPrice}
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
                  Add Product photo (*jpeg/jpg)
                </InputLabel>
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
                image={CLOUDE_URL + store?.photo}
              />
            )}
            <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2} sx={{ marginTop: '10px' }}>
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
  item: yup.string().required('Title name is required'),
  requiremnt: yup.string().required('Requiremnt is required'),
  unit: yup.string().required('Unit is required'),
  totalPrice: yup.number().typeError('Total price must be a number').required('Total price is required'),
  unitPrice: yup.number().typeError('Unit price must be a number').required('Unit price is required'),
  discription: yup.string().required('Discription Is required'),
  photo: yup
    .mixed()
    .nullable()
    .test('fileFormat', 'Only  jpeg or jpg or png files are allowed', (value) => {
      if (value) {
        return ['image/jpeg', 'image/jpg', 'image/png'].includes(value.type);
      }
      return true;
    }),
});

export default Form;

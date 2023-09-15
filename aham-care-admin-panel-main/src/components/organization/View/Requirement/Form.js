import { Button, Container, Grid, InputLabel, Stack, TextField, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Formik, Form as Forms } from 'formik';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import axiosInstance from '../../../../utils/axios';
import { Alert, notifySucess, notifyError } from '../../../../utils/alert';
import Loading from '../../../loading/Loading';

function Form() {
  const { orgId } = useParams();
  const { reqId } = useParams();

  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({
    item: '',
    requirement: '',
    requirementUnit: '',
    totalPrice: '',
    unitPrice: '',
  });
  const addNewRequirement = async (values) => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.post(`v1/admin/requirement/${orgId}`, values);
      setLoading(false);
      notifySucess('Your entry was saved');
    } catch (error) {
      setLoading(false);
      notifyError(error.message);
    }
  };
  // Edit Requiremnt
  const getReuirementById = async () => {
    if (!reqId) return;
    try {
      setLoading(true);
      const { data } = await axiosInstance.get(`v1/admin/requirement-by-id/${reqId}`);
      console.log(data,'data');
      setInitialValues({
        item: data.item,
        requirement: data.requirement,
        requirementUnit: data.requirementUnit,
        totalPrice: data.totalPrice,
        unitPrice: data.unitPrice,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      notifyError(error.message);
    }
  };

  const updateRequirement  =async (values) => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.put(`v1/admin/update-requirement/${reqId}`,values);
      setLoading(false);
      notifySucess(data.message);
      getReuirementById()
    } catch (error) {
      setLoading(false);
      notifyError(error.message);
    }
  }

  const handleFormSubmit = async (values, { resetForm }) => {
    Alert('Are you sure?', 'you want to add this').then(async (result) => {
      if (result.isConfirmed) {
        
        if(reqId){
          await updateRequirement(values)
        }else{
          await addNewRequirement(values);
        }



        resetForm();
        
      } else {
        notifyError('Your action was cancelled');
        resetForm();
      }
    });
  };

  useEffect(() => {
    getReuirementById();
  }, []);
  return (
    <Container>
      <Toaster />
      <Typography variant="h4" gutterBottom>
        Add Requirement
      </Typography>
      <Loading loading={loading} />
      <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={checkoutSchema} enableReinitialize>
        {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue, isSubmitting }) => (
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
                  label="Requirement (Must be a number)"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.requirement}
                  name="requirement"
                  error={!!touched.requirement && !!errors.requirement}
                  helperText={touched.requirement && errors.requirement}
                />
              </Grid>

              <Grid item sm={12} md={6}>
                <TextField
                  fullWidth
                  label="Requirement Unit"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.requirementUnit}
                  name="requirementUnit"
                  error={!!touched.requirementUnit && !!errors.requirementUnit}
                  helperText={touched.requirementUnit && errors.requirementUnit}
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
  item: yup.string().required('Item is required'),
  requirementUnit: yup.string().required('This field Is required'),
  unitPrice: yup.number().typeError('Unit price must be a number').required('This field Is required'),
  totalPrice: yup.number().typeError('Total Price must be a number').required('This field Is required'),
  requirement: yup.number().typeError('Requirment must be a number').required('This field Is required'),
});

export default Form;

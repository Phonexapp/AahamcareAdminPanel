import * as React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Box, Button } from '@mui/material';



export default function SimpleDialog(props) {
  const { changeStatus,  open, status, defaultValue ,setOpen} = props;
  const [selectedValues, setSelectedValues] = React.useState('');

  const submitHandler = () => {
    changeStatus(selectedValues)

  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog onClose={()=>handleClose()} open={open}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <FormControl>
          <FormLabel sx={{ mb: '10px' }} id="demo-radio-buttons-group-label">
            Change Status
          </FormLabel>
          <RadioGroup
            defaultValue={defaultValue}
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            {
                status.map((item, i )=>(
                    <FormControlLabel
                    key={i}
                    value={item}
                    control={<Radio />}
                    label={item}
                    onChange={(e) => setSelectedValues(e.target.value)}
                  />
                ))
            }
           
          </RadioGroup>

         
          <Button variant="contained" sx={{ mt: '10px' }} onClick={submitHandler}>
            Submit
          </Button>
        </FormControl>
      </Box>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  changeStatus: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

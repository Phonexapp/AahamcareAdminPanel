import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';

function RadioPopup({ fullScreen, open, handleClose, product, title, status, setStatusValue, Transition }) {
  return (
    <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
      <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <FormControl>
          <RadioGroup
            defaultValue={product.status}
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            {status.map((item, i) => (
              <FormControlLabel
                key={i}
                value={item}
                control={<Radio />}
                label={item}
                onChange={(e) => {
                  setStatusValue(e.target.value);
                }}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={(e) => handleClose(e)}>
          Submit
        </Button>
        <Button onClick={handleClose} autoFocus>
          Canacel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default RadioPopup;

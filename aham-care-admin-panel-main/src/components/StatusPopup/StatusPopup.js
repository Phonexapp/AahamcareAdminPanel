import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { LoadingButton } from '@mui/lab';

export default function StatusPopup({ open, setOpen, status, changeStatus, currentStatus, loading }) {
  const [value, setValue] = React.useState('');
  const handleClose = async () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    changeStatus(value);
  };

  return (
    <div style={{ padding: 5 }}>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Change Status?'}</DialogTitle>
        <DialogContent>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            defaultValue={currentStatus || 'Active'}
          >
            {status.map((status, i) => (
              <FormControlLabel
                key={i}
                value={status}
                control={<Radio />}
                label={status}
                onChange={(e) => setValue(e.target.value)}
              />
            ))}
          </RadioGroup>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <LoadingButton loading={loading} onClick={handleSubmit} autoFocus>
            Change
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}

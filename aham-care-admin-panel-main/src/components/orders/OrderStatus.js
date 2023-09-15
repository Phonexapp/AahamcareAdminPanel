import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Box,
} from '@mui/material';

export default function StatusDialog(props) {
  const [selectedStatus, setSelectedStatus] = useState(props.initialStatus || 'pending');

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleSave = () => {
    props.onSave(selectedStatus);
    props.onClose();
  };

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>Select status</DialogTitle>
      <DialogContent>
        <FormControl component="fieldset">
          <RadioGroup value={selectedStatus} onChange={handleStatusChange}>
            <Box sx={{ display: 'flex' }}>
              <FormControlLabel value="received" control={<Radio />} label="Received" />
              <FormControlLabel value="processing" control={<Radio />} label="Processing" />
              <FormControlLabel value="completed" control={<Radio />} label="Completed" />
            </Box>
          </RadioGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

import { Menu, MenuItem } from '@mui/material';
import React from 'react';

function ActionDropDown({ anchorEl, open, handleClose, menuItem, row }) {
  const status = row.status === 'Deactive' ? 'Active' : 'Deactive';
  const menuItems = [...menuItem, status];
  console.log(row._id,'row id');
  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
    >
      {menuItems.map((item, i) => (
        <MenuItem key={i} onClick={(e)=>handleClose(e,item, row._id)}>
          {item}
        </MenuItem>
      ))}
    </Menu>
  );
}

export default ActionDropDown;

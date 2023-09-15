import * as React from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useLocation } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Index from './organization/Index';
import Store from './store/Index'
import Event from './event/Index'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function OrderTabs() {
  

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialValue = parseInt(searchParams.get('tab'), 10) || 0;
  const [value, setValue] = React.useState(initialValue);

  const handleChange = (event, newValue) => {
    
    setValue(newValue);
    searchParams.set('tab', newValue);
    navigate(`?${searchParams.toString()}`);
  };

  React.useEffect(() => {
    const tabValue = parseInt(searchParams.get('tab'),10) || 0;
    setValue(tabValue);
  }, [searchParams]);

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="Orders" sx={{padding:0}} >
          <Tab label="Organization" {...a11yProps(0)} />
          <Tab label="Store" {...a11yProps(1)} />
          <Tab label="Event" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}   >
        <Index/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Store/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Event/>
      </TabPanel>
    </Box>
  );
}
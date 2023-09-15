import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Container, Paper } from '@mui/material';
import Address from './Address';
import TableData from './RequirementTable';
import {TABLE_HEAD} from "../table/TableHead"


export default function BasicTabs({ organaization}) {

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container>
        <Paper elevation={2}>
        <Address oldageHome={organaization}/>
      </Paper>
    </Container>
  );
}



import { Accordion, AccordionDetails, AccordionSummary, Container, Paper, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function Discription({discription}) {
  return (
    
        <Accordion sx={{mt:2}}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
            <Typography >Discription</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {discription || 'No description'}
            </Typography>
          </AccordionDetails>
        </Accordion>
     
  );
}

export default Discription;

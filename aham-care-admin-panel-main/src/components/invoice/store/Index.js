import { Box, Container, Fab, Paper } from '@mui/material';
import { useReactToPrint } from 'react-to-print';
import { useParams } from 'react-router-dom';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import { useEffect, useRef, useState } from 'react';
import Head from '../Head';
import Invoice from './Invoice';
import BillTo from './BillTo';
import axios from '../../../utils/axios';

function Index() {
  const { id } = useParams();
  const [item, setItem] = useState({});
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  
  const getItemDetails = async () => {
    const {data}=await axios.get(`v1/admin/storeDonationById/${id}`)
    
    setItem(data);
  };

 console.log("item=>", item);
  useEffect(() => {
    getItemDetails();
  }, []);

  return (
    <Container>
      <Paper sx={{ p: 3 }} ref={componentRef}>
        <Head item={id} status={item?.status} type="store-invoice"/>
        <BillTo  item={item}/>
        <Invoice item={item}/>

      </Paper>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Fab
          onClick={handlePrint}
          variant="extended"
          color="primary"
          sx={{ position: 'fixed', bottom: '20px', right: '35px' }}
        >
          <LocalPrintshopIcon sx={{ mr: 1 }} />
          Print
        </Fab>
      </Box>

      <style>
        {`
          @media print {
            html, body {
              width: 210mm;
              
              margin: 0;
              padding: 0;
            }

            body {
              padding: 25px;
            }

            
          }
        `}
      </style>
    </Container>
  );
}

export default Index;

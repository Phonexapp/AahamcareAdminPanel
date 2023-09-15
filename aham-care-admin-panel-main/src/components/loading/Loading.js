import { Box } from '@mui/material';
import Lottie from "lottie-react";
import LoadingAnimation from '../../assets/Infinity-1s-200px.svg'
// import LoadingAnimation from './LoadingAnimation.json';

function Loading({ loading }) {
  return (
  loading &&  <Box
      style={{
        position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'rgba(255, 255, 255, 0.5)',
          zIndex:'1500'
      }}
    >
      
      {/* <Lottie animationData={LoadingAnimation} loop/> */}
      <img src={LoadingAnimation} alt='loading' style={{borderRadius:'50%'}} />
      

    </Box>
  );
}

export default Loading;

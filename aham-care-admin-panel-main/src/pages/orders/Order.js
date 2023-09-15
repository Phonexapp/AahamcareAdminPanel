import { Container, Typography } from '@mui/material'
import React from 'react'
import OrderTabs from '../../components/orders/OrderTabs'

function Order() {
  return (
    <Container>
         <Typography variant="h4" gutterBottom>
        Orders
      </Typography>
        <OrderTabs/>
    </Container>
  )
}

export default Order
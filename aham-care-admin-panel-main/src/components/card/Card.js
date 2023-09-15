import * as React from 'react';
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Chip } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function BasicCard({ item, event }) {
  const [showMore, setShowMore] = useState(false);

  // const color = item.status === 'Active' ? 'success' : '#e73329';
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Chip
          label={item ? item.status : event.status}
          variant="outlined"
          color="success"
          sx={{ marginBottom: '10px' }}
        />

        <Typography variant="h5" component="div">
          {item ? item.item : event.event}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {item && `₹ ${item.totalPrice}`}
        </Typography>

        {event && <Typography>  {`Total tickets:  ${event.totalTickets} | Total price: ${event.totalPrice}` } </Typography>}
        {item ? (
          <Typography variant="body2">
            {showMore
              ? item.discription
              : `${item.discription.slice(0, 100)}${item.discription.length > 100 ? '' : ''}`}
            {item.discription.length > 100 && (
              <Button variant="text" size="small" onClick={() => setShowMore(!showMore)} sx={{ color: '#37474f' }}>
                {showMore ? 'Show Less' : 'Show More'}
              </Button>
            )}
          </Typography>
        ) : (
          <Typography variant="body2">
            {showMore
              ? event.discription
              : `${event.discription.slice(0, 100)}${event.discription.length > 100 ? '' : ''}`}
            {event.discription.length > 100 && (
              <Button variant="text" size="small" onClick={() => setShowMore(!showMore)} sx={{ color: '#37474f' }}>
                {showMore ? 'Show Less' : 'Show More'}
              </Button>
            )}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button LinkComponent={RouterLink} to={`/dashboard/${item ? 'store' : 'event'}/view/${item ? item._id : event._id}`} size="small">
          View More
        </Button>
      </CardActions>
    </Card>
  );
}

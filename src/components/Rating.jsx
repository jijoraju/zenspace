import React from 'react'

// components
import Rating from '@mui/material/Rating';

function RatingComponent(props) {

  return (
    <Rating
      name="simple-controlled"
      value={props?.value}
      precision={0.5}
      readOnly
      size="large"
      // onChange={(event, newValue) => {
      //   setValue(newValue);
      // }}
    />
  );
}

export default RatingComponent

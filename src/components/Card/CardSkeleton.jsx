import React from 'react'

// MUI
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';


function CardSkeleton() {
  
  return (
    <Box sx={{ width: '100%', marginRight: 0.5, my: 5 }}>
      <Skeleton variant="rectangular" width={`100%`} height={214} />

      <Box sx={{ pt: 2 }}>
        <Skeleton height={28} />
        <Skeleton width="60%" />
      </Box>
    </Box>
  )
}

export default CardSkeleton

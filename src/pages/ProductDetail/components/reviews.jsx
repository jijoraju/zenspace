import React from 'react'
import { motion,AnimatePresence } from "framer-motion"
import moment from "moment-timezone";

// MUI
import Rating from '@mui/material/Rating';



function Reviews({reviewsData}) {


  return (
    <motion.div 
      className="detailContainer-cards"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {reviewsData.map((item, index) => (
        <div className="detailContainer-cards-card" key={index}>
          <Rating
            name="simple-controlled"
            value={item.rating}
            precision={0.5}
            readOnly
            size="large"
          />

          <p>{item.comments}</p>

          <h3>{item.name || 'Anonymous'}</h3>
          <h3>{item.occupation || 'Worker' }</h3>
          <h4>{moment(item.review_date).format('YYYY-MM-DD hh:mm:ss')}</h4>
        </div>
      ))}
    </motion.div>
  )
}

export default React.memo(Reviews)

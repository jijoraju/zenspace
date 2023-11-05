import React from 'react'
import { motion,AnimatePresence } from "framer-motion"

// components
import Rating from '@mui/material/Rating';

// data
import { cardsData } from "@Data/solutions";

function Cards() {
  return (
    <motion.div 
      className="solution-feedbacks-cards"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {cardsData.map((item, index) => (
        <div className="solution-feedbacks-cards-card" key={index}>
          <Rating
            name="simple-controlled"
            value={item.rating}
            precision={0.5}
            readOnly
            size="large"
            // onChange={(event, newValue) => {
            //   setValue(newValue);
            // }}
          />

          <p>{item.description}</p>

          <h3>{item.name}</h3>
          <h3>{item.occupation}</h3>
        </div>
      ))}
    </motion.div>
  );
}

export default Cards

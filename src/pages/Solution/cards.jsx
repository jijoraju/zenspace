import React from 'react'

// components
import Rating from '@mui/material/Rating';

// data
import { cardsData } from "@Data/solutions";

function Cards() {
  return (
    <div className="solution-feedbacks-cards">
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
    </div>
  );
}

export default Cards

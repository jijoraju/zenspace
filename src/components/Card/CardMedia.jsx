import React from "react";

function CardMedia() {
  return (
    <div className="productContainer-selectionContainer-cards-card-media">
      <Image
        src={imgDefault}
        alt={`Word space card`}
        styles={`productContainer-selectionContainer-cards-card-media-img`}
        img2={img2}
        img3={img3}
      />
    </div>
  );
}

export default CardMedia;

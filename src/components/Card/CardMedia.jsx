import React from 'react'

function CardMedia() {
  return (
    <div className="searchContainer-selectionContainer-cards-card-media">
      <Image
        src={imgDefault}
        alt={`Word space card`}
        styles={`searchContainer-selectionContainer-cards-card-media-img`}
        img2={img2}
        img3={img3}
      />
    </div>
  )
}

export default CardMedia

import React from 'react'

// components
import Image from "@components/Images";
import Button from "@components/Button";

function FavoriteBtn(props) {

  const {toggleToFavorite, isFavorite} = props

  return (
    <Button
      disabled={false}
      onClick={toggleToFavorite}
      className={`favoriteBtn`}
    >
      {isFavorite? (
        <Image
          src={`icon/favorite/favoriteActive.png`}
          alt={`Favorite`}
          styles={`favoriteBtn-img`}
          img2={`icon/favorite/favoriteActive.png`}
          img3={`icon/favorite/favoriteActive.png`}
        />
      ) : (
        <Image
          src={`icon/favorite/favoriteBorder.png`}
          alt={`Favorite`}
          styles={`favoriteBtn-img`}
          img2={`icon/favorite/favoriteBorder.png`}
          img3={`icon/favorite/favoriteBorder.png`}
        />
      )}
    </Button>
  );
}

export default FavoriteBtn

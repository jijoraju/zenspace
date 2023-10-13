import React, {useState, useEffect}  from "react";

// components
import Image from "@components/Images";
import FavoriteBtn from "@components/FavoriteBtn";
import Rating from "@components/Rating";

function Card(props) {
  const {imgDefault,img2,img3,fullInfo} = props

  const {
    description,
    name: spaceName,
    price_per_day: price,
    no_of_spaces,
    workspaceAddress,
    location,
    workspace_id,
    reviews,
  } = fullInfo;

  const { province } = location;
  const { address } = workspaceAddress;

  const [favoriteList, setFavoriteList] = useState([])
  const [isFavorite, setIsFavorite] = useState(false)
  const [ratingNum, setRatingNum] = useState(0)


  useEffect(()=>{
    const sumRating = reviews.reduce((total,item)=> total.rating + item.rating)
    const result = sumRating / reviews.length
    setRatingNum(result)
  },[])

  useEffect(()=>{
   async function getFavoriteList(){
    const favoriteList = await JSON.parse(localStorage.getItem('favoriteList')) || []
    const findIndex = favoriteList.findIndex((item)=>item.workspace_id == workspace_id)

    setFavoriteList(favoriteList);
    setIsFavorite(findIndex > -1 ? true: false)
   }

   getFavoriteList();
  },[])


  const toggleToFavorite = ()=>{
    const findIndex = favoriteList.findIndex((item)=>item.workspace_id == workspace_id)

    if(findIndex != -1){
      favoriteList.splice(findIndex,1)
      setIsFavorite(false)
    }else{
      favoriteList.push(fullInfo)
      setIsFavorite(true)
    }
    setFavoriteList(favoriteList);
    
    localStorage.setItem('favoriteList',JSON.stringify(favoriteList))
  }

  return (
    <div className="searchContainer-selectionContainer-cards-card">
      {/* card media */}
      <div className="searchContainer-selectionContainer-cards-card-media">
        <Image
          src={imgDefault}
          alt={`Word space card`}
          styles={`searchContainer-selectionContainer-cards-card-media-img`}
          img2={img2}
          img3={img3}
        />
      </div>
      {/* card body */}
      <div className="searchContainer-selectionContainer-cards-card-body">
        <div className="searchContainer-selectionContainer-cards-card-body-topPart">
          <h1>CAD ${price}/day-pass</h1>
          <p>1 Private Office{`(${no_of_spaces} Available)`}</p>
        </div>
        <div className="searchContainer-selectionContainer-cards-card-body-bottomPart">
          <h2>{spaceName}</h2>
          <p>{address}</p>
        </div>
        {/* favorite */}
        <div className="searchContainer-selectionContainer-cards-card-body-favorite">
          <FavoriteBtn
            isFavorite={isFavorite}
            toggleToFavorite={toggleToFavorite}
          />
        </div>
      </div>
      {/* card footer */}
      <div className="searchContainer-selectionContainer-cards-card-footer">
        <div className="searchContainer-selectionContainer-cards-card-footer-container">
          <Rating value={ratingNum} />
        </div>
      </div>
    </div>
  );
}

export default Card;

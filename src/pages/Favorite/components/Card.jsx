import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link, useParams } from "react-router-dom";

// components
import Image from "@components/Images";
import FavoriteBtn from "@components/FavoriteBtn";
import Rating from "@components/Rating";
import Button from "@components/Button";

function Card(props) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const { imgDefault, img2, img3, fullInfo } = props;

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

  const [favoriteList, setFavoriteList] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [ratingNum, setRatingNum] = useState(0);

  // calculate rating
  useEffect(() => {
    if(!reviews.length) return
    const sumRating = reviews.reduce(
      (total, item) => total.rating + item.rating
    );
    const result = sumRating / reviews.length;
    setRatingNum(result);
  }, []);

  // get favorite list
  useEffect(() => {
    async function getFavoriteList() {
      if(!user.isLogin) return

      const getStorageData = await JSON.parse(localStorage.getItem("favoriteList"))
      if(!getStorageData || getStorageData.userId !== user?.userInfo?.user_id) return

      const favoriteList = getStorageData?.favoriteList || [];
      const findIndex = favoriteList.findIndex(
        (item) => item.workspace_id == workspace_id
      );

      setFavoriteList(favoriteList);
      setIsFavorite(findIndex > -1 ? true : false);
    }

    getFavoriteList();
  }, []);

  const toggleToFavorite = () => {

    if(!user.isLogin){
      navigate(`/login`);
      return
    }

    const findIndex = favoriteList.findIndex(
      (item) => item.workspace_id == workspace_id
    );

    if (findIndex != -1) {
      favoriteList.splice(findIndex, 1);
      setIsFavorite(false);
    } else {
      favoriteList.push(fullInfo);
      setIsFavorite(true);
    }
    setFavoriteList(favoriteList);
    props.setWorkSpaceList(favoriteList);
    
    const storeData = {
      favoriteList,
      userId: user?.userInfo?.user_id
    }

    localStorage.setItem("favoriteList", JSON.stringify(storeData));
  };

  const goToDetail = () => {
    const data =  {
      detailData: fullInfo,
    }

    navigate(`/product/${spaceName}`,{state:data});
  };

  return (
    <div className="productContainer-selectionContainer-cards-wrap">
      <Button
        disabled={false}
        onClick={goToDetail}
        className={`productContainer-selectionContainer-cards-wrap-card`}
      >
        {/* card media */}
        <div className="productContainer-selectionContainer-cards-wrap-card-media">
          <Image
            src={imgDefault}
            alt={`Word space card`}
            styles={`productContainer-selectionContainer-cards-wrap-card-media-img`}
            img2={img2}
            img3={img3}
          />
        </div>
        {/* card body */}
        <div className="productContainer-selectionContainer-cards-wrap-card-body">
          <div className="productContainer-selectionContainer-cards-wrap-card-body-topPart">
            <h1>CAD ${price} / Day-pass</h1>
            <p>1 Private Office {`(${no_of_spaces} Available)`}</p>
          </div>
          <div className="productContainer-selectionContainer-cards-wrap-card-body-bottomPart">
            <h2>{spaceName}</h2>
            <p>{address}</p>
          </div>
        </div>
        {/* card footer */}
        <div className="productContainer-selectionContainer-cards-wrap-card-footer">
          <div className="productContainer-selectionContainer-cards-wrap-card-footer-container">
            <Rating value={ratingNum} />
          </div>
        </div>
      </Button>

      {/* favorite */}
      <div className="productContainer-selectionContainer-cards-wrap-favorite">
        <FavoriteBtn
          isFavorite={isFavorite}
          toggleToFavorite={toggleToFavorite}
        />
      </div>
    </div>
  );
}

export default Card;

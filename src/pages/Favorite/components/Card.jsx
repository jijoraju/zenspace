import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link, useParams } from "react-router-dom";
import { motion,AnimatePresence } from "framer-motion"

// components
import Image from "@components/Images";
import FavoriteBtn from "@components/FavoriteBtn";
import Rating from "@components/Rating";
import Button from "@components/Button";

function Card(props) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const { imgDefault, img2, img3, fullInfo, productPageState } = props;

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

    GaEvent('Product','Click','Add favorite')
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
    GaEvent('Product','Click','Go to Product Detail')
    
    const data =  {
      detailData: fullInfo,
        productFilter: {
        headcounts:productPageState?.headcounts,
        // datePeriod: productPageState?.dateSelected,
      },
    }

    navigate(`${spaceName?.replaceAll(' ','-')}`,{state:data});
  };

  return (
    <AnimatePresence>
    <motion.div 
      className="productContainer-selectionContainer-cards-wrap"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
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
      <motion.div className="productContainer-selectionContainer-cards-wrap-favorite"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <FavoriteBtn
          isFavorite={isFavorite}
          toggleToFavorite={toggleToFavorite}
        />
      </motion.div>
    </motion.div>
    </AnimatePresence>
  );
}

export default Card;

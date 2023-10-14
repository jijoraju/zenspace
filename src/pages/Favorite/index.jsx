import React, { useState, useRef, useEffect, useReducer,useCallback } from "react";
import { useNavigate, Link, useParams, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
// components
import LocationSelection from "./components/locationSelection";
import HeadCount from "./components/headCount";
import RateComponent from "./components/RateComponent";
import PriceRange from "./components/PriceRange";
import Cards from "./components/Cards";
import Button from "@components/Button";

// MUI
import {
  KeyboardArrowDownOutlined,
  KeyboardArrowUpOutlined,
} from "@mui/icons-material";

function reducer(state, action) {
  switch (action.type) {
    case "setLocation":
      return { ...state, location: action.param };
    case "setHeadCount":
      return {
        ...state,
        headcounts: +action.param,
      };
    case "setRating":
      return {
        ...state,
        rating: +action.param,
      };
    case "setPriceRange":
      return {
        ...state,
        priceRange: action.param,
      };
    default:
      return state;
  }
}

function ProductList() {
  const user = useSelector((state)=>state.user)
  const [productPageState, dispatch] = useReducer(reducer, {
    location: null,
    headcounts: null,
    rating:3,
    priceRange: `160-200`,
  });

  const [workSpaceList, setWorkSpaceList] = useState([]);
  const [showMore, setShowMore] = useState(false);

  const setLocationHandler = (param) => {
    dispatch({ type: `setLocation`, param });
  };

  const setHeadCountHandler = (param) => {
    dispatch({ type: `setHeadCount`, param });
  };

  const setRatingHandler = (param) => {
    dispatch({ type: `setRating`, param });
  };

  const setPriceRangeHandler = (param) => {
    dispatch({ type: `setPriceRange`, param });
  };

  // get favorite list handler
  const getFavoriteList = useCallback(async ()=>{
    if(!user.isLogin) return setWorkSpaceList([])
    
    const favoriteData = await JSON.parse(localStorage.getItem('favoriteList'))
    
    if(user?.userInfo?.user_id !== favoriteData?.userId) {
      setWorkSpaceList([])
      return
    }

    return favoriteData?.favoriteList
  },[user])

  // get favorite list from localStorage
  useEffect(() => {
    async function getList(){
      const favoriteList = await getFavoriteList()
      setWorkSpaceList(favoriteList)
    }

    getList()
  }, [getFavoriteList]);

  // filter side effect
  useEffect(() => {
    async function filterNewData() {
      const { priceRange, rating, headcounts, location} = productPageState;

      const favoriteList = await getFavoriteList()
      if(!favoriteList.length) return

      const filterResult = await favoriteList?.filter((item) => {
        // location
        const city = item.location?.name.toLowerCase();
        const matchLocation = location?.name.toLowerCase() == city;

        // head count
        const no_of_spaces = item.no_of_spaces;
        const isAccommodate = no_of_spaces >= headcounts

        // price from api
        const price = +item.price_per_day;
        const pr = priceRange.split("-");
        const isQualified = price >= Number(pr[0]) && price <= Number(pr[1]);

        // sum rating
        const sumRating = item.reviews.reduce(
          (total, item) => total.rating + item.rating
        );
        const averageResult = sumRating / item.reviews.length;
        const ratingResult = Math.round(averageResult) >= rating;

        const result = ratingResult && isQualified && isAccommodate && matchLocation;
        return result;
      });

      setWorkSpaceList(filterResult);
    }

    filterNewData();
  }, [productPageState]);

  const showMoreHandler = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="productContainer">
      <div className="productContainer-selectionContainer">
        {/* filter */}
        <div className="productContainer-selectionContainer-selectionsRow">
          <div className="productContainer-selectionContainer-selectionsRow-types">
            <LocationSelection setLocationHandler={setLocationHandler} />
            <HeadCount setHeadCountHandler={setHeadCountHandler} />
            <RateComponent setRateComponent={setRatingHandler} />
            <PriceRange
              setPriceRangeHandler={setPriceRangeHandler}
              showMore={showMore}
            />
          </div>
        </div>
      </div>
      <Button
        disabled={false}
        onClick={showMoreHandler}
        className={`productContainer-showMoreBtn`}
      >
        {showMore ? (
          <KeyboardArrowUpOutlined className="productContainer-showMoreBtn-icon" />
        ) : (
          <KeyboardArrowDownOutlined className="productContainer-showMoreBtn-icon" />
        )}
      </Button>

      {/* cards */}
      <Cards
        workSpaceResult={workSpaceList}
        setWorkSpaceList={setWorkSpaceList}
        loadingStatus={false}
      />

    </div>
  );
}

export default React.memo(ProductList);

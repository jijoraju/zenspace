import React, { useState, useRef, useEffect, useReducer } from "react";
import { useNavigate, Link, useParams,Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// components
import LocationSelection from "./components/locationSelection";
import DateSelection from "./components/dateSelection";
import DatePicker from "./components/DatePickerComponent";
import HeadCount from "./components/headCount";
import RateComponent from "./components/RateComponent";
import PriceRange from "./components/PriceRange";
import Cards from "./components/Cards";
import Button from "@components/Button";

// MUI
import {KeyboardArrowDownOutlined,KeyboardArrowUpOutlined} from '@mui/icons-material';


// custom hook
import useHttp from "@hook/use-http";

// reducer
import { getWorkSpaceHandler } from "@Reducer/workspace/wk-action";

function reducer(state, action) {
  switch (action.type) {
    case "setLocation":
      return { ...state, location: action.param };
    case "setDate":
      return {
        ...state,
        dateSelected: {
          ...state.dateSelected,
          start: action.param?.start,
          end: action.param?.end,
        },
      };
    case "setWorkspace_type":
      return {
        ...state,
        dateSelected: {
          ...state.dateSelected,
          workspace_type: action.param,
        },
      };
    case "setHeadCount":
      return {
        ...state,
        headcounts: +action.param,
      };
    default:
      return state;
  }
}

function ProductList() {
  const [searchPageState, dispatch] = useReducer(reducer, {
    location: null,
    dateSelected: { start: null, end: null, workspace_type: `ONE_DAY` },
    headcounts: null,
    // maxPrice: 200,
    // rating: 1,
  });
  const [workSpaceList, setWorkSpaceList] = useState([]);
  const [rating, setRating] = useState(3);
  const [priceRange, setPriceRange] = useState(`160-200`);
  const [showMore, setShowMore] = useState(false);

  const setLocationHandler = (param) => {
    dispatch({ type: `setLocation`, param });
  };

  const setDateRangeHandler = (param) => {
    dispatch({ type: `setDate`, param });
  };

  const setHeadCountHandler = (param) => {
    dispatch({ type: `setHeadCount`, param });
  };

  const setWorkSpaceType = (param) => {
    dispatch({ type: `setWorkspace_type`, param });
  };

  // use http hook
  const {
    sendRequest: fetchWorkSpaceApi,
    status,
    data: workSpaceResult,
  } = useHttp(getWorkSpaceHandler);

  useEffect(() => {
    const fetchAPpi = setTimeout(() => {
      fetchWorkSpaceApi(searchPageState);
    }, 1000);
    return () => clearTimeout(fetchAPpi);
  }, [fetchWorkSpaceApi, searchPageState]);

  useEffect(() => {
    async function filterNewData() {
      if (!workSpaceResult?.data?.length) {
        setWorkSpaceList([])
        return
      };

      const filterResult = await workSpaceResult?.data?.filter((item) => {
        // price from api
        const price = item.price_per_day
        const pr = priceRange.split('-')
        const isQualified = (price >= pr[0] && price <= pr[1])

        // sum rating
        const sumRating = item.reviews.reduce(
          (total, item) => total.rating + item.rating
        );
        const averageResult = sumRating / item.reviews.length;
        const ratingResult = Math.round(averageResult) >= rating;

        const result = ratingResult && isQualified
        return  result
      });

      setWorkSpaceList(filterResult);
    }

    filterNewData();
  }, [workSpaceResult, rating, priceRange]);


  const showMoreHandler = ()=>{
    setShowMore(!showMore)
  }

  return (
    <div className="searchContainer">
      <div className="searchContainer-selectionContainer">
        {/* filter */}
        <div className="searchContainer-selectionContainer-selectionsRow">
          <div className="searchContainer-selectionContainer-selectionsRow-types">
            <LocationSelection setLocationHandler={setLocationHandler} />
            <HeadCount setHeadCountHandler={setHeadCountHandler} />
            <RateComponent setRateComponent={(val) => setRating(val)} />
            <PriceRange setPriceRangeHandler={(val) => setPriceRange(val)} showMore={showMore} />
            <DateSelection datePickerVisible={setWorkSpaceType} showMore={showMore} />
          </div>
          {/* date picker */}
          <div className={`searchContainer-selectionContainer-selectionsRow-datePicker ${showMore? 'showMore':''}`}>
            <DatePicker
              type={searchPageState.dateSelected.workspace_type}
              setDateRangeHandler={setDateRangeHandler}
            />
          </div>
        </div>
      </div>
      <Button
        disabled={false}
        onClick={showMoreHandler}
        className={`searchContainer-showMoreBtn`}
      >
        {showMore ?(
        <KeyboardArrowUpOutlined className="searchContainer-showMoreBtn-icon" />
        ):(
        <KeyboardArrowDownOutlined className="searchContainer-showMoreBtn-icon" />
        )
        }

      </Button>

      {/* cards */}
      <Cards
        workSpaceResult={workSpaceList}
        loadingStatus={status == "pending"}
      />

      {/* <Outlet /> */}
    </div>
  );
}

export default React.memo(ProductList);

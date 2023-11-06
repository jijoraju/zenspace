import React, { useState, useRef, useEffect, useReducer } from "react";
import { useNavigate, Link, useParams, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// components
import LocationSelection from "./components/locationSelection";
import DateSelection from "./components/dateSelection";
import DatePicker from "./components/DatePickerComponent";
import HeadCount from "./components/headCount";
import RateComponent from "./components/RateComponent";
import PriceRange from "./components/PriceRange";
import SequenceComponent from './components/sequence'
import Cards from "./components/Cards";
import Button from "@components/Button";

// MUI
import {
  KeyboardArrowDownOutlined,
  KeyboardArrowUpOutlined,
} from "@mui/icons-material";
import Pagination from '@mui/material/Pagination';

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
    case "pageHandler":
      return {
        ...state,
        pageIndex: +action.param,
      };
    case "sequenceHandler":
      return {
        ...state,
        sequenceType: action.param,
      };
    default:
      return state;
  }
}

function ProductList() {
  const [productPageState, dispatch] = useReducer(reducer, {
    location: null,
    dateSelected: { start: null, end: null, workspace_type: `ONE_DAY` },
    headcounts: null,
    pageIndex: 1,
    sequenceType: 'asc'
  });
  const [workSpaceList, setWorkSpaceList] = useState([]);
  const [rating, setRating] = useState(0);
  const [priceRange, setPriceRange] = useState(`Unlimited`);
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

  const setPageHandler = (event, param) => {
    dispatch({ type: `pageHandler`, param });
  };

    const setSequenceHandler = ( param) => {
    dispatch({ type: `sequenceHandler`, param });
  };

  // use http hook
  const {
    sendRequest: fetchWorkSpaceApi,
    status,
    data: workSpaceResult,
  } = useHttp(getWorkSpaceHandler);

  useEffect(() => {
    const fetchAPpi = setTimeout(() => {
      fetchWorkSpaceApi(productPageState);
    }, 1000);
    return () => clearTimeout(fetchAPpi);
  }, [fetchWorkSpaceApi, productPageState]);

  useEffect(() => {
    async function filterNewData() {
      if (!workSpaceResult?.data?.length) {
        setWorkSpaceList([]);
        return;
      }

      const filterResult = await workSpaceResult?.data?.filter((item) => {
        // price from api
        const price = item.price_per_day;
        let isQualified
        if(priceRange == 'Unlimited'){
          isQualified = true
        }else if(priceRange == '500+'){
          isQualified = price >= 500
        }else{
          const pr = priceRange.split("-");
          isQualified = price >= pr[0] && price <= pr[1];
        }

        // sum rating
        const sumRating = item?.reviews.length && item?.reviews?.reduce(
          (total, item) => total.rating + item.rating
        ) || 0; 
        const averageResult = sumRating / item.reviews.length || 0;
        const ratingResult = Math.round(averageResult) >= rating;
        
        const result = ratingResult && isQualified;
        return result;
      });

      // console.log('filterResult',filterResult)
      setWorkSpaceList(filterResult);
    }

    filterNewData();
  }, [workSpaceResult, rating, priceRange]);

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
            <SequenceComponent setSequenceHandler={setSequenceHandler} />
            <HeadCount setHeadCountHandler={setHeadCountHandler} />
            <RateComponent setRateComponent={(val) => setRating(val)} />
            <PriceRange
              setPriceRangeHandler={(val) => setPriceRange(val)}
              showMore={showMore}
            />
            <DateSelection
              datePickerVisible={setWorkSpaceType}
              showMore={showMore}
            />
          </div>
          {/* date picker */}
          <div
            className={`productContainer-selectionContainer-selectionsRow-datePicker ${
              showMore ? "showMore" : ""
            }`}
          >
            <DatePicker
              type={productPageState.dateSelected.workspace_type}
              setDateRangeHandler={setDateRangeHandler}
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
        loadingStatus={status == "pending"}
        // productPageState={productPageState}
      />

    {
      workSpaceList.length && (
              <div className="productContainer-paginationContainer">
            <Pagination
              count={workSpaceResult?.meta?.totalPages || 1}
              page={productPageState?.pageIndex}
              onChange={setPageHandler}
              size="large"
            />
          </div>
      )
    }

      {/* <Outlet /> */}
    </div>
  );
}

export default React.memo(ProductList);

import React, { useState, useRef, useEffect, useReducer } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// components
import SearchLocationSelection from "./searchLocationSelection";
import DateSelection from "./dateSelection";
import DatePicker from "./DatePickerComponent";
import HeadCount from "./headCount";
import Cards from './Cards'

// custom hook
import useHttp from "@hook/use-http";

// reducer
import {
  getWorkSpaceHandler,
} from "@Reducer/workspace/wk-action";

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

function Search() {
  const [searchPageState, dispatch] = useReducer(reducer, {
    location: null,
    dateSelected: { start: null, end: null, workspace_type:`ONE_DAY`  },
    headcounts: null,
    maxPrice: 200,
    rating: 1,
  });

  const setLocationHandler = (param) => {
    dispatch({ type: `setLocation`, param });
  };

  const setDateRangeHandler = (param) => {
    dispatch({ type: `setDate`, param });
  };

  const setHeadCountHandler = (param) => {
    dispatch({ type: `setHeadCount`, param });
  };

  const setWorkSpaceType = (param)=>{
    dispatch({ type: `setWorkspace_type`, param });
  }

  // useEffect(() => {
  //   console.log("searchPageState", searchPageState);
  // }, [searchPageState]);

  // use http hook
  const {
    sendRequest: fetchWorkSpaceApi,
    status,
    data: workSpaceResult,
  } = useHttp(getWorkSpaceHandler);

  useEffect(()=>{
   const fetchAPpi = setTimeout(()=>{
      fetchWorkSpaceApi(searchPageState)
    },500)
    return ()=>clearTimeout(fetchAPpi)
  },[fetchWorkSpaceApi,searchPageState])

  // useEffect(()=>{
  //   console.log('workSpaceResult',workSpaceResult)
  // },[workSpaceResult])

  return (
    <div className="searchContainer">

      <div className="searchContainer-selectionContainer">
        {/* filter */}
        <div className="searchContainer-selectionContainer-selectionsRow">
          <div className="searchContainer-selectionContainer-selectionsRow-types">
            <SearchLocationSelection setLocationHandler={setLocationHandler} />
            <HeadCount setHeadCountHandler={setHeadCountHandler} />
            <DateSelection datePickerVisible={setWorkSpaceType} />
          </div>
          {/* date picker */}
          <div className="searchContainer-selectionContainer-selectionsRow-datePicker">
            <DatePicker
              type={searchPageState.dateSelected.workspace_type}
              setDateRangeHandler={setDateRangeHandler}
            />
          </div>
        </div>

      </div>
      {/* cards */}
      <Cards workSpaceResult={workSpaceResult} loadingStatus={status == 'pending'} />
    </div>
  );
}

export default React.memo(Search);

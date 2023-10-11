import React, { useState, useRef, useEffect, useReducer } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// components
import SearchLocationSelection from "./searchLocationSelection";
import DateSelection from "./dateSelection";
import DatePicker from "./DatePickerComponent";
import HeadCount from "./headCount";

function reducer(state, action) {
  switch (action.type) {
    case "setLocation":
      return { ...state, location: action.param };
    case "setStartDate":
      return {
        ...state,
        dateSelected: { start: action.param?.start, end: action.param?.end },
      };
    case "setEndDate":
      return {
        ...state,
        dateSelected: { start: action.param?.start, end: action.param?.end },
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
    dateSelected: { start: null, end: null },
    headcounts: null,
  });
  const [showDatePicker, setShowDatePicker] = useState(`single`);

  const setLocationHandler = (param) => {
    dispatch({ type: `setLocation`, param });
  };

  const setDateRangeHandler = (param) => {
    if (showDatePicker == "single") {
      dispatch({ type: `setStartDate`, param });
    } else {
      dispatch({ type: `setEndDate`, param });
    }
  };

  const setHeadCountHandler = (param) => {
    dispatch({ type: `setHeadCount`, param });
  };

  useEffect(() => {
    console.log("searchPageState", searchPageState);
  }, [searchPageState]);

  return (
    <div className="searchContainer">

      <div className="searchContainer-selectionContainer">
        <div className="searchContainer-selectionContainer-selectionsRow">

          <div className="searchContainer-selectionContainer-selectionsRow-types">
            <SearchLocationSelection setLocationHandler={setLocationHandler} />
            <HeadCount setHeadCountHandler={setHeadCountHandler} />
            <DateSelection datePickerVisible={(val) => setShowDatePicker(val)} />
          </div>

          <div className="searchContainer-selectionContainer-selectionsRow-datePicker">
            <DatePicker
              type={showDatePicker}
              setDateRangeHandler={setDateRangeHandler}
            />
          </div>
        </div>


      </div>
    </div>
  );
}

export default React.memo(Search);

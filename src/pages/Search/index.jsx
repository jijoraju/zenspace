import React, { useState, useRef, useEffect, } from "react";
import { useNavigate,Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// components
import DatePicker from "./datePicker";
import SearchLocationSelection from "./searchLocationSelection";

// reducers and actions
import {
  getLocationHandler,
  storeLocation,
} from "@Reducer/workspace/wk-action";

function Search() {
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [dateRange, setDateRange] = useState([null, null]);

  const handleDateChange = (newDateRange) => {
    setDateRange(newDateRange);

    console.log('dateRange',newDateRange)
  };

  return (
    <div className="searchContainer">

    <div className="searchContainer-selectionContainer">
      <div className="searchContainer-selectionContainer-selectionsRow">
        <SearchLocationSelection />
        <DatePicker datePickerVisible={(val)=>setShowDatePicker(val)}  />
      </div>
      
      <div >
        {
          showDatePicker?(
            <div>Date Picker</div>
          ):null
        }
      </div>
    </div>

    </div>
  );
}

export default React.memo(Search)

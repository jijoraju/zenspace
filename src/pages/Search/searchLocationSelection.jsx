import React, { useState, useRef, useEffect, } from "react";
import { useNavigate, Link, useParams,useSearchParams ,useLocation} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// components
import Select from "@components/Selection";
import useInput from "@hook/use-input";
import useHttp from "@hook/use-http";
// reducer and actions
import {
  getLocationHandler,
  storeLocation,
} from "@Reducer/workspace/wk-action";

function SearchLocationSelection() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cityInputRef = useRef();
  const [searchParams,] = useSearchParams();

  const location = searchParams.get("location")
  const locationArr = useSelector((state) => state.workSpace.location);
  


  // fetch location api
  const {
    sendRequest: fetchLocationApi,
    status,
    data: locationData,
  } = useHttp(getLocationHandler);

  // store location api
  useEffect(() => { 
    if(locationData?.data?.length){
      dispatch(storeLocation(locationData));
    }
  }, [locationData, storeLocation, dispatch]);

  // city location input
  const { 
    value: enteredCity,
    valueChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHandler,
  } = useInput();

  // City input props variable
  const cityInputProps = { 
    ref: cityInputRef,
    id: `City`,
    label: ``,
    name: `city`,
    value: enteredCity,
    onChange: cityChangeHandler,
    onBlur: cityBlurHandler,
    options:locationArr || [],
    className: `home-header-CityBox-container-inputBox`,
  };

  // location api effect
  useEffect(()=>{ 
    if(!locationArr.length){
      fetchLocationApi();
    }else if(locationArr.length && location){
      cityChangeHandler(location)
      cityInputRef.current.value = location
    }
    
    console.log('cityInputRef.current.value',cityInputRef.current.value)
  },[locationArr,location])

  return (
    <>
      <Select optionActive={location} {...cityInputProps} />
    </>
  );
}

export default React.memo(SearchLocationSelection)

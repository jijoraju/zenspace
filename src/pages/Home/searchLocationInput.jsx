import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
// MUI
import { List, ListItemButton, ListItemText } from "@mui/material";
// components
import Button from "@components/Button";
import Image from "@components/Images";
import Input from "@components/Input";

// custom hook
import useInput from "@hook/use-input";
import useHttp from "@hook/use-http";

// reducer
import {
  getLocationHandler,
  storeLocation,
  getLocationFromStorage,
} from "@Reducer/workspace/wk-action";


export default React.memo(function SearchLocationInput() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchInputRef = useRef();

  const locationArr = useSelector((state) => state.workSpace.location);
  const [filterLocation, setFilterLocation] = useState([]);
  // use http hook
  const {
    sendRequest: fetchLocationApi,
    status,
    data: locationData,
  } = useHttp(getLocationHandler);

  // fetch location api or from localStorage
  useEffect(() => {
    if(!locationArr.length){
      const locationList = getLocationFromStorage();
      dispatch(storeLocation({data:locationList}));
      fetchLocationApi();
    }
  }, []);

  // store location list to reducer
  useEffect(() => {
    if(locationData?.data?.length){
      dispatch(storeLocation(locationData));
    }
  }, [locationData, storeLocation, dispatch]);

  const {
    value: enteredSearch,
    valueChangeHandler: searchChangeHandler,
    inputBlurHandler: searchBlurHandler,
  } = useInput();

  // match search variable with location api
  useEffect(() => {
    const typing = setTimeout(() => {
      const search_val = enteredSearch || "";
      const pattern = new RegExp(search_val, "gi");
      const result = locationArr.filter((item) => item.name.match(pattern));
      setFilterLocation(result || locationData);
    }, 500);
    return () => clearTimeout(typing);
  }, [enteredSearch, locationArr]);

  // search input variable
  const searchInputProps = {
    ref: searchInputRef,
    id: `searchLocation`,
    label: ``,
    type: `text`,
    value: enteredSearch,
    onChange: searchChangeHandler,
    onBlur: searchBlurHandler,
    placeholder: `Find a workspace for you...`,
    className: `home-header-searchBox-container-inputBox`,
  };

  // click event
  const clickLocation = (e, item) => {
    searchChangeHandler(item);
    searchInputRef.current.value = item
    setTimeout(() => {
      setFilterLocation([]);
    }, 600);
  };

  // render location List
  const renderLocationList = (List) => {
    return List.map((item, index) => (
      <ListItemButton
        key={index}
        selected={enteredSearch.toLowerCase() === item.name.toLowerCase()}
        onClick={(e) => clickLocation(e, item)}
      >
        <ListItemText>{item.name}</ListItemText>
      </ListItemButton>
    ));
  };

  // submit search then redirect to search page
  const submitSearch = () => {
    navigate(`/search?location=${enteredSearch}`);
  };

  return (
    <div className="home-header-searchBox">
      <h1 className="home-header-searchBox-title">
        Where to work, search locations anytime.
      </h1>
      <p className="home-header-searchBox-content">
        Discovering a nearby office space is a breeze. We provide an array
        of options to choose from. Why not input your location now?
      </p>

      <div className="home-header-searchBox-container">
        <Input {...searchInputProps} />
      <SearchOutlinedIcon className="home-header-searchBox-container-icon" />
      </div>

      <Button
        disabled={status == "pending" || !enteredSearch}
        onClick={submitSearch}
        className={`home-header-searchBox-submitBtn`}
      >
        {status == "pending" ? `Loading` : `Submit`}
      </Button>

      {enteredSearch?.length &&
      Array.isArray(filterLocation) &&
      filterLocation.length ? (
        <List
          component="nav"
          aria-label="secondary mailbox folder"
          className="searchLocationContainer"
        >
          {renderLocationList(filterLocation)}
        </List>
      ) : null}
    </div>
  );
});

import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { List, ListItemButton, ListItemText } from "@mui/material";

import Button from "@components/Button";
import Image from "@components/Images";
import Input from "@components/Input";
import useInput from "@hook/use-input";
import useHttp from "@hook/use-http";

import {
  getLocationHandler,
  storeLocation,
} from "@Reducer/workspace/wk-action";
import { solutions } from "@Data/home";

export default React.memo(function SearchLocationInput() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchInputRef = useRef();
  const locationArr = useSelector((state) => state.workSpace.location);
  const [filterLocation, setFilterLocation] = useState([]);

  const {
    sendRequest: fetchLocationApi,
    status,
    data: locationData,
  } = useHttp(getLocationHandler);

  useEffect(() => {
    if(!locationArr.length){
      fetchLocationApi();
    }
  }, []);

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

  useEffect(() => {
    const typing = setTimeout(() => {
      const search_val = enteredSearch || "";
      const pattern = new RegExp(search_val, "gi");
      const result = locationArr.filter((item) => item.name.match(pattern));
      setFilterLocation(result || locationData);
    }, 500);
    return () => clearTimeout(typing);
  }, [enteredSearch, locationArr]);

  // click event
  const clickLocation = (e, item) => {
    searchChangeHandler(item);
    setTimeout(() => {
      setFilterLocation([]);
    }, 600);
  };

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

  // render solution cards
  const renderSolutionCards = solutions.map((item, index) => (
    <div className="solutionsCard-container-card" key={index}>
      <div className="solutionsCard-container-card-front">
        <Image
          src={item.default}
          alt={`solution-${index} Card`}
          styles={item.class}
          img2={item.img2}
          img3={item.img3}
        />
      </div>
      <div className="solutionsCard-container-card-back">
        <h2 className="card__price-only">{item.title}</h2>
        <p className="card__price-value">{item.content}</p>
      </div>
    </div>
  ));

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
    // navigate(`/search/123`);
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

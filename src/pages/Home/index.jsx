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

export default React.memo(function Home() {
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
    fetchLocationApi();
  }, []);

  useEffect(() => {
    dispatch(storeLocation(locationData));
  }, [locationData, storeLocation, dispatch]);

  const {
    value: enteredSearch,
    isValid: enteredSearchIsValid,
    // hasError: searchInputHasError,
    valueChangeHandler: searchChangeHandler,
    inputBlurHandler: searchBlurHandler,
    reset: resetSearchInput,
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
    id: `search`,
    label: ``,
    type: `text`,
    isValid: enteredSearchIsValid,
    value: enteredSearch,
    onChange: searchChangeHandler,
    onBlur: searchBlurHandler,
    // hasError: searchInputHasError,
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
  };

  return (
    <div className="home_container">
      {/* header */}
      <div className="home-header">
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

        <div className="home-header-banner">
          <Image
            src={`home/banner/homeBanner.png`}
            alt={`home`}
            styles={`home-header-banner-image`}
            img2={`home/banner/homeBanner@2x.png`}
            img3={`home/banner/homeBanner@3x.png`}
          />
        </div>
      </div>
      {/* solutions card */}
      <div className="solutions-container">
        <div className="solutions-container-description">
          <h1>Meet your workplace needs, we have the solution.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipiscing elit volutpat
            gravida malesuada quam commodo id integer nam.
          </p>
        </div>
      </div>

      <div className="solutionsCard-container">{renderSolutionCards}</div>

      <div className="solutions-container know-wrap">
        <div className="solutions-container-description">
          <h1>Here's everything you need to know about work.</h1>
        </div>
      </div>

      {/* sign up btn */}
      <div className="createAccount-container">
        <div className="createAccount-container-itemBox">
          <h2>Create your account today and get started for free!</h2>
          <Link to="/register" className="createAccount-container-itemBox-Btn">
            Sign up
          </Link>
        </div>

        <div className="createAccount-container-itemBox">
          <Image
            src={`home/createAcc/createAcc.png`}
            alt={`Create an account Image`}
            styles={`createAccount-container-itemBox-img`}
            img2={`home/createAcc/createAcc@2x.png`}
            img3={`home/createAcc/createAcc@3x.png`}
          />
        </div>
      </div>
    </div>
  );
});

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

export default React.memo(function ProductLocationInput() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productInputRef = useRef();

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
    if (!locationArr.length) {
      const locationList = getLocationFromStorage();
      dispatch(storeLocation({ data: locationList }));
      fetchLocationApi();
    }
  }, []);

  // store location list to reducer
  useEffect(() => {
    if (locationData?.data?.length) {
      dispatch(storeLocation(locationData));
    }
  }, [locationData, storeLocation, dispatch]);

  const {
    value: enteredProduct,
    valueChangeHandler: productChangeHandler,
    inputBlurHandler: productBlurHandler,
  } = useInput();

  // match product variable with location api
  useEffect(() => {
    const typing = setTimeout(() => {
      const product_val = enteredProduct || "";
      const pattern = new RegExp(product_val, "gi");
      const result = locationArr.filter((item) => item.name.match(pattern));
      setFilterLocation(result || locationData);
    }, 500);
    return () => clearTimeout(typing);
  }, [enteredProduct, locationArr]);

  // product input variable
  const productInputProps = {
    ref: productInputRef,
    id: `productLocation`,
    label: ``,
    type: `text`,
    value: enteredProduct,
    onChange: productChangeHandler,
    onBlur: productBlurHandler,
    placeholder: `Find a workspace for you...`,
    className: `home-header-productBox-container-inputBox`,
  };

  // click event
  const clickLocation = (e, item) => {
    productChangeHandler(item);
    productInputRef.current.value = item;
    setTimeout(() => {
      setFilterLocation([]);
    }, 600);
  };

  // render location List
  const renderLocationList = (List) => {
    return List.map((item, index) => (
      <ListItemButton
        key={index}
        selected={enteredProduct.toLowerCase() === item.name.toLowerCase()}
        onClick={(e) => clickLocation(e, item)}
      >
        <ListItemText>{item.name}</ListItemText>
      </ListItemButton>
    ));
  };

  // submit product then redirect to product page
  const submitProduct = () => {
    GaEvent('search','submit','search location')
    navigate(`/product?location=${enteredProduct}`);
  };

  return (
    <div className="home-header-productBox">
      <h1 className="home-header-productBox-title">
        Where to work, product locations anytime.
      </h1>
      <p className="home-header-productBox-content">
        Discovering a nearby office space is a breeze. We provide an array of
        options to choose from. Why not input your location now?
      </p>

      <div className="home-header-productBox-container">
        <Input {...productInputProps} />
        <SearchOutlinedIcon className="home-header-productBox-container-icon" />
      </div>

      <Button
        disabled={status == "pending" || !enteredProduct}
        onClick={submitProduct}
        className={`home-header-productBox-submitBtn`}
      >
        {status == "pending" ? `Loading` : `Submit`}
      </Button>

      {enteredProduct?.length &&
      Array.isArray(filterLocation) &&
      filterLocation.length ? (
        <List
          component="nav"
          aria-label="secondary mailbox folder"
          className="productLocationContainer"
        >
          {renderLocationList(filterLocation)}
        </List>
      ) : null}
    </div>
  );
});

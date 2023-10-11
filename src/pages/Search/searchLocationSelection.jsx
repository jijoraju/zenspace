import React, { useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// components
import Select from "@components/Selection";
import useInput from "@hook/use-input";
import useHttp from "@hook/use-http";

// reducer and actions
import {
  getLocationHandler,
  storeLocation,
  getLocationFromStorage,
} from "@Reducer/workspace/wk-action";

function SearchLocationSelection(props) {
  const dispatch = useDispatch();
  const cityInputRef = useRef();
  const [searchParams] = useSearchParams();

  const location = searchParams.get("location");
  const locationArr = useSelector((state) => state.workSpace.location);

  // fetch location api
  const {
    sendRequest: fetchLocationApi,
    status,
    data: locationData,
  } = useHttp(getLocationHandler);

  //  if no location list will fetch location api and then store them
  useEffect(() => {
    if (!locationArr.length) {
      const locationList = getLocationFromStorage();
      dispatch(storeLocation({ data: locationList }));
      fetchLocationApi();
    } else {
      defaultHandler(location || locationArr[0].name);
    }
  }, [locationData, storeLocation, dispatch]);

  // city location input
  const {
    value: enteredCity,
    valueChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHandler,
    defaultHandler,
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
    options: locationArr || [],
    className: `home-header-CityBox-container-inputBox`,
  };

  useEffect(() => {
    props.setLocationHandler(enteredCity);
  }, [enteredCity]);

  return (
    <>
      {/* <Select optionActive={location} {...cityInputProps} /> */}
      <Select optionActive={location} {...cityInputProps}>
        {locationArr.map((item, index) => (
          <option key={index} value={item.name}>
            {item.name}
          </option>
        ))}
      </Select>
    </>
  );
}

export default React.memo(SearchLocationSelection);

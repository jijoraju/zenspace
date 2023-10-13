import React, { useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// components
import Select from "@components/Selection";
import MuiSelection from '@components/MuiSelection'
import MenuItem from "@mui/material/MenuItem";

// custom hook
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
   async function getLocationList(){
      if (!locationArr.length) {
        const locationList = await getLocationFromStorage();
        await dispatch(storeLocation({ data: locationList }));
        await fetchLocationApi();
      } else {
        defaultHandler(location || locationArr[0].name);
      }
    }

    getLocationList()
  }, [locationData, storeLocation, dispatch,locationArr]);

  // city location input
  const {
    value: enteredCity,
    valueChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHandler,
    defaultHandler,
  } = useInput();

  // City input props variable
  const cityInputProps = {
    // ref: cityInputRef,
    id: `City`,
    label: ``,
    name: `Location`,
    value: enteredCity,
    defaultValue: location,
    onChange: cityChangeHandler,
    onBlur: cityBlurHandler,
    options: locationArr || [],
    containerStyle: `searchContainer-selectionContainer-selectionsRow-types-Container`,
    className: `searchContainer-selectionContainer-selectionsRow-types-Container-list`,
    itemClassName: `searchContainer-selectionContainer-selectionsRow-types-Container-item`,
  };

  useEffect(() => {
    const filterSelected = locationArr.filter((item)=>item.name.toLowerCase() == enteredCity.toLowerCase())[0]
    props.setLocationHandler(filterSelected);
  }, [enteredCity]);

  return (
    <>
      {/* <Select optionActive={location} {...cityInputProps} /> */}
      {/* <Select optionActive={location} {...cityInputProps}>
        {locationArr.map((item, index) => (
          <option key={index} value={item.name}>
            {item.name}
          </option>
        ))}
      </Select> */}
      <MuiSelection {...cityInputProps}>
        {locationArr.map((item, index) => (
          <MenuItem
            key={index}
            value={item.name}
            className={`searchContainer-selectionContainer-selectionsRow-types-Container-item`}
          >
            {item.name}
          </MenuItem>
        ))}
      </MuiSelection>
    </>
  );
}

export default React.memo(SearchLocationSelection);

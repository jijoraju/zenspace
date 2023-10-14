import React, { useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// components
import Select from "@components/Selection";
import MuiSelection from "@components/MuiSelection";
import MenuItem from "@mui/material/MenuItem";

// custom hook
import useInput from "@hook/use-input";

const priceRangeData = [
  {
    value: `0-39`,
  },
  {
    value: `40-79`,
  },
  {
    value: `80-119`,
  },
  {
    value: `120-159`,
  },
  {
    value: `160-200`,
  },
];

function PriceRangeSelection(props) {
  // price range input
  const {
    value: enteredPriceRange,
    valueChangeHandler: priceChangeHandler,
    inputBlurHandler: priceBlurHandler,
    defaultHandler,
  } = useInput();

  // City input props variable
  const prInputProps = {
    // ref: cityInputRef,
    id: `PriceRange`,
    label: ``,
    name: `Price Range`,
    value: enteredPriceRange,
    // defaultValue: location,
    onChange: priceChangeHandler,
    onBlur: priceBlurHandler,
    // options: priceRangeData || [],
    containerStyle: `productContainer-selectionContainer-selectionsRow-types-Container ${
      props.showMore ? "showMore" : ""
    }`,
    className: `productContainer-selectionContainer-selectionsRow-types-Container-list`,
    itemClassName: `productContainer-selectionContainer-selectionsRow-types-Container-item`,
  };

  useEffect(() => {
    defaultHandler(priceRangeData[4].value);
  }, []);

  useEffect(() => {
    props.setPriceRangeHandler(enteredPriceRange);
  }, [enteredPriceRange]);

  return (
    <>
      <MuiSelection {...prInputProps}>
        {priceRangeData.map((item, index) => (
          <MenuItem
            key={index}
            value={item.value}
            className={`productContainer-selectionContainer-selectionsRow-types-Container-item`}
          >
            {item.value}
          </MenuItem>
        ))}
      </MuiSelection>
    </>
  );
}

export default React.memo(PriceRangeSelection);

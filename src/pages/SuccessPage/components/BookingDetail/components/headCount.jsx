import React, { useRef, useEffect } from "react";

// components
import Select from "@components/Selection";
import MuiSelection from "@components/MuiSelection";
import MenuItem from "@mui/material/MenuItem";

// custom hook
import useInput from "@hook/use-input";

function HeadCount(props) {
  const headCountRef = useRef();

  // selection data
  const headCountArr = Array(props?.maximum || 10)
  .fill(null)
  .map((item, index) => (item = { value: index + 1 }));

  // date location input
  const {
    value: headCountValue,
    valueChangeHandler: headCountChangeHandler,
    inputBlurHandler: headCountBlurHandler,
    defaultHandler,
  } = useInput();

  // date input props variable
  const datePickerProps = {
    // ref: headCountRef,
    id: `HeadCount`,
    label: ``,
    name: `Head Count`,
    value: headCountValue,
    onChange: headCountChangeHandler,
    onBlur: headCountBlurHandler,
    options: headCountArr,
    containerStyle: `productContainer-selectionContainer-selectionsRow-types-Container`,
    className: `productContainer-selectionContainer-selectionsRow-types-Container-list`,
    itemClassName: `productContainer-selectionContainer-selectionsRow-types-Container-item`,
  };

  useEffect(() => {
    defaultHandler(1);
  }, []);

  useEffect(() => {
    props.setHeadCountHandler(headCountValue);
  }, [headCountValue]);

  return (
    <MuiSelection {...datePickerProps}>
      {headCountArr.map((item, index) => (
        <MenuItem
          key={index}
          value={item.value}
          className={`productContainer-selectionContainer-selectionsRow-types-Container-item`}
        >
          {item.value}
        </MenuItem>
      ))}
    </MuiSelection>
  );
}

export default React.memo(HeadCount);

import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// components
import MuiSelection from "@components/MuiSelection";
import MenuItem from "@mui/material/MenuItem";

// custom hook
import useInput from "@hook/use-input";
import useHttp from "@hook/use-http";

const dateOptions = [
  {
    name: "ASC",
  },
  {
    name: "DES",
  },
];

function Sequence(props) {
  const dateInputRef = useRef();

  // date location input
  const {
    value: enteredDate,
    valueChangeHandler: dateChangeHandler,
    inputBlurHandler: dateBlurHandler,
    defaultHandler,
  } = useInput();

  // date input props variable
  const datePickerProps = {
    // ref: dateInputRef,
    id: `Sequence`,
    label: ``,
    name: `Sequence`,
    value: enteredDate,
    onChange: dateChangeHandler,
    onBlur: dateBlurHandler,
    options: dateOptions || [],
    containerStyle: `productContainer-selectionContainer-selectionsRow-types-Container ${
      props.showMore ? "showMore" : ""
    }`,
    className: `productContainer-selectionContainer-selectionsRow-types-Container-list`,
    itemClassName: `productContainer-selectionContainer-selectionsRow-types-Container-item`,
  };

  useEffect(() => {
    defaultHandler(dateOptions[0].name);
    props.setSequenceHandler(`asc`);
  }, []);

  useEffect(() => {
    if (enteredDate == "DES") {
      props.setSequenceHandler(`desc`);
    } else {
      props.setSequenceHandler(`asc`);
    }
  }, [enteredDate]);

  return (
    <>
      <MuiSelection {...datePickerProps}>
        {dateOptions.map((item, index) => (
          <MenuItem
            key={index}
            value={item.name}
            className={`productContainer-selectionContainer-selectionsRow-types-Container-item`}
          >
            {item.name}
          </MenuItem>
        ))}
      </MuiSelection>
    </>
  );
}

export default React.memo(Sequence);

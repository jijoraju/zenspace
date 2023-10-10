import React, { useState, useRef, useEffect, } from "react";
import { useNavigate,Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// components
import Button from "@components/Button";
import Image from "@components/Images";
import Input from "@components/Input";
import Select from "@components/Selection";
import useInput from "@hook/use-input";
import useHttp from "@hook/use-http";

// reducer and actions
import {
  getLocationHandler,
  storeLocation,
} from "@Reducer/workspace/wk-action";

const dateOptions = [
  {
    name: 'Today',
  },
  {
    name: 'Custom',
  },
]

function DatePicker(props) {
  const dateInputRef = useRef();

  // date location input
  const { 
    value: enteredDate,
    valueChangeHandler: dateChangeHandler,
    inputBlurHandler: dateBlurHandler,
  } = useInput();

  // date input props variable
  const datePickerProps = { 
    ref: dateInputRef,
    id: `City`,
    label: ``,
    name: `city`,
    value: enteredDate,
    onChange: dateChangeHandler,
    onBlur: dateBlurHandler,
    options:dateOptions || [],
    className: `home-header-CityBox-container-inputBox`,
  };

  useEffect(()=>{
    if(enteredDate == 'Custom'){
      props.datePickerVisible(true)
    }else{
      props.datePickerVisible(false)
    }
  },[enteredDate])

  // console.log('enteredDate',enteredDate)
  return (
    <>
      <Select {...datePickerProps} />
    </>
  );
}

export default React.memo(DatePicker)

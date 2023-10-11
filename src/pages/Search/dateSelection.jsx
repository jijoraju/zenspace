import React, { useState, useRef, useEffect, } from "react";
import { useNavigate,Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// components
import Button from "@components/Button";
import Image from "@components/Images";
import Input from "@components/Input";
import Select from "@components/Selection";
import MuiSelection from '@components/MuiSelection'

// custom hook
import useInput from "@hook/use-input";
import useHttp from "@hook/use-http";

const dateOptions = [
  {
    name: 'Single Day',
  },
  {
    name: 'Multiple Day',
  },
]

function DateSelection(props) {
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
    id: `Date`,
    label: ``,
    name: `Date Picker`,
    value: enteredDate,
    onChange: dateChangeHandler,
    onBlur: dateBlurHandler,
    options:dateOptions || [],
    containerStyle: `searchContainer-selectionContainer-selectionsRow-types-Container`,
    className: `searchContainer-selectionContainer-selectionsRow-types-Container-list`,
    itemClassName: `searchContainer-selectionContainer-selectionsRow-types-Container-item`,
  };

  useEffect(()=>{
    defaultHandler(`Single Day`)
  },[])

  useEffect(()=>{
    if(enteredDate == 'Multiple Day'){
      props.datePickerVisible(`range`)
    }else{
      props.datePickerVisible(`single`)
    }
  },[enteredDate])

  return (
    <>
      {/* <Select {...datePickerProps} /> */}
      {/* <Select {...datePickerProps}>
        {dateOptions.map((item,index)=><option key={index} value={item.name}  >{item.name}</option>)}
      </Select> */}
      <MuiSelection {...datePickerProps} />
    </>
  );
}

export default React.memo(DateSelection)

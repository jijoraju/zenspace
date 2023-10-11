import React,{useRef,useEffect} from 'react'

// components
import Select from "@components/Selection";
import useInput from "@hook/use-input";

// selection data
const headCountArr = Array(10).fill(1).map((item,index)=> item = index+1)

function HeadCount(props) {
  const headCountRef = useRef();

  // date location input
  const { 
    value: headCountValue,
    valueChangeHandler: headCountChangeHandler,
    inputBlurHandler: headCountBlurHandler,
    defaultHandler,
  } = useInput();

  // date input props variable
  const datePickerProps = { 
    ref: headCountRef,
    id: `headCount`,
    label: ``,
    name: `headCount`,
    value: headCountValue,
    onChange: headCountChangeHandler,
    onBlur: headCountBlurHandler,
    // options: headCountArr,
    className: `home-header-CityBox-container-inputBox`,
  };
  
  useEffect(()=>{
    defaultHandler(1)
  },[])

  useEffect(()=>{
    props.setHeadCountHandler(headCountValue)
  },[headCountValue])

  return (
    <Select {...datePickerProps}>
      {
      headCountArr.map((item,index)=><option key={index} value={item}>{item}</option>) 
      }
    </Select>
  )
}

export default React.memo(HeadCount)

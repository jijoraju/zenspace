import React, { useRef, useEffect }  from 'react'

// components
import Input from "@components/Input";
import useInput from "@hook/use-input";

function CustomInput(props) {
  const inputRef = useRef();

  const {
    value: enteredValue,
    isValid: enteredValueIsValid,
    hasError: inputHasError,
    valueChangeHandler: onChangeHandler,
    inputBlurHandler: onBlurHandler,
    reset: resetFirstNameInput,
  } = useInput((value) => props?.validation?.test(value));

  const inputProps = {
    ref: inputRef,
    id: props.id,
    label: props.label,
    type: props.type,
    isValid: enteredValueIsValid,
    value: props.id == 'cardNumber' ? enteredValue?.replace(/(\d{4})(?=\d)/g, '$1 ') : enteredValue,
    onChange: onChangeHandler,
    onBlur: onBlurHandler,
    hasError: inputHasError,
    placeholder: props?.placeholder,
    inputStyle: props?.inputStyle,
    max: props?.max || 99,
  }

  useEffect(()=>{
    if(enteredValueIsValid && !inputHasError){
      props.onChange(enteredValue)
    }

  },[enteredValue])

  return (
    <Input
      {...inputProps}
      className={`paymentForm-inputBox`}
    />
  )
}

export default React.memo(CustomInput)

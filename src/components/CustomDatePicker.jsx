import React, { useRef, useImperativeHandle, useEffect } from "react";
import moment from "moment-timezone";

export const dateFormat = (date) => {
  return new Date(date).toLocaleDateString()
};
// return canada time zone and format
export const localDateFormat = (val)=>{
 const date = moment(val).tz("America/Toronto");
 return date.format("YYYY-MM-DD");
}
// extend a day or multiple days
export const extendDaysHandler = (date,num=1)=>{
  const day = num==1 ?`day`: `days`
  return moment(date).add(num, day)
}

const CustomDatePicker = React.forwardRef((props, ref) => {
  const inputRef = useRef();

  const activate = () => {
    inputRef.current.focus();
  };

  useImperativeHandle(ref, () => {
    return {
      focus: activate,
    };
  });

  return (
    <div className={props.className}>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        ref={inputRef}
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onFocus={props?.onFocus}
        onBlur={props.onBlur}
        min={dateFormat(props.min)}
        max={props?.max && dateFormat(props?.max)}
      />
    </div>
  );
});

export default React.memo(CustomDatePicker);

import React,{ useRef, useEffect, useState, useReducer } from 'react';

import moment from 'moment';


function reducer(state,action){
  switch (action.type) {
    case "setMonth":
      return {
        ...state,
        month: action.param,
      };
    case "setYear":
      return {
        ...state,
        year: action.param,
      };
    default:
      return state;
  }
}

const MonthYearPicker = (props) => {
  const [err, setErr] = useState(null);
  const monthRef = useRef(null)
  const yearRef = useRef(null)

  const [ detailState , dispatch] = useReducer(reducer,{ 
    month: '',
    year: '',
  })

  const setMonthHandler = (param) => {
    dispatch({ type: `setMonth`, param });
  };

  const setYearHandler = (param) => {
    dispatch({ type: `setYear`, param });
  };

  const monthOnChanged = (event)=>{
      const value = event.target.value

      if(value && !props.validation.test(value)){
        setErr(`Format is error`)
        return
      }else{
        setErr(null)
      }

      // adds 0 to month user input like 9 -> 09
      if (value.length === 1 && value > 1) {
         event.target.value = "0" + value;
      }
      // bounds
      if (value === "00") {
         event.target.value = "01";
      } else if (value > 12) {
         event.target.value = "12";
      }
      // if we have a filled input we jump to the year input
      event.target.value.length == 2 && yearRef.current.focus();
      setMonthHandler(event.target.value)
  }

  const yearOnChanged = (event)=>{
      const value = event.target.value;
      let yearE = event.target.value
      const nowYear = moment().year()

      yearE = "20" + value;
      
      if(value && !props.validation.test(value)){
        setErr(`Format is error`)
      }else if(yearE < nowYear){
        setErr(`Less than now`)
      }else{
        setErr(null)
      }

      setYearHandler(yearE)
  }

  useEffect(()=>{
    props.onChange(detailState)
  },[detailState])

  return (
    <div className='exp-Container'>
      <p className='title'>Expiry</p>
      <div className="exp-wrapper">
        <input ref={monthRef} autoComplete="off" className="exp" id="month" maxLength="2" pattern="[0-9]*" inputMode="numerical" placeholder="MM" type="text" data-pattern-validate onChange={monthOnChanged} />
        <input ref={yearRef} autoComplete="off" className="exp" id="year" maxLength="2" pattern="[0-9]*" inputMode="numerical" placeholder="YY" type="text" data-pattern-validate onChange={yearOnChanged}  />
      </div>

      <p className='exp-err'>{err && err}</p>
    </div>
  );
};

export default MonthYearPicker;

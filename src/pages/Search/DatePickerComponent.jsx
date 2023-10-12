import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import moment from "moment-timezone";

// components
import CustomDatePicker, {
  extendDaysHandler,
  localDateFormat,
} from "@components/CustomDatePicker";

// custom hook
import useInput from "@hook/use-input";

function DatePicker(props) {
  const startDateRef = useRef();
  const endDateRef = useRef();

  const nowDate = moment().tz("America/Toronto");
  const nextDate = extendDaysHandler(nowDate);
  const sevenDays = extendDaysHandler(nowDate, 6);

  const [minDateEnd, setMinDateEnd] = useState(nextDate.clone());
  const [maxDateEnd, setMaxDateEnd] = useState(sevenDays);

  // start date custom input hook
  const {
    value: enteredStartDate,
    valueChangeHandler: startDateChangeHandler,
    inputBlurHandler: startDateBlurHandler,
    defaultHandler: defaultStartDate,
  } = useInput();

  // start date input props variable
  const startDateProps = {
    ref: startDateRef,
    id: `startDate`,
    label: ``,
    name: `StartDate`,
    type: `date`,
    value: enteredStartDate,
    onChange: startDateChangeHandler,
    onBlur: startDateBlurHandler,
    min: nowDate,
    className: `searchContainer-selectionContainer-selectionsRow-datePicker-item`,
  };

  // end date custom input hook
  const {
    value: enteredEndDate,
    valueChangeHandler: endDateChangeHandler,
    inputBlurHandler: endDateBlurHandler,
    defaultHandler: defaultEndDate,
  } = useInput();

  // end date input props variable
  const endDateProps = {
    ref: endDateRef,
    id: `endDate`,
    label: ``,
    name: `EndDate`,
    type: `date`,
    value: enteredEndDate,
    onChange: endDateChangeHandler,
    onBlur: endDateBlurHandler,
    min: enteredStartDate ? minDateEnd : nextDate,
    max: maxDateEnd,
    className: `searchContainer-selectionContainer-selectionsRow-datePicker-item`,
  };

  // default start date and end date
  useEffect(() => {
    defaultStartDate(localDateFormat(nowDate));
    defaultEndDate(localDateFormat(minDateEnd));
  }, []);

  useEffect(() => {
    const selectedStart = localDateFormat(enteredStartDate);

    // Calculate min and max dates for end date
    const minDateEnd = extendDaysHandler(selectedStart, 1);
    const maxDateEnd = extendDaysHandler(selectedStart, 6);

    // Set the state
    setMinDateEnd(minDateEnd);
    setMaxDateEnd(maxDateEnd);

    const selectedEnd = moment(enteredEndDate);
    if (selectedEnd.isBefore(minDateEnd) || selectedEnd.isAfter(maxDateEnd)) {
      if (endDateRef.current) {
        endDateRef.current.value = localDateFormat(minDateEnd);
      }
      endDateChangeHandler({ name: localDateFormat(minDateEnd) });
    }
  }, [enteredStartDate]);

  useEffect(() => {
    props.setDateRangeHandler({
      start: enteredStartDate,
      end: enteredEndDate,
    });
  }, [enteredStartDate, enteredEndDate]);

  return (
    <>
      {props.type == "ONE_DAY" ? (
        <CustomDatePicker {...startDateProps} />
      ) : (
        <>
          <CustomDatePicker {...startDateProps} />
          <span>to</span>
          <CustomDatePicker {...endDateProps} />
        </>
      )}
    </>
  );
}

export default React.memo(DatePicker);

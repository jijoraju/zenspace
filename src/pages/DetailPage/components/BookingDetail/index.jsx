import React, {useState, useEffect,useReducer} from 'react'
import { useNavigate, useLocation } from "react-router-dom";

import moment from 'moment'
import CustomDatePicker, {
  extendDaysHandler,
  localDateFormat,
} from "@components/CustomDatePicker";

function BookingDetail(props) {
  const location = useLocation();

  // props
  const { bookingData } = props.detail

  // render date period
  const renderDatePeriod = () =>{
    if(!bookingData?.end_date){
      return <p>{localDateFormat(bookingData?.start_date)}</p>
    }else{
      return (
        <div className='bookingDetail-contentContainer-item-subWrap'>
          <p>{localDateFormat(bookingData?.start_date)}</p>
          <p> to </p>
          <p>{localDateFormat(bookingData?.end_date)}</p>
        </div>
      )
    }
  }

  return (
    <div className='bookingDetail section'>
      <h1>Booking Detail</h1>

      {/* user */}
      <div className='bookingDetail-contentContainer'>
        <div className='bookingDetail-contentContainer-item'>
          <h2>User</h2>
          <p>{bookingData?.user?.first_name} {bookingData?.user?.last_name}</p>
        </div>
      </div>

      {/* date period */}
      <div className='bookingDetail-contentContainer'>
        <div className='bookingDetail-contentContainer-item'>
          <h2>Create Date</h2>
          <p>{moment(bookingData?.booking_date).tz("America/Toronto").format('YYYY-MM-DD HH:mm:ss')}</p>
        </div>
      </div>

      {/* date period */}
      <div className='bookingDetail-contentContainer'>
        <div className='bookingDetail-contentContainer-item'>
          <h2>Selected Dates</h2>
          {renderDatePeriod()}
        </div>
      </div>

      {/* num of people */}
      <div className='bookingDetail-contentContainer'>
        <div className='bookingDetail-contentContainer-item'>
          <h2>Head Count</h2>
          <p>1 Person</p>
        </div>
      </div>
    </div>
  )
}

export default React.memo(BookingDetail)

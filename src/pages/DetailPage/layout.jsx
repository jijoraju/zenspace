import React, { useEffect, useState, Suspense } from 'react';

// components
import BookingDetail from './components/BookingDetail';
import PaymentDetail from './components/PaymentDetail'
import Policy from "@components/Policy";

const DetailPage = (props) => {

  const { bookingReference } = props?.confirmDetail

  return (
    <>
      <p className='bookingReference'>Booking Reference: {bookingReference}</p>

      <BookingDetail detail={props?.confirmDetail} />
      <PaymentDetail detail={props?.confirmDetail} />

      <Policy 
        onChange={()=>{}} 
        checked={()=>{}} 
        from={`confirm`}
      />
    </>
  );
};

export default DetailPage;
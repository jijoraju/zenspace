import React, { useEffect, useReducer } from 'react'
import { useNavigate, Link, useParams, useLocation, } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import moment from 'moment';
// MUI
import Breadcrumbs from '@mui/material/Breadcrumbs';

// components 
import BookingDetail from './components/BookingDetail'
import PaymentMethods from './components/PaymentMethods'
import CheckoutDetail from './components/checkoutDetail'

// custom hook
import useHttp from "@hook/use-http";

// reducer
import { fetchProductDetailHandler } from "@Reducer/workspace/wk-action";


function paymentReducer(state, action){
  switch (action.type) {
    case "setCheckout":
      return {
        ...state,
        checkoutDetail: action.param,
      };
    case "setBookingDetail":
      return {
        ...state,
        bookingDetail: action.param,
      };
    default:
      return state;
  }
}

function index(props) {
  const location = useLocation();
  const navigate = useNavigate()
  const user = useSelector((state)=>state.user)

  const { pathname , state} = location

  const [checkoutState , dispatch] = useReducer(paymentReducer,{
    selectedDate: state?.selectedDate,
    productDetail: state?.detailData,
    checkoutDetail: null,
    bookingDetail: null,
  })

  const setCheckoutDetailHandler = (param) => {
    dispatch({ type: `setCheckout`, param });
  };

  const setBookingDetailHandler = (param) => {
    dispatch({ type: `setBookingDetail`, param });
  };

  // GA
  useEffect(()=>{
    window.GaTracePageHandler(pathname,'checkout detail')
    if(!user?.isLogin){
      navigate(`/login`);
    }
  },[])

  useEffect(()=>{
    console.log('checkoutState',checkoutState)
  },[checkoutState])


  const backToPreviousHandler= ()=>{
    if(state?.fromPage){
      const pathnames = state?.fromPage.split('/').filter((x) => x);

      const data ={
        detailData: state?.detailData
      }

      navigate(`/${pathnames[0]}/${pathnames[1]}`, { replace: true, state:data });
    }
  }

  return (
    <div className="checkout">
      {/* back button */}
      <p className="checkout-backBtn" onClick={backToPreviousHandler}>
        &lt; Back
      </p>

      <div className="checkout-container">
        <div className="checkout-container-left">
          {/* booking detail */}
          <BookingDetail checkoutState={checkoutState} onChange={setBookingDetailHandler} />

          {/* payment methods */}
          <PaymentMethods onChange={setCheckoutDetailHandler} />
        </div>

        <div>
          <CheckoutDetail />
        </div>
      </div>
    </div>
  );
}

export default index

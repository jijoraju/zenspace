import React, { useEffect, useReducer } from 'react'
import { useNavigate, useLocation, } from "react-router-dom";
import { useSelector, } from "react-redux";

// components 
import BookingDetail from './components/BookingDetail'
import PaymentMethods from './components/PaymentMethods'
import CheckoutDetail from './components/checkoutDetail'
import CustomButton from "@components/Button";

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
    case "setChargeDetail":
      return {
        ...state,
        chargeDetail: action.param,
      };
    default:
      return state;
  }
}

function Checkout(props) {
  const location = useLocation();
  const navigate = useNavigate()
  const user = useSelector((state)=>state.user)

  const { pathname , state} = location

  const [checkoutState , dispatch] = useReducer(paymentReducer,{
    // productDetail: state?.detailData,
    productDetailData: state?.productDetailData,
    checkoutDetail: null,
    bookingDetail: {
      dateSelected:state?.selectedDate,
      peopleCount:1,
    },
    chargeDetail:null
  })

  const setCheckoutDetailHandler = (param) => {
    dispatch({ type: `setCheckout`, param });
  };

  const setBookingDetailHandler = (param) => {
    dispatch({ type: `setBookingDetail`, param });
  };

  const setChargeHandler = (param) => {
    dispatch({ type: `setChargeDetail`, param });
  };

  useEffect(()=>{
    if(!user?.isLogin){
      navigate(`/login`);
    }
  },[])

  useEffect(()=>{
    console.log('checkoutState',checkoutState)
  },[checkoutState])

  // use http hook
  const {
    sendRequest: fetchCheckoutApi,
    status,
    data: CheckoutRes,
  } = useHttp(fetchSubmitHandler);

  async function fetchSubmitHandler() {
    const {productDetailData, bookingDetail, chargeDetail} = checkoutState
    const data = {
      workspaceId:  productDetailData?.workspace_id,
      bookingDetail, 
      chargeDetail,
    }

    const response = await fetchRequest(`/api/checkout`, `POST`, data);
    return response;
  }

  useEffect(()=>{
    console.log('CheckoutRes',CheckoutRes)
    if(CheckoutRes?.data?.url){
      window.location.href = CheckoutRes?.data?.url
    }
  },[CheckoutRes])

  // back to previous
  const backToPreviousHandler= ()=>{
    if(state?.fromPage){
      const pathnames = state?.fromPage.split('/').filter((x) => x);

      const data ={
        detailData: checkoutState?.productDetailData
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

        <div className="checkout-container-right">
          <CheckoutDetail checkoutState={checkoutState} onChange={setChargeHandler} />

          {/* Cancellation policy */}
          <div className='policyWrap'>
            <h1>Cancellation policy</h1>
            <p className='refundable'>This booking is non-refundable. <span>Learn more</span></p>

            <div className='policyCheckBox'>
              <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" defaultChecked />
              <label htmlFor="vehicle1">Please check to acknowledge our Privacy & <a href="#">Terms Policy</a></label>
            </div>
          </div>


          {/* Submit button */}
          <div className='checkoutSubmitWrap'>

            <CustomButton
              onClick={fetchCheckoutApi}
              // onClick={fetchLogout}
              className={`checkoutSubmitWrap-submitBtn buttons`}
              disabled={false}
            >Confirm and pay</CustomButton>


            <CustomButton
              onClick={backToPreviousHandler}
              className={`checkoutSubmitWrap-cancelBtn buttons`}
              disabled={false}
            >Cancel</CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout

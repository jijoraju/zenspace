import React, { useEffect, useReducer, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from 'moment';

// components
import BookingDetail from "./components/BookingDetail";
import PaymentMethods from "./components/PaymentMethods";
import CheckoutDetail from "./components/checkoutDetail";
import CustomButton from "@components/Button";
import Policy from "@components/Policy";

// custom hook
import useHttp from "@hook/use-http";

// reducer
import { fetchProductDetailHandler } from "@Reducer/workspace/wk-action";
import { startOfYesterday } from "date-fns/esm";

function paymentReducer(state, action) {
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
    case "setDisclaimer":
      return {
        ...state,
        disclaimer: action.param,
      };
    default:
      return state;
  }
}

function Checkout(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const disclaimerInput = useRef(null);

  const { state } = location;

  const [checkoutState, dispatch] = useReducer(paymentReducer, {
    // productDetail: state?.detailData,
    productDetailData: state?.productDetailData,
    checkoutDetail: null,
    bookingDetail: {
      dateSelected: state?.selectedDate,
      peopleCount: 1,
    },
    chargeDetail: null,
    disclaimer: false,
    domain: "",
  });

  const [isDisableSubmit, setIsDisableSubmit] = useState(true);

  const setCheckoutDetailHandler = (param) => {
    dispatch({ type: `setCheckout`, param });
  };

  const setBookingDetailHandler = (param) => {
    dispatch({ type: `setBookingDetail`, param });
  };

  const setChargeHandler = (param) => {
    dispatch({ type: `setChargeDetail`, param });
  };

  const setDisclaimerHandler = (param) => {
    dispatch({ type: `setDisclaimer`, param: param.target?.checked });
  };

  useEffect(() => {
    if (!user?.isLogin) {
      navigate(`/login`);
    }
  }, [user]);

  useEffect(() => {
    function changeSubmitBtnStatus() {
      const { productDetailData, bookingDetail, chargeDetail, disclaimer } =
        checkoutState;
      const { workspace_id, workspace_type } = productDetailData;
      const { dateSelected, peopleCount } = bookingDetail;

      if (
        workspace_id &&
        workspace_type &&
        dateSelected &&
        peopleCount &&
        disclaimer
      ) {
        setIsDisableSubmit(false);
      } else {
        setIsDisableSubmit(true);
      }
    }

    changeSubmitBtnStatus();
  }, [checkoutState]);

  // use http hook
  const {
    sendRequest: fetchCheckoutApi,
    status,
    data: CheckoutRes,
  } = useHttp(fetchSubmitHandler);

  async function fetchSubmitHandler() {
    const { productDetailData, bookingDetail, chargeDetail } = checkoutState;

    const { workspace_id, workspace_type } = productDetailData;
    const { dateSelected, peopleCount } = bookingDetail;
    const {charge, tax, Total} = chargeDetail
    console.log('chargeDetail',chargeDetail)
    const domain = window.location.href.split("/payment")[0];

    const data = {
      workspace: {
        id: workspace_id,
        type: workspace_type,
      },
      bookingDetail: {
        dateSelected: {
          start: moment(dateSelected?.start).tz("America/Toronto").format(),
          end: workspace_type == "MULTIPLE_DAYS" ? moment(dateSelected?.end).tz("America/Toronto").format(): "",
        },
        peopleCount,
      },
      chargeDetail:{
        charge, 
        tax, 
        Total,
      },
      domain,
    };

    // console.log('data',data)
    const response = await fetchRequest(`/api/checkout`, `POST`, data);
    return response;
  }

  useEffect(() => {
    if (CheckoutRes?.data?.url) {
      window.location.href = CheckoutRes?.data?.url;
    }
  }, [CheckoutRes]);

  // submit checkout
  const submitForm = ()=>{
    GaEvent('Checkout','Submit','Submit to pay')
    fetchCheckoutApi()
  }

  // back to previous
  const backToPreviousHandler = () => {
    GaEvent('Checkout','Click','Back to previous page')

    if (state?.fromPage) {
      const pathnames = state?.fromPage.split("/").filter((x) => x);
      const { productDetailData, bookingDetail } = checkoutState;
      const data = {
        detailData: productDetailData,
        productFilter: {
          headcounts: bookingDetail?.peopleCount,
          datePeriod: bookingDetail?.dateSelected,
        },
      };

      navigate(`/${pathnames[0]}/${pathnames[1]}`, {
        replace: true,
        state: data,
      });
    }
  };

  return (
    <div className="checkout">
      {/* back button */}
      <p className="checkout-backBtn" onClick={backToPreviousHandler}>
        &lt; Back
      </p>

      <div className="checkout-container">
        <div className="checkout-container-left">
          {/* booking detail */}
          <BookingDetail
            checkoutState={checkoutState}
            onChange={setBookingDetailHandler}
          />

          {/* payment methods */}
          {/* <PaymentMethods onChange={setCheckoutDetailHandler} /> */}
          {/* checkout Detail */}
          {/* <CheckoutDetail checkoutState={checkoutState} onChange={setChargeHandler} /> */}
        </div>

        <div className="checkout-container-right">
          <CheckoutDetail
            checkoutState={checkoutState}
            onChange={setChargeHandler}
          />

          {/* Cancellation policy */}
          <Policy 
            onChange={setDisclaimerHandler} 
            checked={checkoutState?.disclaimer} 
            from={`checkout`}
          />

          {/* Submit button */}
          <div className="checkoutSubmitWrap">
            <CustomButton
              onClick={backToPreviousHandler}
              className={`checkoutSubmitWrap-cancelBtn buttons`}
              disabled={false}
            >
              Cancel
            </CustomButton>

            <CustomButton
              onClick={submitForm}
              // onClick={fetchLogout}
              className={`checkoutSubmitWrap-submitBtn buttons ${
                isDisableSubmit ? "disable" : ""
              }`}
              disabled={isDisableSubmit}
            >
              Confirm and pay
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;

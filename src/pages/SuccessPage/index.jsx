import React, { useEffect, useState, Suspense } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

// components
import LoadingSpinner from "@components/LoadingSpinner";
import Image from "@components/Images";
import CustomButton from "@components/Button";
import BookingDetail from './components/BookingDetail';
import PaymentDetail from './components/PaymentDetail'
import Policy from "@components/Policy";

// custom hook
import useHttp from "@hook/use-http";

const SuccessPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const user = useSelector((state) => state.user);

  const [confirmDetail, setConfirmDetail] = useState(null);
  const queryParams = new URLSearchParams(window.location.search);
  const sessionId = queryParams.get('session_id');
  const result = queryParams.get('result');
  const workspaceId = queryParams.get('workspaceId');

  // use http hook
  const {
    sendRequest: fetchCheckoutApi,
    status,
    data: CheckoutRes,
  } = useHttp(fetchSubmitHandler);

  async function fetchSubmitHandler(id) {
    const response = await fetchRequest(
      `/api/confirm-booking/${id}`,
      `GET`
    );
    return response;
  }

  useEffect(() => {
    console.log('user',user)
    // if (!user?.isLogin) {
    //   navigate(`/login`);
    // }
  }, [user]);

  useEffect(() => {


    if(sessionId && result == 'success'){
      fetchCheckoutApi(sessionId);
    }else if(result == 'cancel'){
      navigate(`/product/${workspaceId}`)
    }

  }, [sessionId]);


  useEffect(() => {
    // console.log('CheckoutRes',CheckoutRes)

    setConfirmDetail(CheckoutRes)
  }, [CheckoutRes]);

  const backToHome = () => {
    navigate('/', { replace:true })
  }

  if(!confirmDetail) return <LoadingSpinner />
  const { bookingReference } = confirmDetail?.data
  return (
    <div className='successContainer'>
      {
        status == 'pending' ? <LoadingSpinner />
        : <>
            <h1 className='pageTitle'>
              { result == 'success' ? `Your booking is confirmed` : `Your booking has been canceled`}
            </h1>

            <p className='bookingReference'>Booking Reference: {bookingReference}</p>

            <BookingDetail detail={confirmDetail?.data} />
            
            <PaymentDetail detail={confirmDetail?.data} />

            <Policy 
              onChange={()=>{}} 
              checked={()=>{}} 
              from={`confirm`}
            />

            <CustomButton
              onClick={backToHome}
              className={`successContainer-backBtn`}
              disabled={false}
            >Back to home</CustomButton>
          </>
      }
    </div>
  );
};

export default SuccessPage;
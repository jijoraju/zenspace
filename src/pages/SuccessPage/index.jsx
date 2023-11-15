import React, { useEffect, useState, Suspense } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

// components
import LoadingSpinner from "@components/LoadingSpinner";
import Image from "@components/Images";
import CustomButton from "@components/Button";

// custom hook
import useHttp from "@hook/use-http";

const SuccessPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const user = useSelector((state) => state.user);

  const [sessionDetails, setSessionDetails] = useState(null);
  const queryParams = new URLSearchParams(window.location.search);
  const sessionId = queryParams.get('session_id');
  const result = queryParams.get('result');

  // use http hook
  const {
    sendRequest: fetchCheckoutApi,
    status,
    data: CheckoutRes,
  } = useHttp(fetchSubmitHandler);

  async function fetchSubmitHandler(id) {
    const response = await fetchRequest(`/api/test-success/${id}`, `GET`);
    return response;
  }

  useEffect(() => {
    console.log('user',user)
    // if (!user?.isLogin) {
    //   navigate(`/login`);
    // }
  }, [user]);

  useEffect(() => {

    // console.log('queryParams',queryParams)
    // console.log('sessionId',sessionId)
    // console.log('result',result)
    // console.log('location',location)

    // if(sessionId && result == 'success'){
      fetchCheckoutApi(sessionId);
    // }
    // else if(result == 'cancel'){
    //   navigate('/')
    // }

  }, [sessionId]);


  useEffect(() => {
    // console.log('CheckoutRes',CheckoutRes)

    setSessionDetails(CheckoutRes?.id)
  }, [CheckoutRes]);

  const backToHome = () => {
    navigate('/', { replace:true })
  }

  return (
    <div className='successContainer'>
      {
        status == 'pending' ? <LoadingSpinner />
        : <>
            {
              result == 'success' && 
              <Image
                src={`payment/success/success.png`}
                alt={`success img`}
                styles={`successContainer-successIcon`}
                img2={`payment/success/success.png`}
                img3={`payment/success/success.png`}
              />
            }
            <h1>You have { result == 'success' ? `successfully` : `canceled`} topped up your card</h1>
            {/* <p>Session ID: {sessionDetails}</p> */}
            {/* Display more details from sessionDetails as needed */}

            <CustomButton
              onClick={backToHome}
              // onClick={fetchLogout}
              className={`successContainer-backBtn`}
              disabled={false}
            >Back to home</CustomButton>
          </>
      }
    </div>
  );
};

export default SuccessPage;
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from "react-router-dom";

// custom hook
import useHttp from "@hook/use-http";

const SuccessPage = () => {
  const navigate = useNavigate()
  const [sessionDetails, setSessionDetails] = useState(null);
  const queryParams = new URLSearchParams(window.location.search);
  const sessionId = queryParams.get('session_id');
  const checkoutResult = queryParams.get('result');
  const { session_id, success, cancel } = useParams();

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

    console.log('queryParams',queryParams)
    console.log('sessionId',sessionId)
    console.log('session_id',session_id)

    if(sessionId && checkoutResult == 'success'){
      fetchCheckoutApi(sessionId);
    }else if(checkoutResult == 'cancel'){
      navigate('/')
    }

  }, [session_id,sessionId]);


  useEffect(() => {
    console.log('CheckoutRes',CheckoutRes)

    setSessionDetails(CheckoutRes?.id)
  }, [CheckoutRes]);


  if (!sessionDetails) return <div>Loading...</div>;


  return (
    <div>
      <h1>Payment Successful</h1>
      <p>Session ID: {sessionDetails}</p>
      {/* Display more details from sessionDetails as needed */}
    </div>
  );
};

export default SuccessPage;
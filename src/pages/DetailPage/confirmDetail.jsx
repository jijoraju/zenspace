import React, { useEffect, useState, Suspense } from 'react';
import { useSelector, } from "react-redux";
import { useNavigate, } from "react-router-dom";

// components
import LoadingSpinner from "@components/LoadingSpinner";
import Image from "@components/Images";
import CustomButton from "@components/Button";
import BookingDetail from './components/BookingDetail';
import PaymentDetail from './components/PaymentDetail'
import Policy from "@components/Policy";
import DetailLayout from './layout'

// custom hook
import useHttp from "@hook/use-http";

const DetailPage = () => {
  const navigate = useNavigate()
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
    if(sessionId && result == 'success'){
      fetchCheckoutApi(sessionId);
    }else if(result == 'cancel'){
      navigate(`/product/${workspaceId}`)
    }
  }, [sessionId]);

  useEffect(() => {
    setConfirmDetail(CheckoutRes)
  }, [CheckoutRes]);

  const backToHome = () => {
    GaEvent('Confirm','Click','Back to home')
    navigate('/', { replace:true })
  }

  const backToTransaction = () => {
    GaEvent('Confirm','Click','Back to home')
    navigate('/profile/transaction', { replace:true })
  }

  if(!confirmDetail) return <LoadingSpinner />
  return (
    <div className='successContainer'>
      {
        status == 'pending' ? <LoadingSpinner />
        : <>
            <h1 className='pageTitle'>
              { result == 'success' ? `Your booking is confirmed` : `Your booking has been canceled`}
            </h1>

            <DetailLayout confirmDetail={confirmDetail?.data} />
            <div className='successContainer-btnsWrap'>
              <CustomButton
                onClick={backToHome}
                className={`successContainer-btnsWrap-backBtn`}
                disabled={false}
              >Back to home</CustomButton>
              
              <CustomButton
                onClick={backToTransaction}
                className={`successContainer-btnsWrap-backBtn`}
                disabled={false}
              >Go to transactions record</CustomButton>
            </div>
          </>
      }
    </div>
  );
};

export default DetailPage;
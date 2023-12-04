import React, { useEffect, useState, Suspense } from 'react';
import { useSelector, } from "react-redux";
import { useNavigate, useLocation} from "react-router-dom";

// components
import LoadingSpinner from "@components/LoadingSpinner";
import CustomButton from "@components/Button";
import DetailLayout from './layout'

const DetailPage = (props) => {
  const navigate = useNavigate()
  const location = useLocation();

  const user = useSelector((state) => state.user);
  const {state} = location

  useEffect(() => {
    if(!user?.isLogin){
        navigate(`/login`,{replace:true})
      }
  }, [user]);

  const [confirmDetail, setConfirmDetail] = useState(state);

  const backToHome = () => {
    GaEvent('Confirm','Click','Back to home')
    navigate('/profile/transaction', { replace:true })
  }

  if(!confirmDetail) return <LoadingSpinner />
  return (
    <div className='successContainer'>

      <DetailLayout confirmDetail={confirmDetail} />

      <div className='successContainer-btnsWrap'>
        <CustomButton
          onClick={backToHome}
          className={`successContainer-btnsWrap-backBtn`}
          disabled={false}
        >Back</CustomButton>
      </div>

    </div>
  );
};

export default DetailPage;
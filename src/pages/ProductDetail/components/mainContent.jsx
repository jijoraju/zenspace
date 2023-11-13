import React, { useReducer, useState, useEffect } from "react";
import { useNavigate, Link, useParams, useLocation, } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import moment from 'moment';

// MUI
import Rating from "@components/Rating";
// MUI icon
import StarIcon from '@mui/icons-material/Star';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

// components
import Image from "@components/Images";
import CustomButton from "@components/Button";
import DatePicker from "@components/DatePickerComponent";

// data
import { checkBoxDes, facilities} from '@Data/detail'


function MainContent({productDetailData}) {
  const location = useLocation();
  const navigate = useNavigate()
  const user = useSelector((state)=>state.user)
  
  const {name, no_of_spaces, workspaceAddress, description,amenities,avgRating, price_per_day, reviews, workspace_type, workspace_id} = productDetailData?.data

  const [ dateData, setDateData] = useState({});
  const [ gap, setGap] = useState(1);
  
  const setDateRangeHandler = (param) => {
    setDateData(param)
  };

  useEffect(()=>{
    const startDate = moment(dateData?.start)
    const endDate = moment(dateData?.end)

    // 計算兩個日期之間的時間間隔
    const duration = moment.duration(endDate.diff(startDate));

    // 取得間隔的天數
    const days = duration.asDays();
    const type = workspace_type == "ONE_DAY" ? 0 : 1
    setGap(days+type)

  },[dateData])

  const submitPay = ()=>{
    const {pathname, state} = location

    const data = {
      // detailData: state?.detailData,
      fromPage: pathname,
      selectedDate: dateData,
      productDetailData: productDetailData?.data,
    }

    if(!user?.isLogin){
      navigate('/login',{ state:data })
    }else{
      navigate('/payment',{ state:data })
    }
    
  }

  return (
    <div className="detailContainer-mainContent">
      {/* information */}
      <div className="detailContainer-mainContent-info">
        <h1>{name}</h1>
        <Rating value={avgRating} />

        <div className='subtitleWrap'>
          <p>Private Pass - {no_of_spaces} Available</p>
          <p>{workspaceAddress?.address}</p>
        </div>

        <div className='detailWrap'>
          <p>Spacious private desk</p>
          <p>{description}</p>
        </div>

        {/* workspace Amenities */}
        {
          !amenities?.length ?null :(
            <div className='workspaceAmenities'>
              <p>Office Space Amenities</p>

              {/* facilities */}
              <div className='amenities'>
                {amenities?.map((item,index)=>{

                  const findIcon = facilities.filter((f)=> decodeURIComponent(f.name) == item)[0]

                  // if(!findIcon) return false
                  return (
                    <div key={index}>
                      <Image
                        src={`icon/facilities/${findIcon?.img}/${findIcon?.img}.png`}
                        alt={`${item}`}
                        styles={`check-img`}
                        img2={`icon/facilities/${findIcon?.img}/${findIcon?.img}@2x.png`}
                        img3={`icon/facilities/${findIcon?.img}/${findIcon?.img}@3x.png`}
                      />
                      <p>{item}</p>
                    </div>
                  );
                }) || null}
              </div>
            </div>
          )
        }
      </div>

      {/* check box */}
      <div className='checkBox'>
        {/* price info */}
        <div className='checkBox-priceInfo'>
          <div className='priceDay'>
            <h1>CA$ {price_per_day}</h1>
            <p>/Daily</p>
          </div>

          <div className='reviewArea'>
            <div className='reviewArea-Container'>
              <StarIcon className='reviewArea-Container-star' />
              <span>{avgRating}</span>
            </div>
            <span> , </span>
            <span>{reviews?.length} reviews</span>
          </div>
        </div>

        <div  className='checkBox-datePicker'>
          <DatePicker
            type={workspace_type}
            cssStyle={`datePicker`}
            setDateRangeHandler={setDateRangeHandler}
          />
        </div>
        
        <div className="priceGapArea">
          <p>CA$ {price_per_day} <CloseRoundedIcon /> {gap} days</p>
          <p>CA$ {price_per_day * gap}</p>
        </div>

        {/*  */}
        <div className='checkBox-info'>
          {checkBoxDes.map((item,index)=>(
            <div key={index} className='checkBox-info-infoRow'>
              <Image
                src={`icon/check/checkYello.png`}
                alt={`check`}
                styles={`check-img`}
                img2={`icon/check/checkYello.png`}
                img3={`icon/check/checkYello.png`}
              />
              <p>{item}</p>
            </div>
          ))}
        </div>

        {/* submit */}
        <CustomButton
          onClick={submitPay}
          className={`checkBox-submitBtn`}
          disabled={false}
        >
          Book It Now
        </CustomButton>
      </div>

    </div>
  );
}

export default React.memo(MainContent)

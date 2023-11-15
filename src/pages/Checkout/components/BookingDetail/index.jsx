import React, {useState, useEffect,useReducer} from 'react'
import { useNavigate, useLocation } from "react-router-dom";

// components
import DatePicker from "@components/DatePickerComponent";
import CustomButton from "@components/Button";
import HeadCount from './components/headCount';
 

function detailReducer(state,action){
  switch (action.type) {
    case "setDate":
      return {
        ...state,
        dateSelected: {
          ...state.dateSelected,
          start: action.param?.start,
          end: action.param?.end,
        },
      };
    case "setHeadCount":
      return {
        ...state,
        peopleCount: +action.param,
      };
    default:
      return state;
  }
}

function BookingDetail(props) {
  const location = useLocation();
  // props
  const {productDetailData, bookingDetail} = props.checkoutState
  const { workspace_type, no_of_spaces } = productDetailData

  // state
  const [dateEdited, setDateEdited] = useState(false)
  const [peopleEdited, setPeopleEdited] = useState(false)
  const { state } = location;

  const [ detailState , dispatch] = useReducer(detailReducer,{
    dateSelected: bookingDetail?.dateSelected,
    peopleCount: state?.headcount || 1,
  })

  const setDateRangeHandler = (param) => {
    dispatch({ type: `setDate`, param });
  };
  const setHeadCountHandler = (param) => {
    dispatch({ type: `setHeadCount`, param });
  };

  useEffect(()=>{
    const {dateSelected, peopleCount} = detailState

    if(dateSelected && peopleCount){
      props.onChange(detailState)
    }

  },[detailState])

  // render date period
  const renderDatePeriod = () =>{
    if(workspace_type == "ONE_DAY"){
      return <p>{detailState?.dateSelected?.start}</p>
    }else{
      return (
        <>
          <p>{detailState?.dateSelected?.start}</p>
          <p> to </p>
          <p>{detailState?.dateSelected?.end}</p>
        </>
      )
    }
  }

  return (
    <div className='checkout-container-left-bookingDetail checkout-container-section'>
      <h1>Your Booking Detail</h1>

      {/* date period */}
      <div className='bookingDetail-contentContainer'>
        <div className='bookingDetail-contentContainer-item'>
          <h2>Dates</h2>

          <CustomButton
            className={`bookingDetail-contentContainer-item-editBtn`}
            onClick={()=>setDateEdited(!dateEdited)}
            disabled={false}
          >
            {dateEdited ? `Save` : `Edit`}
          </CustomButton>

        </div>

        <div className='bookingDetail-contentContainer-item'>
          { dateEdited ? 
          <DatePicker 
            setDateRangeHandler={setDateRangeHandler} 
            initialDate={detailState?.dateSelected}
            cssStyle={`datePicker`} 
            type={workspace_type}
          /> 
          : renderDatePeriod()}
        </div>
      </div>

      {/* num of people */}
      <div className='bookingDetail-contentContainer'>
        <div className='bookingDetail-contentContainer-item'>
          <h2>Number of  desks</h2>
          <CustomButton
            className={`bookingDetail-contentContainer-item-editBtn`}
            onClick={()=>setPeopleEdited(!peopleEdited)}
            disabled={false}
          >
            {peopleEdited ? `Save` : `Edit`}
          </CustomButton>
        </div>

        <div className='bookingDetail-contentContainer-item'>
          {peopleEdited?
            <HeadCount 
              setHeadCountHandler={setHeadCountHandler} 
              maximum={no_of_spaces}
            />
            :<p>{detailState?.peopleCount} person</p>
          }
          
        </div>
      </div>
    </div>
  )
}

export default React.memo(BookingDetail)

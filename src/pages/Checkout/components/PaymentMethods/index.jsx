import React, {useState, useEffect,useReducer} from 'react'

// components
import CustomInput from './components/nameInput';
import ExpirationInput from './components/expiration'

import Image from "@components/Images";

// validation
import {paymentName,paymentExpiration,paymentCardNum,paymentCvv,paymentPostCode} from '$LIB/validation';

function paymentReducer(state,action){
  switch (action.type) {
    case "setName":
      return {
        ...state,
        NameOfCard: action.param,
      };
    case "setExpiration":
      return {
        ...state,
        expiration: action.param,
      };
    case "setCardNum":
      return {
        ...state,
        cardNumber: action.param?.replace(/\D/g, ''),
      };
    case "setCvvNum":
      return {
        ...state,
        cvvNum: action.param,
      };
    case "setPostCode":
      return {
        ...state,
        postCode: action.param,
      };
    default:
      return state;
  }
}

function PaymentMethods(props) {

  const [ detailState , dispatch] = useReducer(paymentReducer,{ 
    NameOfCard: '',
    expiration: '',
    cardNumber: '',
    cvvNum: '',
    postCode: '',
  })

  const setNameOfCardHandler = (param) => {
    dispatch({ type: `setName`, param });
  };

  const setExpirationHandler = (param) => {
    dispatch({ type: `setExpiration`, param });
  };

  const setCardNumHandler = (param) => {
    dispatch({ type: `setCardNum`, param });
  };

  const setCvvHandler = (param) => {
    dispatch({ type: `setCvvNum`, param });
  };

  const setPostCodeHandler = (param) => {
    dispatch({ type: `setPostCode`, param });
  };

  useEffect(()=>{
    const {NameOfCard, expiration, cardNumber,cvvNum,postCode} = detailState

    const validateDate = setTimeout(()=>{
      if(NameOfCard && expiration && cardNumber && cvvNum && postCode){
        props.onChange(detailState)
      }else{
        props.onChange(null)
      }
    },500)

    return ()=> clearTimeout(validateDate)
  },[detailState])

  const inputs = [
    {
      id: `name`,
      name: `name`,
      label: `Name of Card`,
      type: `text`,
      placeholder: "Please enter your name of card.",
      inputStyle: `nameInput`,
      onChange: setNameOfCardHandler,
      validation: paymentName,
      max: 50,
    },
    {
      id: `Expire`,
      name: `Expire`,
      label: `Expire`,
      type: `text`,
      placeholder: "MM/YYYY",
      inputStyle: `expireInput`,
      onChange: setExpirationHandler,
      validation: paymentExpiration,
    },
    {
      id: `cardNumber`,
      name: `Card number`,
      label: `Card number`,
      type: `text`,
      placeholder: "XXXX XXXX XXXX XXXX",
      inputStyle: `cardNumInput`,
      onChange: setCardNumHandler,
      validation: paymentCardNum,
      max: 19,
    },
    {
      id: `cvv`,
      name: `CVV`,
      label: `CVV`,
      type: `password`,
      placeholder: "123",
      inputStyle: `cardNumInput`,
      onChange: setCvvHandler,
      validation: paymentCvv,
      max: 3,
    },
    {
      id: `postCode`,
      name: `Postal Code`,
      label: `Postal Code`,
      type: `text`,
      placeholder: "N2N 2N2",
      inputStyle: `postCodeInput`,
      onChange: setPostCodeHandler,
      validation: paymentPostCode,
      max: 7,
    },
  ];
  // render Icons
  const iconsData = [
    {
      default: `icon/payIns/visa/visa.png`,      
      img2: `icon/payIns/visa/visa@2x.png`,
      img3: `icon/payIns/visa/visa@3x.png`,
      alt: `Visa`,
      style: `icon`,
    },
    {
      default: `icon/payIns/master/master.png`,      
      img2: `icon/payIns/master/master@2x.png`,
      img3: `icon/payIns/master/master@3x.png`,
      alt: `Master`,
      style: `icon`,
    },
        {
      default: `icon/payIns/apple/apple.png`,      
      img2: `icon/payIns/apple/apple@2x.png`,
      img3: `icon/payIns/apple/apple@3x.png`,
      alt: `Apple`,
      style: `icon`,
    },
  ]

  return (
    <div className='checkout-container-left-payment checkout-container-section'>
      <h1>Pay With</h1>

      {/* icons */}
      <div className='iconsWrap'>
        {iconsData.map((item,index)=>(
        <Image
          key={index}
          src={item.default}
          alt={item.alt}
          styles={item.style}
          img2={item.img2}
          img3={item.img3}
        />
        ))}
      </div>

      <div className='paymentForm'>
        {inputs.map((item,index)=>{

          if(item?.id == 'Expire'){
            return <ExpirationInput key={index} {...item} />
          }

          return <CustomInput key={index} {...item} />
        })}
        {/* <NameInput /> */}
      </div>

      {/* disclaimer */}
      <div className='disclaimerWrap'>
        <Image
          src={`icon/locker/locker.png`}
          alt={`Locker`}
          styles={`lockerBtn-img`}
          img2={`icon/locker/locker@2x.png`}
          img3={`icon/locker/locker@3x.png`}
        />
        <p className='disclaimerWrap-disclaimer'>We protect your payment information using encryption to provide bank-level security.</p>
      </div>
    </div>
  )
}

export default React.memo(PaymentMethods)

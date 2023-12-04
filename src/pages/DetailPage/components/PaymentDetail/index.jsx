import React, { useState, useEffect, useReducer } from "react";

// components
import Image from "@components/Images";

// validation
import { getMoneyFormat } from '$LIB/validation';
import {statusStyle} from '@Data/paymentStatus'

function PaymentDetail(props) {
  const { productDetailData, bookingData, paymentData } = props?.detail;
  const { taxAmount, totalAmount, grandTotal, workspace } = bookingData;


  const renderPaymentDetail = () => {
    if(!paymentData)return null
    const { billing_details, card_details} = props?.detail?.paymentData
    const {brand, card_number, type} = props?.detail?.paymentData?.card_details

    return (
      <div className="daysInfoWrap">
        <h2>Card details</h2>
        <p>Name: {billing_details?.billing_details?.name}</p>
        <p>{brand?.toUpperCase()} {type?.toUpperCase()}</p>
        <p>Card Number: {card_number}</p>
      </div>
    )
  }

  return (
    <div className="paymentDetail section">

      <div className="paymentDetail-Container">
        {/* avatar */}
        <Image
          src={
            workspace?.photos?.length ? workspace?.photos[0] : `home/solutions/Gallery_Workplace.jpg`
          }
          alt={`productImg`}
          styles={`imageWrap-img`}
          img2={
            workspace?.photos?.length ? workspace?.photos[0] : `home/solutions/Gallery_Workplace.jpg`
          }
          img3={
            workspace?.photos?.length ? workspace?.photos[0] : `home/solutions/Gallery_Workplace.jpg`
          }
        />

        {/* info */}
        <div className="product-info">
          <h1>{workspace?.name}</h1>
          <p className="address">{workspace?.workspaceAddress?.address}</p>
          <p className={`status ${statusStyle[bookingData.status]?.cssName}`}>{bookingData?.status}</p>
        </div>
      </div>

      {renderPaymentDetail()}

      {/* Payment */}
      <div className="priceWrap">
        <h2>Payment details</h2>

        <div className="rowWrap">
          <p>Charge</p>
          <p>CA$ {getMoneyFormat(totalAmount)}</p>
        </div>

        <div className="rowWrap">
          <p>Tax</p>
          <p>CA$ {getMoneyFormat(taxAmount)}</p>
        </div>

        <div className="rowWrap">
          <p>Total</p>
          <p className="totalChange">CA$ {getMoneyFormat(grandTotal)}</p>
        </div>
      </div>

    </div>
  );
}

export default React.memo(PaymentDetail);

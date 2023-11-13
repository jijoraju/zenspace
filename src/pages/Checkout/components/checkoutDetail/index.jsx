import React, { useState, useEffect, useReducer } from "react";

import moment from 'moment';

// components
import Image from "@components/Images";


// validation
import { getMoneyFormat } from '$LIB/validation';

function CheckoutDetail(props) {
  const { productDetailData, bookingDetail } = props?.checkoutState;

  const { dateSelected } = bookingDetail
  const { name, workspaceAddress, price_per_day, workspace_type, photos } = productDetailData;

  const [ gap, setGap] = useState(1);
  const [ total, setTotal] = useState(price_per_day||0);
  const [ Tax, setTax] = useState(price_per_day * 0.13||0);

  useEffect(()=>{
    const startDate = moment(dateSelected?.start)
    const endDate = moment(dateSelected?.end)

    // 計算兩個日期之間的時間間隔
    const duration = moment.duration(endDate.diff(startDate));

    // 取得間隔的天數
    const days = workspace_type == 'ONE_DAY' ? 0 : duration.asDays();
    const countTotal = price_per_day * days
    const countTax = countTotal * 0.13
    setGap(days+1)
    setTotal(countTotal)
    setTax(countTax)

  },[dateSelected])

  return (
    <div className="checkout-container-section checkout-container-right-Info">

      <div className="checkout-container-right-Info-Detail">
        {/* avatar */}
        <Image
          src={photos.length? photos[0]:`profile/avatar.png`}
          alt={`productImg`}
          styles={`imageWrap-img`}
          img2={photos.length? photos[0]:`profile/avatar.png`}
          img3={photos.length? photos[0]:`profile/avatar.png`}
        />

        {/* info */}
        <div className="product-info">
          <h1>{name}</h1>
          <p className="PrivatePass">Private Pass</p>
          <p className="address">{workspaceAddress?.address}</p>
        </div>
      </div>

      {/* Items */}
      <div className="daysInfoWrap">
        <h2>Items</h2>
        <p>Selected days * {gap}</p>
        <p>Person * {bookingDetail?.peopleCount}</p>
      </div>

      {/* Price */}
      <div className="priceWrap">
        <h2>Price details</h2>
        
        <div className="rowWrap">
          <p>Charge</p>
          <p>CA$ {getMoneyFormat(total)}</p>
        </div>

        <div className="rowWrap">
          <p>Tax</p>
          <p>CA$ {getMoneyFormat(Tax)}</p>
        </div>

        <div className="rowWrap">
          <p>Total</p>
          <p className="totalChange">CA$ {getMoneyFormat(total + Tax)}</p>
        </div>

        <p className="Disclaimer">*All prices exclude Tax/VAT</p>
      </div>

    </div>
  );
}

export default CheckoutDetail;

import React from 'react'

// MUI
import Rating from "@components/Rating";


// components
import Image from "@components/Images";
import CustomButton from "@components/Button";

// data
import { checkBoxDes, facilities} from '@Data/detail'


function MainContent({productDetailData}) {
  
  const {name, no_of_spaces, workspaceAddress, description,amenities,avgRating, price_per_day} = productDetailData?.data

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
          // onClick={setToggleDeskMenuHandler}
          // onClick={fetchLogout}
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

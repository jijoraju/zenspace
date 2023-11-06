import React, { useEffect } from 'react'
import { useNavigate, Link, useParams, useLocation, } from "react-router-dom";

// MUI
import Breadcrumbs from '@mui/material/Breadcrumbs';

// components
import MainContent from './components/mainContent'
import MapComponent from './components/map'
import Reviews from './components/reviews'

// custom hook
import useHttp from "@hook/use-http";

// reducer
import { fetchProductDetailHandler } from "@Reducer/workspace/wk-action";


function ProductDetail() {
  const location = useLocation();
  const navigate = useNavigate()

  const {pathname, state} = location
  const { detailData } = state


  // use http hook
  const {
    sendRequest: fetchDetailApi,
    status,
    data: productDetailData,
  } = useHttp(fetchProductDetailHandler);

  // fetch api
  useEffect(()=>{
    fetchDetailApi(detailData.workspace_id)
  },[])

  // get data
  useEffect(()=>{
    console.log('productDetailData',productDetailData)
  },[productDetailData])


  if(!productDetailData)return

  // get path from url and render bread crumbs
  const pathnames = pathname.split('/').filter((x) => x);
  const renderBreadCrumbs = pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          return last ? (
            <span key={to} className='detailContainer-crumbs-crumb'>
              {decodeURIComponent(value)}
            </span>
          ) : (
            <Link key={to} to={to} className='detailContainer-crumbs-crumb'>
              {decodeURIComponent(value.toUpperCase())}
            </Link>
          );
        })


  const { workspaceAddress, description, reviews } = productDetailData?.data
  return (
    <div className="detailContainer">
      {/* bread crumbs */}
      <Breadcrumbs aria-label="breadcrumb" className="detailContainer-crumbs">
        {renderBreadCrumbs}
      </Breadcrumbs>

      {/* banner */}
      <div></div>

      {/* detail */}
      <MainContent productDetailData={productDetailData} />

      {/* map */}
      <MapComponent mapData={workspaceAddress} description={description} />

      {/* reviews */}
      {reviews.length ? <Reviews reviewsData={reviews} /> : null}
    </div>
  );
}

export default ProductDetail

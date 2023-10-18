import React from 'react'
import { useNavigate, Link, useParams, useLocation, } from "react-router-dom";

// MUI
import Breadcrumbs from '@mui/material/Breadcrumbs';

function ProductDetail() {
  const location = useLocation();
  const navigate = useNavigate()

  const {pathname, state} = location
  const { detailData } = state

  // get path from url and render bread crumbs
  const pathnames = pathname.split('/').filter((x) => x);
  const renderBreadCrumbs = ()=>{
   return pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          return last ? (
            <Link key={to} to={to} className='detailContainer-crumbs-crumb'>
              {decodeURIComponent(value)}
            </Link>
          ) : (
            <Link key={to} to={to} className='detailContainer-crumbs-crumb'>
              {decodeURIComponent(value.toUpperCase())}
            </Link>
          );
        })
  }

  return (
    <div className='detailContainer'>
      {/* bread crumbs */}
      <Breadcrumbs aria-label="breadcrumb" className='detailContainer-crumbs'>
        {renderBreadCrumbs()}
      </Breadcrumbs>

      {/* banner */}
      <div>

      </div>

      {/* detail */}
      <div className='detailContainer-mainContent'>

      </div>

    </div>
    
  )
}

export default ProductDetail

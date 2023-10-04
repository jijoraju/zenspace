import React,{lazy, useEffect,useState} from 'react'
import { useLocation} from "react-router-dom";

import Image from "@components/Images";

const Login = lazy(() => import('./login'));
const Register = lazy(() => import('./register'));


function Sign() {
  const location = useLocation()
  const {pathname}  = location
  // const {imageName,setImageName} = useState(`signin`)

  const page = pathname == '/login'? <Login />:<Register />
  const imageName = pathname == '/login'? `signin`: `signup`

  // useEffect(()=>{
  //   function checkPath(){
  //     const imageName = pathname == '/login'? `signin`: `signup`
  //     setImageName(imageName)
  //   }
    
  // },[pathname])

  return (
    <div className='sign-container'>

      <div className={`sign-container-area`}>
        <Image
          src={`${imageName}/${imageName}.png`}
          alt={`${imageName}`}
          styles={`sign-container-area-image`}
          img2={`${imageName}/${imageName}@2x.png`}
          img3={`${imageName}/${imageName}@3x.png`}
        />
      </div>

      <div className={`sign-container-area`}>
        {page}
      </div>
    </div>
  )
}

export default Sign

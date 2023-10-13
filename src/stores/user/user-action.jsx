import {userActions} from './user-slice'

// request sign up
export async function postSignUpHandler(data) {
  const response = await fetchRequest(`/api/auth/register`,`POST`,data)
  return response;
}

// request login
export async function postSignInHandler(data) {
  const response = await fetchRequest(`/api/auth/login`,`POST`,data)
  return response;
}

// request logout
export async function getLogoutHandler(data) {
  const response = await fetchRequest(`/api/auth/logout`,`GET`)
  return response;
}

// get user info from localStorage
export const getUserInfo = ()=>{
  const token = sessionStorage.getItem('token');
  const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));

  if(!token && !userInfo) return null

  return {
    token,
    userInfo
  }
}

// store user info to localStorage and redux
export const LoginHandler = (res) =>{
  const requestData = res?.data 
  const userInfo = requestData || getUserInfo

  return async (dispatch)=>{
    if(!requestData) return  
    sessionStorage.setItem('token', requestData.token);
    sessionStorage.setItem('userInfo', JSON.stringify(userInfo));

    dispatch(userActions.userLogin({
      isLogin: true,
      token: requestData?.token,
      userInfo:requestData,
    }))
  }
}

// clear user info
export const logOutHandler = ()=> {
  return async (dispatch)=>{
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userInfo');

    getLogoutHandler()
    dispatch(userActions.userLogout({
      isLogin:false,
      token: null,
      userInfo:null,
    }))
  }
}
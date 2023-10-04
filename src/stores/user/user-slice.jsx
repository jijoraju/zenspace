import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: { isLogin: false, expiration: null,token:null,userInfo:null },
  reducers: {
    userLogin(state,action) {
      state.isLogin = action.payload?.isLogin;
      state.token = action.payload?.token;
      state.userInfo = action.payload?.userInfo;
    },
    userLogout(state,action){
      state.isLogin = action.payload?.isLogin;
      state.token = action.payload?.token;
      state.userInfo = action.payload?.userInfo;
    }
  },
});

export const userActions = userSlice.actions;

export default userSlice;

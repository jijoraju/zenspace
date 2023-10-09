import { configureStore } from '@reduxjs/toolkit';

import cartSlice from './cart-slice'
import userSlice from './user/user-slice'
import workSpaceSlice from './workspace/wk-slice'

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    workSpace: workSpaceSlice.reducer,
    cart: cartSlice.reducer,
  },
});

export default store;

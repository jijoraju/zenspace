import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './cart-slice'
import userSlice from './user/user-slice'

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    cart: cartSlice.reducer
  },
});

export default store;

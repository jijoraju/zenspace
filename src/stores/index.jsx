import { configureStore } from '@reduxjs/toolkit';

import userSlice from './user/user-slice'
import workSpaceSlice from './workspace/wk-slice'

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    workSpace: workSpaceSlice.reducer,
  },
});

export default store;

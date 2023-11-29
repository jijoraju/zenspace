import { createSlice } from "@reduxjs/toolkit";

const workSpaceSlice = createSlice({
  name: "workSpace",
  initialState: {
    location: [],
  },
  reducers: {
    addLocation(state, action) {
      state.location = action.payload?.location;
    },
  },
});

export const wksActions = workSpaceSlice.actions;

export default workSpaceSlice;

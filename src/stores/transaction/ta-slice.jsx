import { createSlice } from "@reduxjs/toolkit";

const transactionsSlice = createSlice({
  name: "workSpace",
  initialState: {
    transactions: [],
  },
  reducers: {
    addLocation(state, action) {
      state.transactions = action.payload;
    },
  },
});

export const taActions = transactionsSlice.actions;

export default transactionsSlice;

import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  counter: 1,
};

export const countSlice = createSlice({
  name: "Count",
  initialState,
  reducers: {
    Increment: (state, action) => {
      state.counter = action.payload + 1;
    },

    Decrement: (state, action) => {
      state.counter = action.payload - 1;
    },

    extraReducers: {
      [HYDRATE]: (state, action) => {
        return {
          ...state,
          ...action.payload.auth,
        };
      },
    },
  },
});

export const { Increment, Decrement } = countSlice.actions;
export const ReduxCounterState = (state) => state.Count.counter;
export default countSlice.reducer;

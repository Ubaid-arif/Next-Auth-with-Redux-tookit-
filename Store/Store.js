import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { countSlice } from "./CountSlice";
import {TodoSlice} from "./TodoSlice"
// import storage from "redux-persist/lib/storage";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import { getDefaultMiddleware } from "@reduxjs/toolkit";

const createNoopStorage = () => {
  return {
     getItem(_key) {
        return Promise.resolve(null);
     },
     setItem(_key, value) {
        return Promise.resolve(value);
     },
     removeItem(_key) {
        return Promise.resolve();
     },
  };
};



const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();


const persistConfig = {
  key: 'root',
  storage,
}

const reducer = combineReducers({
  [countSlice.name]: countSlice.reducer,
  [TodoSlice.name]: TodoSlice.reducer,
})

 const persistedReducer = persistReducer( persistConfig , reducer)


const makeStore = () =>
  configureStore({
    reducer: persistedReducer ,
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),

    devTools: true,
  });

export const wrapper = createWrapper(makeStore);
// <==========Step==========>
// import configureStore
// create a store function  ----> make object --> reducer
// import createWrapper
// and export wapper with store function

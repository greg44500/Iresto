import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { productApiSlice } from "./slices/productApiSlice"; // Importer le productApiSlice

import { apiSlice } from "./slices/apiSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;

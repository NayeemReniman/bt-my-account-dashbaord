import { configureStore } from "@reduxjs/toolkit";
import accessTokenSlice from "./accessTokenSlice";
import userDetailsSlice from "./userDetailsSlice";
import profileAndProductsSlice from "./profileAndProductsSlice";

export const store = configureStore({
  reducer: {
    accessToken: accessTokenSlice,
    userDetails: userDetailsSlice,
    profileAndProducts: profileAndProductsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from "@reduxjs/toolkit";
import accessTokenSlice from "./accessTokenSlice";
import userDetailsSlice from "./userDetailsSlice";

export const store = configureStore({
  reducer: {
    accessToken: accessTokenSlice,
    userDetails: userDetailsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

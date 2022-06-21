import { configureStore } from "@reduxjs/toolkit";
import accessTokenSlice from "./accessTokenSlice";
import userDetailsSlice from "./userDetailsSlice";
import profileAndProductsSlice from "./profileAndProductsSlice";
import billingAccountsSlice from "./billingAccountsSlice";
import billingSummarySlice from "./billingSummarySlice";
import faultsSlice from "./faultsSlice";
import ordersSlice from "./ordersSlice";
import notificationsSlice from "./notificationsSlice";
export const store = configureStore({
  reducer: {
    accessToken: accessTokenSlice,
    userDetails: userDetailsSlice,
    profileAndProducts: profileAndProductsSlice,
    billingAccounts: billingAccountsSlice,
    billingSummary: billingSummarySlice,
    faults: faultsSlice,
    orders: ordersSlice,
    notifications: notificationsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  BillingAccount,
  DATA_FETCH_STATUS,
  fetchBillingAccounts,
} from "../api";
import { AccessTokenState } from "./accessTokenSlice";

export interface BillingAccountsState {
  billingAccountsFetchStatus: DATA_FETCH_STATUS;
  activeBillingAccountSetStatus: DATA_FETCH_STATUS;
  activeBillingAccount: BillingAccount;
  billingAccounts: BillingAccount[];
}

const initialState: BillingAccountsState = {
  billingAccountsFetchStatus: "LOADING",
  activeBillingAccountSetStatus: "LOADING",
  activeBillingAccount: {
    AccountNumber: "",
    Name: "",
    Roles: "",
    RoleStatus: "",
    RoleToShow: "",
  },
  billingAccounts: [],
};

const slice = createSlice({
  name: "billing",
  initialState,
  reducers: {
    addBillingAccounts(state, { payload }: PayloadAction<BillingAccount[]>) {
      return {
        ...state,
        ...{ billingAccounts: payload },
        ...{ billingAccountsFetchStatus: "RESOLVED" },
      };
    },
    setActiveBillingAccount(state, { payload }: PayloadAction<BillingAccount>) {
      return {
        ...state,
        ...{ activeBillingAccount: payload },
        ...{ activeBillingAccountSetStatus: "RESOLVED" },
      };
    },
  },
});

export const { addBillingAccounts, setActiveBillingAccount } = slice.actions;

export const getBillingAccounts =
  (accessToken: AccessTokenState, groupKey: string) =>
  async (
    dispatch: (arg0: { payload: BillingAccount[]; type: string }) => void
  ) => {
    const response = await fetchBillingAccounts(accessToken, groupKey);
    dispatch(addBillingAccounts(response.result));
  };

export default slice.reducer;

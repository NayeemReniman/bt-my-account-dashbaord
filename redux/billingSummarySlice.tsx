import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  BillingSummary,
  DATA_FETCH_STATUS,
  fetchBillingAccountSummary,
} from "../api";
import { AccessTokenState } from "./accessTokenSlice";

export interface BillingSummaryState {
  billingSummaryFetchStatus: DATA_FETCH_STATUS;
  billingSummary: BillingSummary;
}

const initialState: BillingSummaryState = {
  billingSummaryFetchStatus: "LOADING",
  billingSummary: {
    BillSummary: {
      BillDate: "",
      PaymentDueDate: "",
      NextBillDate: "",
      Status: "",
      StatusDesc: "",
      IsPaid: true,
      BillRef: "",
      BillType: "",
      AccountName: "",
      BillingNameAndAddress: "",
      BillVersionNumber: 1,
      BillingAccountSystem: "",
      PaymentMethod: "",
    },
    BillCharges: {
      RegularCharges: 0.0,
      UsageCharges: 0.0,
      OneOffCharges: 0.0,
      DiscountCharges: 0.0,
      Adjustments: 0.0,
      TotalNotIncVat: 0.0,
      TotalVat: 0.0,
      TotalIncVat: 0.0,
    },
    Products: [],
  },
};

const slice = createSlice({
  name: "billing",
  initialState,
  reducers: {
    addBillingSummary(state, { payload }: PayloadAction<BillingSummary>) {
      return {
        ...state,
        ...{ billingSummary: payload },
        ...{ billingSummaryFetchStatus: "RESOLVED" },
      };
    },
  },
});

export const { addBillingSummary } = slice.actions;

export const getBillingSummary =
  (accessToken: AccessTokenState, accountNumber: string, groupKey: string) =>
  async (
    dispatch: (arg0: { payload: BillingSummary; type: string }) => void
  ) => {
    const response = await fetchBillingAccountSummary(
      accessToken,
      accountNumber,
      groupKey
    );
    dispatch(addBillingSummary(response.result));
  };

export default slice.reducer;

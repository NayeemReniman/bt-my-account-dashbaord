import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DATA_FETCH_STATUS, fetchOrders, Order, TabId } from "../api";

import { AccessTokenState } from "./accessTokenSlice";

export interface OrdersState {
  ordersFetchStatus: DATA_FETCH_STATUS;
  orders: Order[];
}
const initialState: OrdersState = {
  ordersFetchStatus: "LOADING",
  orders: [],
};

const slice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    addorders(state, { payload }: PayloadAction<Order[]>) {
      return {
        ...state,
        ...{ orders: [...state.orders, ...payload] },
        ...{ ordersFetchStatus: "RESOLVED" },
      };
    },
  },
});

export const { addorders } = slice.actions;

export const getOrders =
  (accessToken: AccessTokenState, groupKey: string, tabId: TabId) =>
  async (dispatch: (arg0: { payload: Order[]; type: string }) => void) => {
    const response = await fetchOrders(accessToken, groupKey, tabId);
    const { Orders } = response.result;
    if (Orders != undefined) dispatch(addorders(Orders));
  };

export default slice.reducer;

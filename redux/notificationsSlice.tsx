import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { DATA_FETCH_STATUS, fetchNotifications, Notification } from "../api";
import { AccessTokenState } from "./accessTokenSlice";

export interface NotificationsState {
  notificationsFetchStatus: DATA_FETCH_STATUS;
  notifications: Notification[];
}

const initialState: NotificationsState = {
  notifications: [],
  notificationsFetchStatus: "LOADING",
};

const slice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    addNotifications(state, { payload }: PayloadAction<Notification[]>) {
      return {
        ...state,
        ...{ notifications: payload },
        ...{ notificationsFetchStatus: "RESOLVED" },
      };
    },
  },
});

export const { addNotifications } = slice.actions;

export const getNotifications =
  (accessToken: AccessTokenState, groupKey: string) =>
  async (
    dispatch: (arg0: { payload: Notification[]; type: string }) => void
  ) => {
    const response = await fetchNotifications(accessToken, groupKey);
    dispatch(addNotifications(response.result));
  };

export default slice.reducer;

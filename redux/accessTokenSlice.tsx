import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useAppDispatch } from "../hooks";
import { AccessTokenState } from "../types/type.dashboard";

const initialState: AccessTokenState = {
  accessToken: "",
  deviceID: "",
  masterContactID: "820Z5V84MB",
  userID: "ryan.mosforth@btconnect.com",
  contactID: "null",
  isLoggedIn: false,
};

const slice = createSlice({
  name: "accessToken",
  initialState,
  reducers: {
    addAccessToken(state, { payload }: PayloadAction<AccessTokenState>) {
      return { ...state, ...payload };
    },
  },
});

export const { addAccessToken } = slice.actions;

export default slice.reducer;

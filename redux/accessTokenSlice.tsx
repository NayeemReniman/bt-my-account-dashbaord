import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AccessTokenState = {
  accessToken: string;
  deviceID: string;
  masterContactID: string;
  userID: string;
  contactID: string;
  isLoggedIn: boolean;
};

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

export const handleLogin =
  (accessToken: AccessTokenState) =>
  (dispatch: (arg0: { payload: AccessTokenState; type: string }) => void) => {
    dispatch(addAccessToken(accessToken));
    // localStorage.setItem(ACCESS_TOKEN, JSON.stringify(accessToken));
  };

export default slice.reducer;

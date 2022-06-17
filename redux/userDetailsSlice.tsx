import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  DATA_FETCH_STATUS,
  fetchUserDetails,
  UserDetails,
  UserGroup,
} from "../api";
import { AccessTokenState } from "./accessTokenSlice";

export interface UserDetailsState {
  userDetailsFetchStatus: DATA_FETCH_STATUS;
  activeUserGroupSetStatus: DATA_FETCH_STATUS;
  activeUserGroup: UserGroup;
  userDetails: UserDetails;
}
const initialState: UserDetailsState = {
  userDetailsFetchStatus: "LOADING",
  activeUserGroupSetStatus: "LOADING",
  activeUserGroup: {
    Name: "",
    RoleId: 1,
    Key: "",
    CugId: "",
    ContactId: "",
  },
  userDetails: {
    Title: "",
    FirstName: "",
    LastName: "",
    LastLoggedIn: "",
    Groups: [],
    Intercepts: [],
    MobileNumber: "",
    LandlineNumber: "",
    PrimaryEmailAddress: "",
    AlternativeEmailAddress: "",
    Order: "",
    Interfaces: "",
    ContactId: "",
    ConsentList: [],
  },
};

const slice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    addUserDetails(state, { payload }: PayloadAction<UserDetails>) {
      return {
        ...state,
        ...{ userDetails: payload },
        ...{ userDetailsFetchStatus: "RESOLVED" },
      };
    },
    setActiveUserGroup(state, { payload }: PayloadAction<UserGroup>) {
      console.log(payload);
      return {
        ...state,
        ...{ activeUserGroup: payload },
        ...{ activeUserGroupSetStatus: "RESOLVED" },
      };
    },
  },
});

export const { addUserDetails, setActiveUserGroup } = slice.actions;

export const getUserDetails =
  (accessToken: AccessTokenState) =>
  async (dispatch: (arg0: { payload: UserDetails; type: string }) => void) => {
    const response = await fetchUserDetails(accessToken);
    dispatch(addUserDetails(response.result));
  };

export default slice.reducer;

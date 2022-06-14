import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AccessTokenState, UserDetails } from "../types/type.dashboard";
import { fetchUserDetails } from "../api";
const initialState: UserDetails = {
  Title: "Mr",
  FirstName: "Jhon",
  LastName: "Doe",
  LastLoggedIn: "05/05/2022 13:13:24",
  Groups: [
    {
      Name: "Group 1",
      RoleId: 1,
      Key: "91a4bffe00b93b93",
      CugId: "CUG5080031486",
      ContactId: "820Z5V84MB",
    },
  ],
  Intercepts: [],
  MobileNumber: "07879119448",
  LandlineNumber: "0123456789",
  PrimaryEmailAddress: "ryan.mosforth@bt.com",
  AlternativeEmailAddress: "archana.dev@bt.com",
  Order: "",
  Interfaces: "",
  ContactId: "820Z5V84MB",
  ConsentList: ["EMAIL"],
};

const slice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    addUserDetails(state, { payload }: PayloadAction<UserDetails>) {
      return { ...state, ...payload };
    },
  },
});

export const { addUserDetails } = slice.actions;

export const getUserDetails =
  (accessToken: AccessTokenState) =>
  async (dispatch: (arg0: { payload: UserDetails; type: string }) => void) => {
    const response = await fetchUserDetails(accessToken);
    dispatch(addUserDetails(response.result));
  };

export default slice.reducer;

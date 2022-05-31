import { AppState, AuthorizationAction } from "../../types/type.auth";
import * as actionTypes from "../types";

const reducer = (
  state: AppState = {
    auth: {
      accessToken: "",
      deviceID: "",
      masterContactID: "820Z5V84MB",
      userID: "ryan.mosforth@btconnect.com",
      contactID: "",
      isLoggedIn: false,
    },
    userDetails: {
      Title: "string",
      FirstName: "string",
      LastName: "string",
      LastLoggedIn: "string",
      Groups: [],
      Intercepts: [],
      MobileNumber: "string",
      LandlineNumber: "string",
      PrimaryEmailAddress: "string",
      AlternativeEmailAddress: "string",
      Order: "string",
      Interfaces: "string",
      ContactId: "string",
      ConsentList: [],
    },
  },
  action: AuthorizationAction
): AppState => {
  switch (action.type) {
    case actionTypes.ADD_AUTHORIZATION:
      return {
        ...state,
        auth: action.payload,
      };
  }
  return state;
};

export default reducer;

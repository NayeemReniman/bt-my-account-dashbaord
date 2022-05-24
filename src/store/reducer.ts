import { AppState, AuthorizationAction } from "../types/type.auth";
import * as actionTypes from "./actionTypes";

const initialState: AppState = {
  auth: {
    accessToken: "",
    deviceID: "",
    masterContactID: "820Z5V84MB",
    userID: "ryan.mosforth@btconnect.com",
    contactID: "",
    isLoggedIn: false,
  },
  userDetails: { name: "" },
};

const reducer = (
  state: AppState = initialState,
  action: AuthorizationAction
): AppState => {
  switch (action.type) {
    case actionTypes.ADD_AUTHORIZATION:
      return {
        ...state,
        ...{ auth: action.payload },
      };
  }
  return state;
};

export default reducer;

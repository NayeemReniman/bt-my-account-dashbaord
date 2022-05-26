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
    userDetails: { name: "" },
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

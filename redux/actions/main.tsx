import {
  AccessToken,
  AuthorizationAction,
  DispatchType,
  UserDetailsResponse,
} from "../../types/type.dashboard";
import * as actionTypes from "../types";

export const addAcessToken = (accessToken: AccessToken) => {
  const action: AuthorizationAction = {
    type: actionTypes.ADD_AUTHORIZATION,
    payload: accessToken,
  };

  return simulateHttpRequest(action);
};

export const addUserDetails = (userDetails: UserDetailsResponse["result"]) => {
  return {
    type: actionTypes.ADD_USER_DETAILS,
    payload: userDetails,
  };
};

export function simulateHttpRequest(action: AuthorizationAction) {
  return (dispatch: DispatchType) => {
    dispatch(action);
  };
}

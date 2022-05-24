import {
  AccessToken,
  AuthorizationAction,
  DispatchType,
} from "../types/type.auth";
import * as actionTypes from "./actionTypes";

export function addAcessToken(accessToken: AccessToken) {
  const action: AuthorizationAction = {
    type: actionTypes.ADD_AUTHORIZATION,
    payload: accessToken,
  };

  return simulateHttpRequest(action);
}

export function simulateHttpRequest(action: AuthorizationAction) {
  return (dispatch: DispatchType) => {
    dispatch(action);
  };
}

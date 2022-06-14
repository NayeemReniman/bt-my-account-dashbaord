import { AccessTokenState, UserDetailsResponse } from "./types/type.dashboard";

const axios = require("axios").default;

export const fetchUserDetails = async (
  accessTokenState: AccessTokenState
): Promise<UserDetailsResponse> => {
  const headers = {
    "APIGW-Client-Id": "10cbbbb7-eb4d-42c8-a61d-b79e19ba3e07",
    "APIGW-Tracking-Header": "45e13a30-bec9-472d-b999-b23e45199bb4",
    Authorization: `Bearer ${accessTokenState.accessToken}`,
    "Content-Type": "application/json",
    UDID: `${accessTokenState.deviceID}`,
  };
  const response = await axios({
    method: "GET",
    url: "https://api.business.bt.com/bt-business/v1/myaccount/user-details",
    headers,
  });
  console.log(response);
  return response.data as UserDetailsResponse;
};

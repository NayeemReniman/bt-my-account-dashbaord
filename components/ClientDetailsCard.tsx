import { FunctionComponent, useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { AccessToken, AppState, userDetails } from "../types/type.auth";

interface ClientDetailsCardProps {}

const axios = require("axios").default;

const ClientDetailsCard: FunctionComponent<ClientDetailsCardProps> = () => {
  const accessTokenState: AccessToken = useSelector(
    (state: AppState) => state.auth,
    shallowEqual
  );

  const [userDetails, setuserDetails] = useState<userDetails>();

  useEffect(() => {
    const headers = {
      "APIGW-Client-Id": "10cbbbb7-eb4d-42c8-a61d-b79e19ba3e07",
      "APIGW-Tracking-Header": "45e13a30-bec9-472d-b999-b23e45199bb4",
      Authorization: `Bearer ${accessTokenState.accessToken}`,
      "Content-Type": "application/json",
      UDID: `${accessTokenState.deviceID}`,
    };
    axios({
      method: "GET",
      url: "https://api.business.bt.com/bt-business/v1/myaccount/user-details",
      headers,
    })
      .then(function (response: { data: userDetails }) {
        // handle success
        console.log(response);
        setuserDetails(response.data);
      })
      .catch(function (error: string) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, [accessTokenState]);

  return (
    <div>
       <p className="name__heading">Welcome {userDetails?.result.FirstName} - {userDetails?.result.LastName}</p>
    </div>
  );
};

export default ClientDetailsCard;

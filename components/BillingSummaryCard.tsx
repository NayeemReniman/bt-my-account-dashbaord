import { FunctionComponent, useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import {
  AccessToken,
  AppState,
  BillingAccounts,
  UserDetails,
} from "../types/type.auth";

const axios = require("axios").default;

interface BillingSummaryCardProps {
  userDetails: UserDetails["result"];
}

const BillingSummaryCard: FunctionComponent<BillingSummaryCardProps> = ({
  userDetails,
}) => {
  const accessTokenState: AccessToken = useSelector(
    (state: AppState) => state.auth,
    shallowEqual
  );

  const [billingAccounts, setbillingAccounts] = useState<BillingAccounts>();

  useEffect(() => {
    if (userDetails == undefined) return;
    const headers = {
      "APIGW-Client-Id": "10cbbbb7-eb4d-42c8-a61d-b79e19ba3e07",
      "APIGW-Tracking-Header": "45e13a30-bec9-472d-b999-b23e45199bb4",
      Authorization: `Bearer ${accessTokenState.accessToken}`,
      "Content-Type": "application/json",
      UDID: `${accessTokenState.deviceID}`,
    };
    axios({
      method: "GET",
      url: `https://api.ee.co.uk/bt-business-auth/v1/users/${userDetails.Groups[0].Key}/billing-accounts`,
      headers,
    })
      .then(function (response: { data: BillingAccounts }) {
        // handle success
        console.log(response);
        setbillingAccounts(response.data);
      })
      .catch(function (error: string) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, [userDetails, accessTokenState]);

  useEffect(() => {
    if (billingAccounts == undefined) return;
    const headers = {
      "APIGW-Client-Id": "10cbbbb7-eb4d-42c8-a61d-b79e19ba3e07",
      "APIGW-Tracking-Header": "45e13a30-bec9-472d-b999-b23e45199bb4",
      Authorization: `Bearer ${accessTokenState.accessToken}`,
      "Content-Type": "application/json",
      UDID: `${accessTokenState.deviceID}`,
    };
    axios({
      method: "GET",
      url: `https://api.ee.co.uk/bt-business-auth/v1/bills/${billingAccounts.result[0].AccountNumber}/summary`,
      headers,
    })
      .then(function (response: { data: any }) {
        // handle success
        console.log(response);
      })
      .catch(function (error: string) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, [billingAccounts, accessTokenState]);

  return (
    <div>
      {billingAccounts?.result.map((billingAccount) => (
        <>
          <p>Billing Account: {billingAccount.AccountNumber}</p>
          <p>Account name: {billingAccount.Name}</p>
        </>
      ))}
    </div>
  );
};

export default BillingSummaryCard;

import { Heading, VerticalSpace, Text, Columns } from "@arc-ui/components";
import { FunctionComponent, useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { AccessToken, AppState, UserDetails } from "../types/type.auth";
import "../styles/sidenavbar.module.css";
import BillingSummaryCard from "./BillingSummaryCard";
import FaultsCard from "./FaultsCard";
import OrdersCard from "./OrdersCard";
import Recemendations from "./Recemendations";

interface ClientDetailsCardProps {}

const axios = require("axios").default;

const ClientDetailsCard: FunctionComponent<ClientDetailsCardProps> = () => {
  const accessTokenState: AccessToken = useSelector(
    (state: AppState) => state.auth,
    shallowEqual
  );

  const [userDetails, setuserDetails] = useState<UserDetails["result"]>();

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
      .then(function (response: { data: UserDetails }) {
        // handle success
        console.log(response);
        setuserDetails(response.data.result);
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
    <>
      <section>
        <Heading size="m">
          Hi {userDetails?.FirstName}, welcome back to BT Business
        </Heading>
        <VerticalSpace size="12" />
        <Text size="m">Thursday 05 May</Text>
        <VerticalSpace size="12" />
        <Text size="m">
          Your latest bill for Home food cafe is now available.
        </Text>
      </section>
      <VerticalSpace size="64" />
      <section>
        <BillingSummaryCard userDetails={userDetails} />
      </section>
      <VerticalSpace size="64" />
      <section>
        <Columns>
          <Columns.Col span={6}>
            <FaultsCard userDetails={userDetails} />
          </Columns.Col>
          <Columns.Col span={6}>
            {" "}
            <OrdersCard userDetails={userDetails} />
          </Columns.Col>
        </Columns>
      </section>
      <VerticalSpace size="64" />
      <section>
        <Recemendations userDetails={userDetails} />
      </section>
    </>
  );
};

export default ClientDetailsCard;

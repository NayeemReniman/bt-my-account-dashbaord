import { Button, Columns, Heading, Text } from "@arc-ui/components";
import { FunctionComponent, useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import {
  AccessToken,
  AppState,
  OrdersDetails,
  UserDetails,
} from "../types/type.auth";
import DashbaordCard from "./common/DashboardCard";
import DashboardCardRow from "./common/DashboardCardRow";

interface OrdersCardProps {
  userDetails: UserDetails["result"];
}
const axios = require("axios").default;
const OrdersCard: FunctionComponent<OrdersCardProps> = ({ userDetails }) => {
  const accessTokenState: AccessToken = useSelector(
    (state: AppState) => state.auth,
    shallowEqual
  );

  const [orderDetails, setorderDetails] = useState<OrdersDetails["result"]>({
    PageIndex: 0,
    TotalSize: 1,
    PageSize: 1,
    Orders: [
      {
        "<OrderDate>k__BackingField": "2018-12-19T15:55:17Z",
        "<OrderIdentifier>k__BackingField": "BT5V952Q",
        "<Description>k__BackingField": "",
        "<OrderStatus>k__BackingField": false,
        "<LongDescription>k__BackingField":
          "Order for multiple BT Business products",
        "<PlacedOnDate>k__BackingField": "2018-12-19T15:55:17Z",
        "<CompletionDate>k__BackingField": "2019-01-15T23:59:59Z",
        "<CompleteOrderStatus>k__BackingField": "Completed",
        "<Type>k__BackingField": 0,
        "<Postcode>k__BackingField": "S1 3PL",
        "<ProductOrderItems>k__BackingField": [
          "Business BroadBand Access",
          "BT Business Apps",
          "Business PSTN Service Value",
        ],
      },
    ],
  });

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
      url: `https://api.ee.co.uk/bt-business-auth/v1/group-orders/${userDetails.Groups[0].Key}?pageSize=5&index=1&tabId=2`,
      headers,
    })
      .then(function (response: { data: OrdersDetails }) {
        // handle success
        console.log(response);
        setorderDetails(response.data.result);
      })
      .catch(function (error: string) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, [userDetails, accessTokenState]);
  return (
    <>
      <DashbaordCard
        header={
          <>
            <Heading size="m">
              {orderDetails.Orders.length} order
              {orderDetails.Orders.length > 1 ? "s" : ""}
            </Heading>
          </>
        }
      >
        {orderDetails.Orders.map((order) => (
          <DashboardCardRow
            key={order["<OrderIdentifier>k__BackingField"]}
            label={order["<CompleteOrderStatus>k__BackingField"]}
            title={`${order["<OrderIdentifier>k__BackingField"]} ${order["<Description>k__BackingField"]}`}
          >
            <Columns>
              <Columns.Col span={6}>
                <Text size="m">
                  Orderd on {order["<PlacedOnDate>k__BackingField"]}
                </Text>
              </Columns.Col>
              <Columns.Col span={6}>
                <Text size="m">
                  Expected delivery on{" "}
                  {order["<CompletionDate>k__BackingField"]}
                </Text>
              </Columns.Col>
              <Columns.Col span={6}>
                <Text size="m">
                  Delivery location {order["<Postcode>k__BackingField"]}
                </Text>
              </Columns.Col>
              <Columns.Col span={6}>
                <Text size="m">Cost £{order["<Type>k__BackingField"]}</Text>
              </Columns.Col>
            </Columns>
          </DashboardCardRow>
        ))}
        <Button label="Manage orders" isFullWidth></Button>
      </DashbaordCard>
    </>
  );
};

export default OrdersCard;

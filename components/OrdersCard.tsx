import {
  Align,
  Button,
  Columns,
  Heading,
  Icon,
  Text,
  VerticalSpace,
} from "@arc-ui/components";
import { FunctionComponent, useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import {
  AccessToken,
  AppState,
  OrdersDetails,
  OrdersResponse,
  UserDetails,
} from "../types/type.dashboard";
import DashbaordCard from "./common/DashboardCard";
import DashbaordCardCompactRow from "./common/DashboardCardCompactRow";
import DashboardCardDetailedRow from "./common/DashboardCardDetailedRow";

interface OrdersCardProps {
  userDetails: UserDetails;
}

const axios = require("axios").default;
const orderLabels = [
  {
    title: "Inprogress",
    color: "info",
    helperText: "Order being processed",
  },
  {
    title: "Delivery partially complete",
    color: "info",
    helperText: "Action required",
  },
  {
    title: "Completed",
    color: "info",
    helperText: "Product setup required",
  },
];
const OrdersCard: FunctionComponent<OrdersCardProps> = ({ userDetails }) => {
  const accessTokenState: AccessToken = useSelector(
    (state: AppState) => state.auth,
    shallowEqual
  );

  const [orderDetails, setorderDetails] = useState<OrdersDetails>({
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
      .then(function (response: { data: OrdersResponse }) {
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
            <div style={{ flexGrow: 2 }}>
              <Heading size="m">
                {orderDetails.Orders.length} order
                {orderDetails.Orders.length > 1 ? "s" : ""}
              </Heading>
            </div>
            <div>
              <Align horizontal="right">
                <Icon icon="btVan" size={32}></Icon>
              </Align>
            </div>
          </>
        }
      >
        {orderDetails.Orders.length < 6 ? (
          orderDetails.Orders.map((order) => (
            <DashboardCardDetailedRow
              key={order["<OrderIdentifier>k__BackingField"]}
              label={order["<CompleteOrderStatus>k__BackingField"]}
              title={`${order["<OrderIdentifier>k__BackingField"]} ${order["<Description>k__BackingField"]}`}
            >
              <Columns>
                <Columns.Col span={6}>
                  <Text size="s">
                    Orderd on{" "}
                    {new Date(
                      order["<PlacedOnDate>k__BackingField"]
                    ).toLocaleDateString("en-GB")}
                  </Text>
                </Columns.Col>
                <Columns.Col span={6}>
                  <Text size="s">
                    Expected delivery on{" "}
                    {new Date(
                      order["<CompletionDate>k__BackingField"]
                    ).toLocaleDateString("en-GB")}
                  </Text>
                </Columns.Col>
                <Columns.Col span={6}>
                  <Text size="s">
                    Delivery location {order["<Postcode>k__BackingField"]}
                  </Text>
                </Columns.Col>
                <Columns.Col span={6}>
                  <Text size="s">Cost £{order["<Type>k__BackingField"]}</Text>
                </Columns.Col>
              </Columns>
            </DashboardCardDetailedRow>
          ))
        ) : (
          <DashbaordCardCompactRow
            data={orderDetails.Orders}
            labelKey="<CompleteOrderStatus>k__BackingField"
            labels={orderLabels}
          />
        )}
        <Button label="Manage orders" isFullWidth></Button>
      </DashbaordCard>
    </>
  );
};

export default OrdersCard;

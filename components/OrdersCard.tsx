import {
  DashboardCard,
  DashboardCardRow,
  DashboardCardSummary,
  DataLabels,
  SummaryLabels,
} from "@nayeemreniman/bt-my-account-react-components";
import { FunctionComponent, useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import {
  AccessToken,
  AppState,
  OrdersDetails,
  OrdersResponse,
  UserDetails,
} from "../types/type.dashboard";

interface OrdersCardProps {
  userDetails: UserDetails;
}

const axios = require("axios").default;

const orderDataLabels: DataLabels[] = [
  {
    key: "<PlacedOnDate>k__BackingField",
    label: "Orderd on",
    formatter: (value: string) => new Date(value).toLocaleDateString("en-GB"),
  },
  {
    key: "<CompletionDate>k__BackingField",
    label: "Expected delivery on",
    formatter: (value: string) => new Date(value).toLocaleDateString("en-GB"),
  },
  {
    key: "<Postcode>k__BackingField",
    label: "Delivery location",
    formatter: (value: string) => value,
  },
  {
    key: "<Type>k__BackingField",
    label: "Cost £",
    formatter: (value: string) => value,
  },
];

const orderSummaries: SummaryLabels[] = [
  {
    mainText: "Inprogress",
    textColor: "warn",
    helperText: "Order being processed",
  },
  {
    mainText: "Delivery partially complete",
    textColor: "info",
    helperText: "Action required",
  },
  {
    mainText: "Completed",
    textColor: "success",
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
    <DashboardCard
      buttonAction={() => console.log("Iam clicked from manage Orders")}
      buttonText="Manage orders"
      headerText={`${orderDetails.Orders.length} order ${
        orderDetails.Orders.length > 1 ? "s" : ""
      }`}
      icon="btVan"
    >
      {orderDetails.Orders.length < 4 ? (
        orderDetails.Orders.map((order) => (
          <DashboardCardRow
            data={order}
            status={order["<CompleteOrderStatus>k__BackingField"]}
            dataLabels={orderDataLabels}
            statusColor="info"
            title={`${order["<OrderIdentifier>k__BackingField"]} ${order["<Description>k__BackingField"]}`}
            key={order["<OrderIdentifier>k__BackingField"]}
          />
        ))
      ) : (
        <DashboardCardSummary
          data={orderDetails.Orders}
          labelKey="<CompleteOrderStatus>k__BackingField"
          summaries={orderSummaries}
        />
      )}
    </DashboardCard>
  );
};

export default OrdersCard;

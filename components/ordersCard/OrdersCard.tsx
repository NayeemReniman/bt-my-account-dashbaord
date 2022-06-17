import {
  DashboardCard,
  DashboardCardRow,
  DashboardCardSummary,
  DataLabels,
  SummaryLabels,
} from "@nayeemreniman/bt-my-account-react-components";
import { FunctionComponent, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { AccessTokenState } from "../../redux/accessTokenSlice";
import { getOrders, OrdersState } from "../../redux/ordersSlice";
import { UserDetailsState } from "../../redux/userDetailsSlice";
import LoadingWrapper from "../common/loadingWrapper/LoadingWrapper";

interface OrdersCardProps {}

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
const OrdersCard: FunctionComponent<OrdersCardProps> = () => {
  const dispatch = useAppDispatch();
  const accessTokenState: AccessTokenState = useAppSelector(
    (state) => state.accessToken
  );
  const { activeUserGroup, activeUserGroupSetStatus }: UserDetailsState =
    useAppSelector((state) => state.userDetails);

  const { orders, ordersFetchStatus }: OrdersState = useAppSelector(
    (state) => state.orders
  );

  useEffect(() => {
    if (activeUserGroupSetStatus == "RESOLVED") {
      dispatch(getOrders(accessTokenState, activeUserGroup.Key, "1"));
      dispatch(getOrders(accessTokenState, activeUserGroup.Key, "2"));
    }
  }, [activeUserGroup]);

  return (
    <DashboardCard
      buttonAction={() => console.log("Iam clicked from manage Orders")}
      buttonText="Manage orders"
      headerText={`${orders.length} order${orders.length > 1 ? "s" : ""}`}
      icon="btVan"
    >
      <LoadingWrapper dataFetchStatus={ordersFetchStatus}>
        {orders.length < 4 ? (
          orders.map((order) => (
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
            data={orders}
            labelKey="<CompleteOrderStatus>k__BackingField"
            summaries={orderSummaries}
          />
        )}
      </LoadingWrapper>
    </DashboardCard>
  );
};

export default OrdersCard;

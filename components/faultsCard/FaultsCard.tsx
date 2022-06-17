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
import { FaultsState, getFaults } from "../../redux/faultsSlice";
import { UserDetailsState } from "../../redux/userDetailsSlice";
import LoadingWrapper from "../common/loadingWrapper/LoadingWrapper";

interface FaultsCardProps {}
const axios = require("axios").default;

const faultSummaries: SummaryLabels[] = [
  {
    mainText: "Repair reported",
    textColor: "warn",
    helperText: "We are assessing the repair required",
  },
  {
    mainText: "Repair in progress",
    textColor: "info",
    helperText: "We are working on these now!",
  },
  {
    mainText: "Fault resolved",
    textColor: "success",
    helperText: "In the last 24 hours",
  },
];

const faultLabels: DataLabels[] = [
  {
    key: "ReportedOn",
    label: "Reported on",
    formatter: (value) => new Date(value).toLocaleDateString("en-GB"),
  },
  {
    key: "ServiceId",
    label: "Location",
    formatter: (value) => value,
  },
];

const FaultsCard: FunctionComponent<FaultsCardProps> = () => {
  const dispatch = useAppDispatch();
  const accessTokenState: AccessTokenState = useAppSelector(
    (state) => state.accessToken
  );

  const { activeUserGroup, activeUserGroupSetStatus }: UserDetailsState =
    useAppSelector((state) => state.userDetails);

  const { faults, faultsFetchStatus }: FaultsState = useAppSelector(
    (state) => state.faults
  );

  useEffect(() => {
    if (activeUserGroupSetStatus == "RESOLVED") {
      dispatch(getFaults(accessTokenState, activeUserGroup.Key, "1"));
      dispatch(getFaults(accessTokenState, activeUserGroup.Key, "2"));
    }
  }, [activeUserGroup, activeUserGroupSetStatus]);

  return (
    <DashboardCard
      buttonAction={() => console.log("Iam clicked from manage Faults")}
      buttonText="Manage faults"
      headerText={`${faults.length} fault${faults.length > 1 ? "s" : ""}`}
      icon="btSpanner"
    >
      <LoadingWrapper dataFetchStatus={faultsFetchStatus}>
        {faults.length < 4 ? (
          faults.map((fault) => (
            <DashboardCardRow
              data={fault}
              status={fault.Status}
              dataLabels={faultLabels}
              statusColor="info"
              title={`${fault.FaultReference} ${fault.ProductName}`}
              key={fault.FaultReference}
            />
          ))
        ) : (
          <DashboardCardSummary
            data={faults}
            labelKey="Status"
            summaries={faultSummaries}
          />
        )}
      </LoadingWrapper>
    </DashboardCard>
  );
};

export default FaultsCard;

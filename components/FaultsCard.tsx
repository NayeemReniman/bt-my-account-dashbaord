import {
  DashboardCard,
  DashboardCardRow,
  DashboardCardSummary,
  DataLabels,
  SummaryLabels,
} from "@nayeemreniman/bt-my-account-react-components";
import { FunctionComponent, useEffect, useState } from "react";
import { useSelector, shallowEqual } from "react-redux";
import {
  AccessToken,
  AppState,
  FaultsDetails,
  FaultsResponse,
  UserDetails,
} from "../types/type.dashboard";

interface FaultsCardProps {
  userDetails: UserDetails;
}
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
const FaultsCard: FunctionComponent<FaultsCardProps> = ({ userDetails }) => {
  const accessTokenState: AccessToken = useSelector(
    (state: AppState) => state.auth,
    shallowEqual
  );

  const [faultsDetails, setfaultsDetails] = useState<FaultsDetails>({
    Faults: [
      {
        ProductName: "Broadband Fault",
        ServiceId: "01142729077",
        ReportedOn: "2022-02-14T15:31:43Z",
        FaultReference: "1-109134149",
        Status: "Fault resolved",
        isOpen: false,
      },
    ],
    PageIndex: 0,
    PageSize: 1,
    TotalSize: 1,
  });

  const getFaults = (ud: UserDetails, at: AccessToken, tabId: number) => {
    const headers = {
      "APIGW-Client-Id": "10cbbbb7-eb4d-42c8-a61d-b79e19ba3e07",
      "APIGW-Tracking-Header": "45e13a30-bec9-472d-b999-b23e45199bb4",
      Authorization: `Bearer ${at.accessToken}`,
      "Content-Type": "application/json",
      UDID: `${at.deviceID}`,
    };
    axios({
      method: "GET",
      url: `https://api.ee.co.uk/bt-business-auth/v1/faults/${ud.Groups[0].Key}?pageSize=5&index=1&tabId=${tabId}`,
      headers,
    })
      .then(function (response: { data: FaultsResponse }) {
        // handle success
        console.log(response);
        setfaultsDetails({ ...faultsDetails, ...response.data.result });
      })
      .catch(function (error: string) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };
  useEffect(() => {
    if (userDetails == undefined) return;
    // getFaults(userDetails, accessTokenState, 1);
    getFaults(userDetails, accessTokenState, 2);
  }, [userDetails, accessTokenState]);

  return (
    <DashboardCard
      buttonAction={() => console.log("Iam clicked from manage Faults")}
      buttonText="Manage faults"
      headerText={`${faultsDetails.Faults.length} fault ${
        faultsDetails.Faults.length > 1 ? "s" : ""
      }`}
      icon="btSpanner"
    >
      {faultsDetails.Faults.length < 4 ? (
        faultsDetails.Faults.map((fault) => (
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
          data={faultsDetails.Faults}
          labelKey="Status"
          summaries={faultSummaries}
        />
      )}
    </DashboardCard>
  );
};

export default FaultsCard;

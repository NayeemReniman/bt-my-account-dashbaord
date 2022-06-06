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
import { useSelector, shallowEqual } from "react-redux";
import {
  AccessToken,
  AppState,
  FaultsDetails,
  FaultsResponse,
  UserDetails,
} from "../types/type.dashboard";
import DashbaordCard from "./common/DashboardCard";
import DashbaordCardCompactRow from "./common/DashboardCardCompactRow";
import DashboardCardDetailedRow from "./common/DashboardCardDetailedRow";

interface FaultsCardProps {
  userDetails: UserDetails;
}
const axios = require("axios").default;

const faultLabels = [
  {
    title: "Repair reported",
    color: "info",
    helperText: "We are assessing the repair required",
  },
  {
    title: "Repair in progress",
    color: "info",
    helperText: "We are working on these now!",
  },
  {
    title: "Fault resolved",
    color: "info",
    helperText: "In the last 24 hours",
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

  // const handleFaults = (data: FaultsDetails, tabId: number) => {
  //   setfaultsDetails({
  //     ...faultsDetails,
  //     ...{
  //       ...data,
  //       ...{
  //         Faults: data.Faults.filter((fault) => tabId === 2 && fault.isOpen),
  //       },
  //     },
  //   });
  // };

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
    <>
      <DashbaordCard
        header={
          <>
            <div style={{ flexGrow: 2 }}>
              <Heading size="m">
                {faultsDetails.Faults.length} fault
                {faultsDetails.Faults.length > 1 ? "s" : ""}
              </Heading>
            </div>
            <div>
              <Align horizontal="right">
                <Icon icon="btSpanner" size={32}></Icon>
              </Align>
            </div>
          </>
        }
      >
        {faultsDetails.Faults.length < 4 ? (
          faultsDetails.Faults.map((fault) => (
            <DashboardCardDetailedRow
              key={fault.ServiceId}
              label={fault.Status}
              title={`${fault.FaultReference} ${fault.ProductName}`}
            >
              <Columns>
                <Columns.Col span={6}>
                  <Text size="s">
                    Reported on{" "}
                    {new Date(fault.ReportedOn).toLocaleDateString("en-GB")}
                  </Text>
                </Columns.Col>
                <Columns.Col span={6}>
                  <Text size="s">Location {fault.ServiceId}</Text>
                </Columns.Col>
              </Columns>
            </DashboardCardDetailedRow>
          ))
        ) : (
          <DashbaordCardCompactRow
            data={faultsDetails.Faults}
            labelKey="Status"
            labels={faultLabels}
          />
        )}
        <Button label="Manage faults" isFullWidth></Button>
      </DashbaordCard>
    </>
  );
};

export default FaultsCard;

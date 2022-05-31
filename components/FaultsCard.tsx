import { Button, Columns, Heading, Text } from "@arc-ui/components";
import { FunctionComponent, useEffect, useState } from "react";
import { useSelector, shallowEqual } from "react-redux";
import {
  AccessToken,
  AppState,
  FaultsDetails,
  UserDetails,
} from "../types/type.auth";
import DashbaordCard from "./common/DashboardCard";
import DashboardCardRow from "./common/DashboardCardRow";

interface FaultsCardProps {
  userDetails: UserDetails["result"];
}
const axios = require("axios").default;
const FaultsCard: FunctionComponent<FaultsCardProps> = ({ userDetails }) => {
  const accessTokenState: AccessToken = useSelector(
    (state: AppState) => state.auth,
    shallowEqual
  );

  const [faultsDetails, setfaultsDetails] = useState<FaultsDetails["result"]>({
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
      url: `https://api.ee.co.uk/bt-business-auth/v1/faults/${userDetails.Groups[0].Key}?pageSize=5&index=1&tabId=2`,
      headers,
    })
      .then(function (response: { data: FaultsDetails }) {
        // handle success
        console.log(response);
        setfaultsDetails(response.data.result);
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
              {faultsDetails.Faults.length} fault
              {faultsDetails.Faults.length > 1 ? "s" : ""}
            </Heading>
          </>
        }
      >
        {faultsDetails.Faults.map((fault) => (
          <DashboardCardRow
            key={fault.ServiceId}
            label={fault.Status}
            title={`${fault.FaultReference} ${fault.ProductName}`}
          >
            <Columns>
              <Columns.Col span={6}>
                <Text size="m">Reported on {fault.ReportedOn}</Text>
              </Columns.Col>
              <Columns.Col span={6}>
                <Text size="m">Location {fault.ServiceId}</Text>
              </Columns.Col>
            </Columns>
          </DashboardCardRow>
        ))}
        <Button label="Manage faults" isFullWidth></Button>
      </DashbaordCard>
    </>
  );
};

export default FaultsCard;

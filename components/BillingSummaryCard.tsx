import {
  Align,
  Align as div,
  Button,
  Columns,
  Heading,
  Icon,
  Image,
  Text,
  VerticalSpace,
} from "@arc-ui/components";
import { FunctionComponent, useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import {
  AccessToken,
  AppState,
  BillingAccounts,
  BillingSummary,
  UserDetails,
} from "../types/type.auth";
import DashbaordLabel from "./common/DashbaordLabel";
import DashboardBanners from "./common/DashboardBanners";
import DashbaordCard from "./common/DashboardCard";

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

  const [billingSummary, setbillingSummary] = useState<BillingSummary>();

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
      _authKey: userDetails.Groups[0].Key,
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
      .then(function (response: { data: BillingSummary }) {
        // handle success
        console.log(response);
        setbillingSummary(response.data);
      })
      .catch(function (error: string) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, [billingAccounts, accessTokenState, userDetails]);

  return (
    <div className="billing__summary__main__container">
      <DashbaordCard
        header={
          <>
            <div>
              <Heading size="m">May total</Heading>
            </div>
            <div>
              <Heading size="m">
                £
                {billingSummary
                  ? billingSummary.result.BillCharges.TotalNotIncVat
                  : "-"}{" "}
              </Heading>
            </div>
            <div>
              <Text size="s">Inc VAT </Text>
            </div>
            <div>
              <Text size="s">
                Account{" "}
                {billingAccounts
                  ? billingAccounts?.result[0].AccountNumber
                  : "-"}
              </Text>
            </div>
            <div>
              <Columns>
                <Columns.Col span={2}>
                  {" "}
                  <Icon icon="btDocumentPdf" color="brand" size={32} />
                </Columns.Col>
                <Columns.Col span={2}>
                  {" "}
                  <Icon icon="btDocumentPdf" color="brand" size={32} />
                </Columns.Col>
              </Columns>
            </div>
            <div style={{ flexGrow: 2 }}>
              <Align horizontal="right">
                <DashbaordLabel text="overdue: 1/05/2022" color="#DA020F" />
              </Align>
            </div>
          </>
        }
      >
        <div>
          <Columns>
            <Columns.Col span={5}>
              <div>
                <Heading size="s">Cost breakdown</Heading>
                <Image src="/cost-breakdown.png" alt="dummay cost breakdown" />
                <Columns>
                  <Columns.Col span={6}>
                    <Button label="Pay bill" isFullWidth></Button>
                  </Columns.Col>
                  <Columns.Col span={6}>
                    <Button
                      label="View bill"
                      isFullWidth
                      fill="outlined"
                    ></Button>
                  </Columns.Col>
                </Columns>
              </div>
            </Columns.Col>
            <Columns.Col span={2}>
              <Text size="m">
                1 <a href="">Overdue</a>
              </Text>
            </Columns.Col>
            <Columns.Col span={5}>
              <DashboardBanners
                body="For piece of mind  don’t be overdue again."
                href="#"
                title="Switch to payments by Direct Debit for all your biling accounts."
                linktext="Set up Direct Debit >"
              />
            </Columns.Col>
          </Columns>
        </div>
        <VerticalSpace size="8" />
      </DashbaordCard>
    </div>
  );
};

export default BillingSummaryCard;

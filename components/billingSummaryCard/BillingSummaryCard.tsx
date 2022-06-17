import {
  Align,
  Button,
  Columns,
  Heading,
  Icon,
  Image,
  Text,
  VerticalSpace,
} from "@arc-ui/components";
import {
  DashboardBanner,
  DashboardPanel,
  StatusLabel,
} from "@nayeemreniman/bt-my-account-react-components";
import { FunctionComponent, useEffect } from "react";
import { shallowEqual } from "react-redux";
import {
  BillingAccount,
  DATA_FETCH_STATUS,
  fetchBillingAccountSummary,
  UserGroup,
} from "../../api";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { AccessTokenState } from "../../redux/accessTokenSlice";
import {
  getBillingAccounts,
  setActiveBillingAccount,
} from "../../redux/billingAccountsSlice";
import {
  BillingSummaryState,
  getBillingSummary,
} from "../../redux/billingSummarySlice";
import { UserDetailsState } from "../../redux/userDetailsSlice";
import LoadingWrapper from "../common/loadingWrapper/LoadingWrapper";

const axios = require("axios").default;

interface BillingSummaryCardProps {}

const BillingSummaryCard: FunctionComponent<BillingSummaryCardProps> = () => {
  const dispatch = useAppDispatch();
  const accessTokenState: AccessTokenState = useAppSelector(
    (state) => state.accessToken
  );

  const { activeUserGroup, activeUserGroupSetStatus }: UserDetailsState =
    useAppSelector((state) => state.userDetails);

  const billingAccounts: BillingAccount[] = useAppSelector(
    (state) => state.billingAccounts.billingAccounts,
    shallowEqual
  );

  const activeBillingAccount: BillingAccount = useAppSelector(
    (state) => state.billingAccounts.activeBillingAccount,
    shallowEqual
  );

  const billingAccountsFetchStatus: DATA_FETCH_STATUS = useAppSelector(
    (state) => state.billingAccounts.billingAccountsFetchStatus
  );

  const activeBillingAccountSetStatus: DATA_FETCH_STATUS = useAppSelector(
    (state) => state.billingAccounts.activeBillingAccountSetStatus
  );

  const { billingSummary, billingSummaryFetchStatus }: BillingSummaryState =
    useAppSelector((state) => state.billingSummary, shallowEqual);

  useEffect(() => {
    if (activeUserGroupSetStatus == "RESOLVED") {
      dispatch(getBillingAccounts(accessTokenState, activeUserGroup.Key));
    }
  }, [activeUserGroupSetStatus]);

  useEffect(() => {
    if (billingAccountsFetchStatus == "RESOLVED")
      dispatch(setActiveBillingAccount(billingAccounts[0]));
  }, [billingAccountsFetchStatus]);

  useEffect(() => {
    if (
      billingSummaryFetchStatus == "LOADING" &&
      activeUserGroupSetStatus == "RESOLVED" &&
      activeBillingAccountSetStatus == "RESOLVED"
    )
      dispatch(
        getBillingSummary(
          accessTokenState,
          activeBillingAccount.AccountNumber,
          activeUserGroup.Key
        )
      );
  }, [activeBillingAccountSetStatus]);

  return (
    <>
      <div className="billing__summary__main__container">
        <Text size="m">
          Your latest bill for {" "}
          <LoadingWrapper dataFetchStatus={activeBillingAccountSetStatus}>
            {activeBillingAccount.Name}
          </LoadingWrapper>{" "}
          is now available.
        </Text>
        <VerticalSpace size="64" />
        <DashboardPanel
          header={
            <>
              <div>
                <Heading size="m">May total</Heading>
              </div>
              <LoadingWrapper dataFetchStatus={billingSummaryFetchStatus}>
                <div>
                  <Heading size="m">
                    £{billingSummary.BillCharges.TotalNotIncVat}{" "}
                  </Heading>
                </div>
              </LoadingWrapper>
              <div>
                <Text size="s" isInline>
                  Inc VAT{" "}
                </Text>
              </div>
              <LoadingWrapper dataFetchStatus={activeBillingAccountSetStatus}>
                <div>
                  <Text size="s" isInline>
                    Account {activeBillingAccount.AccountNumber}
                  </Text>
                </div>
              </LoadingWrapper>
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
                  <StatusLabel text="overdue: 1/05/2022" color="danger" />
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
                  <Image
                    src="/cost-breakdown.png"
                    alt="dummay cost breakdown"
                  />
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
                <DashboardBanner
                  body="For piece of mind  don’t be overdue again."
                  href="#"
                  title="Switch to payments by Direct Debit for all your biling accounts."
                  linktext="Set up Direct Debit >"
                />
              </Columns.Col>
            </Columns>
          </div>
          <VerticalSpace size="8" />
        </DashboardPanel>
      </div>
    </>
  );
};

export default BillingSummaryCard;

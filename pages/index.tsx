import {
  AppFooter,
  AppHeader,
  AppTemplate,
} from "@nayeemreniman/bt-my-account-react-components";
import { Columns, VerticalSpace } from "@arc-ui/components";
import React, { FunctionComponent } from "react";
import ClientDetailsCard from "../components/clientDetailsCard/ClientDetailsCard";
import BillingSummaryCard from "../components/billingSummaryCard/BillingSummaryCard";
import FaultsCard from "../components/faultsCard/FaultsCard";
import OrdersCard from "../components/ordersCard/OrdersCard";
import ManageServicesAndApps from "../components/manageServicesAndApps/ManageServicesAndApps";
import Recemendations from "../components/recemendations/Recemendations";
import { useAppSelector } from "../hooks";
import Head from "next/head";
import FakeAuthorization from "../components/fakeAuthorization/FakeAuthorization";
import AppLoader from "../components/common/appLoader/AppLoader";
import SideBarRecemendations from "../components/sideBarRecemendations/SideBarRecemendations";

export default function Home() {
  const { isLoggedIn } = useAppSelector((state) => state.accessToken);
  return (
    <>
      <Head>
        <title>BT Business</title>
      </Head>
      {isLoggedIn ? (
        <AppTemplate
          isLoggedIn={isLoggedIn}
          sideNonNavContainer={<SideBarRecemendations />}
        >
          <section>
            <ClientDetailsCard />
          </section>
          <VerticalSpace size="12" />
          <section>
            <BillingSummaryCard />
          </section>
          <VerticalSpace size="64" />
          <section>
            <Columns>
              <Columns.Col span={6}>
                <FaultsCard />
              </Columns.Col>
              <Columns.Col span={6}>
                <OrdersCard />
              </Columns.Col>
            </Columns>
          </section>
          <VerticalSpace size="64" />
          <section>
            <ManageServicesAndApps />
          </section>
          <VerticalSpace size="64" />
          <section>
            <Recemendations />
          </section>
        </AppTemplate>
      ) : (
        <FakeAuthorization />
      )}
    </>
  );
}

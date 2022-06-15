import { Columns, VerticalSpace } from "@arc-ui/components";
import React, { FunctionComponent } from "react";
import BillingSummaryCard from "../BillingSummaryCard";
import ClientDetailsCard from "../ClientDetailsCard";
import FaultsCard from "../FaultsCard";
import ManageServicesAndApps from "../manageServicesAndApps/ManageServicesAndApps";
import OrdersCard from "../OrdersCard";
import Recemendations from "../Recemendations";
import FakeAuthorization from "../temp/FakeAuthorization";

interface LayoutProps {}

const Layout: FunctionComponent<LayoutProps> = () => {
  return (
    <>
      <ClientDetailsCard />
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
            {" "}
            <OrdersCard />
          </Columns.Col>
        </Columns>
      </section>
      <VerticalSpace size="64" />
      <ManageServicesAndApps />
      <VerticalSpace size="64" />
      <section>
        <Recemendations />
      </section>
      <VerticalSpace />
      <FakeAuthorization />
    </>
  );
};

export default Layout;

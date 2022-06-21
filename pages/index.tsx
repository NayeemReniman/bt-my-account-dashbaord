import {
  AppTemplate,
  NotificationDrawer,
} from "@nayeemreniman/bt-my-account-react-components";
import { Align, Button, Columns, VerticalSpace } from "@arc-ui/components";
import React, { FunctionComponent, useState } from "react";
import ClientDetailsCard from "../components/clientDetailsCard/ClientDetailsCard";
import BillingSummaryCard from "../components/billingSummaryCard/BillingSummaryCard";
import FaultsCard from "../components/faultsCard/FaultsCard";
import OrdersCard from "../components/ordersCard/OrdersCard";
import ManageServicesAndApps from "../components/manageServicesAndApps/ManageServicesAndApps";
import Recemendations from "../components/recemendations/Recemendations";
import { useAppSelector } from "../hooks";
import Head from "next/head";
import FakeAuthorization from "../components/fakeAuthorization/FakeAuthorization";
import SideBarRecemendations from "../components/sideBarRecemendations/SideBarRecemendations";
import DashboardNotifications from "../components/common/DashboardNotfications/DashboardNotfications";
import Modal from "../components/common/modal/Modal";

export default function Home() {
  const { isLoggedIn } = useAppSelector((state) => state.accessToken);
  const [showModal, setShowModal] = useState(false);
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
            <div className="client__details__and__notifications__container">
              <div className="client__details__container">
                <ClientDetailsCard />
              </div>
              <div className="button__container">
                <Align horizontal="right" vertical="center">
                  <Button
                    label="Recent notifications"
                    icon="btNotification"
                    fill="solid"
                    onClick={() => setShowModal(true)}
                  />
                </Align>
                <Modal onClose={() => setShowModal(false)} show={showModal}>
                  <NotificationDrawer insights={[]} notifications={[]} />
                </Modal>
              </div>
            </div>
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
          <VerticalSpace size="64" />
          <div id="modal-root"></div>
        </AppTemplate>
      ) : (
        <FakeAuthorization />
      )}
    </>
  );
}

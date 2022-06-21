import { Align, Button } from "@arc-ui/components";
import {
  DashboardBannerProps,
  NotificationDrawer,
} from "@nayeemreniman/bt-my-account-react-components";
import { FunctionComponent, useState } from "react";
import Modal from "../modal/Modal";

const dummayInsignts: DashboardBannerProps[] = [
  {
    body: "",
    href: "#",
    linktext: "Manage subscriptions",
    title:
      "You’re only using 5% of your Acronis Business Backup – change plan to save up to £15.",
  },
  {
    body: "",
    href: "#",
    linktext: "Manage subscriptions",
    title:
      "You’re only using 5% of your Acronis Business Backup – change plan to save up to £15.",
  },
  {
    body: "",
    href: "#",
    linktext: "Manage subscriptions",
    title:
      "You’re only using 5% of your Acronis Business Backup – change plan to save up to £15.",
  },
  {
    body: "",
    href: "#",
    linktext: "Manage subscriptions",
    title:
      "You’re only using 5% of your Acronis Business Backup – change plan to save up to £15.",
  },
];

interface DashboardNotificationsProps {}

const DashboardNotifications: FunctionComponent<
  DashboardNotificationsProps
> = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Align horizontal="right" vertical="center">
        <Button
          label="Recent notifications"
          icon="btNotification"
          fill="solid"
          onClick={() => setShowModal(true)}
        />
      </Align>
      <Modal onClose={() => setShowModal(false)} show={showModal}>
        <NotificationDrawer insights={dummayInsignts} notifications={[]} />
      </Modal>
    </>
  );
};

export default DashboardNotifications;

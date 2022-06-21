import {
  DashboardBannerProps,
  NotificationDrawer,
} from "@nayeemreniman/bt-my-account-react-components";
import { FunctionComponent, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { AccessTokenState } from "../redux/accessTokenSlice";
import { getNotifications } from "../redux/notificationsSlice";
import { UserDetailsState } from "../redux/userDetailsSlice";

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

interface NotificationsHomeProps {}

const NotificationsHome: FunctionComponent<NotificationsHomeProps> = () => {
  const dispatch = useAppDispatch();

  const accessTokenState: AccessTokenState = useAppSelector(
    (state) => state.accessToken
  );
  const { activeUserGroup, activeUserGroupSetStatus }: UserDetailsState =
    useAppSelector((state) => state.userDetails);

  const { notifications, notificationsFetchStatus } = useAppSelector(
    (state) => state.notifications
  );

  useEffect(() => {
    if (activeUserGroupSetStatus == "RESOLVED") {
      dispatch(getNotifications(accessTokenState, activeUserGroup.Key));
    }
  }, [activeUserGroup]);
  
  return <NotificationDrawer insights={dummayInsignts} notifications={[]} />;
};

export default NotificationsHome;

import { SideNavbar } from "@nayeemreniman/bt-my-account-react-components";
import Image from "next/image";
import { FunctionComponent } from "react";

interface SideNavbarProps {}

const SideNav: FunctionComponent<SideNavbarProps> = () => {
  const sideMenuItems = [
    {
      title: "Dashboard",
      icon: "btDashboard",
      href: "#",
      subMenu: [],
    },
    {
      title: "Billing",
      icon: "btDocumentBills",
      href: "#",
      subMenu: [
        { title: "Statements", icon: "", href: "#" },
        { title: "Previous bills", icon: "", href: "#" },
        { title: "Payments", icon: "", href: "#" },
        { title: "Account reporting", icon: "", href: "#" },
        { title: "Subscriptions", icon: "", href: "#" },
        { title: "Account set up", icon: "", href: "#" },
      ],
    },
    {
      title: "Apps & services",
      icon: "btLayoutGridLarge",
      href: "#",
      subMenu: [],
    },
    {
      title: "Orders",
      icon: "btVan",
      href: "#",
      subMenu: [],
    },
    {
      title: "Faults",
      icon: "btSpanner",
      href: "#",
      subMenu: [],
    },
  ];
  return (
    <SideNavbar menuItems={sideMenuItems}>
      <></>
    </SideNavbar>
  );
};

export default SideNav;

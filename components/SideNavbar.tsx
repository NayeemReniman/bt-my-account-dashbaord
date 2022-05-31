import {
  Align as div,
  Columns,
  Icon,
  Surface,
  Text,
  VerticalSpace,
} from "@arc-ui/components";
import { FunctionComponent, useState } from "react";

interface SideNavbarProps {}

const SideNavbar: FunctionComponent<SideNavbarProps> = () => {
  const [activeMenu, setactiveMenu] = useState("Dashbaord");

  const sideMenuItems = [
    {
      title: "Dashbaord",
      icon: "btDashboard",
      href: "#",
    },
    {
      title: "Billing",
      icon: "btDocumentBills",
      href: "#",
    },
    {
      title: "Apps & services",
      icon: "btLayoutGridLarge",
      href: "#",
    },
    {
      title: "Orders",
      icon: "btVan",
      href: "#",
    },
    {
      title: "Faults",
      icon: "btSpanner",
      href: "#",
    },
  ];
  return (
    <section>
      <div className="sideNavBar__layer1">
        <div className="sideNavbar__controlLayer">
          {sideMenuItems.map((menuItem) => (
            <div
              key={menuItem.icon}
              className="sideNavbar__menuItem"
              style={
                activeMenu === menuItem.title
                  ? {
                      backgroundColor: "rgba(132, 73, 204, 0.6)",
                      color: "#FFFFFF",
                    }
                  : { backgroundColor: "#32008a", color: "#c1b2dc" }
              }
            >
              <a className="sideNavbar__menuLink"
                href={menuItem.href}
                onClick={(e) => setactiveMenu(menuItem.title)}
              >
                <Text size="l">
                  <Icon icon={menuItem.icon} size={32} isInline></Icon>{" "}
                  {menuItem.title}
                </Text>
              </a>
            </div>
          ))}
        </div>
        <div className="sideNavbar__adLayer">
          
        </div>
      </div>
    </section>
  );
};

export default SideNavbar;

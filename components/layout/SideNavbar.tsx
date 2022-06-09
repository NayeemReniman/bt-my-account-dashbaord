import {
  Align as div,
  Columns,
  Icon,
  Image,
  Surface,
  Text,
  VerticalSpace,
} from "@arc-ui/components";
import { FunctionComponent, useState } from "react";

interface SideNavbarProps {}

const SideNavbar: FunctionComponent<SideNavbarProps> = () => {
  const [activeMenu, setactiveMenu] = useState("Dashbaord");
  const [activeSubMenu, setactiveSubMenu] = useState("");

  const sideMenuItems = [
    {
      title: "Dashbaord",
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
    <section>
      <div className="sideNavBar__layer1">
        <div className="sideNavbar__controlLayer">
          {sideMenuItems.map((menuItem) => (
            <>
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
                <a key={menuItem.icon}
                  className="sideNavbar__menuLink"
                  href={menuItem.href}
                  onClick={(e) => {
                    setactiveMenu(menuItem.title);
                    setactiveSubMenu(
                      menuItem.subMenu.length > 0 ? menuItem.title : ""
                    );
                  }}
                >
                  <Text size="l" key={menuItem.icon}>
                    <Icon icon={menuItem.icon} size={32} isInline></Icon>{" "}
                    {menuItem.title}
                  </Text>
                </a>
              </div>
              {activeSubMenu === menuItem.title && (
                <div className="sideNavbar__subMenuWrapper" key={menuItem.title}>
                  {menuItem.subMenu.map((subMenu) => (
                    <div
                      className="sideNavbar__subMenuContainer"
                      key={subMenu.title}
                    >
                      <a className="sideNavbar__menuLink" href={subMenu.href}  key={subMenu.title}>
                        <Text size="m"  key={subMenu.title}>{subMenu.title}</Text>
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </>
          ))}
        </div>
        <div className="sideNavbar__adLayer">
          <Image src="/ad-banner.png" alt="dummay-poseter" />
        </div>
      </div>
    </section>
  );
};

export default SideNavbar;

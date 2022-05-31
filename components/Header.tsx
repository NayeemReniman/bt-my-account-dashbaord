import { Align, Icon, SiteHeader } from "@arc-ui/components";
import { FunctionComponent } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { AccessToken, AppState } from "../types/type.auth";

interface HeaderProps {}

const Header: FunctionComponent<HeaderProps> = () => {
  const accesstoken: AccessToken = useSelector(
    (state: AppState) => state.auth,
    shallowEqual
  );
  // const isLoggedIn: boolean = true;

  return (
    <>
      <SiteHeader
        loginHref={accesstoken.isLoggedIn ? "/logout" : "/login"}
        loginTitle={accesstoken.isLoggedIn ? "Logout" : "Login / Register"}
        search={<Icon icon="btSearch" size={40} />}
      >
        {/* <SiteHeader.NavItem href="#" title="Item 1" />
        <SiteHeader.NavItem href="#" title="Item 2" />
        <SiteHeader.NavItem href="#" title="Item 3" />
        <SiteHeader.NavItem href="#" title="Item 4" /> */}
      </SiteHeader>
    </>
  );
};

export default Header;

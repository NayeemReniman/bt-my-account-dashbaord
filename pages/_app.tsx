import { AppProps } from "next/app";
import { Base, VerticalSpace } from "@arc-ui/components";
import SideNav from "../components/layout/SideNav";

import { wrapper } from "../redux/store";
import "@arc-ui/components/dist/styles.css";
import "@arc-ui/components/dist/styles.bt.css";
import "@arc-ui/fonts";

import "../styles/globals.css";
import {
  AppFooter,
  AppHeader,
} from "@nayeemreniman/bt-my-account-react-components";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Base>
      <AppHeader isLoggedIn={true} />
      <div className="app__layout__container">
        <div key="sideNav">
          <SideNav />
        </div>
        <div key="mainContent">
          <Component {...pageProps} />
        </div>
      </div>
      <VerticalSpace />
      <AppFooter />
    </Base>
  );
}

export default wrapper.withRedux(MyApp);

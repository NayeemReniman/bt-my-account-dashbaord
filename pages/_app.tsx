import { AppProps } from "next/app";
import { Base, VerticalSpace } from "@arc-ui/components";
import SideNav from "../components/layout/SideNav";

import "@arc-ui/components/dist/styles.css";
import "@arc-ui/components/dist/styles.bt.css";
import "@arc-ui/fonts";

import "../styles/globals.css";
import {
  AppFooter,
  AppHeader,
  AppTemplate,
} from "@nayeemreniman/bt-my-account-react-components";
import { Provider } from "react-redux";
import { store } from "../redux/store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Base>
        <AppTemplate isLoggedIn={true} sideNonNavContainer={<></>}>
          <Component {...pageProps} />
        </AppTemplate>
      </Base>
    </Provider>
  );
}

export default MyApp;

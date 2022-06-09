import { AppProps } from "next/app";
import { Base, VerticalSpace } from "@arc-ui/components";
import SideNavbar from "../components/layout/SideNavbar";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import { wrapper } from "../redux/store";
import "@arc-ui/components/dist/styles.css";
import "@arc-ui/components/dist/styles.bt.css";
import "@arc-ui/fonts";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Base>
      <Header />
      <div className="app__layout__container">
        <div key="sideNav">
          <SideNavbar />
        </div>
        <div key="mainContent">
          <Component {...pageProps} />
        </div>
      </div>
      <VerticalSpace />
      <Footer />
    </Base>
  );
}

export default wrapper.withRedux(MyApp);

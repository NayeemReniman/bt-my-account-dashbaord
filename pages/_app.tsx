import { AppProps } from "next/app";
import { Base, VerticalSpace } from "@arc-ui/components";
import { wrapper } from "../redux/store";
import "@arc-ui/components/dist/styles.css";
import "@arc-ui/components/dist/styles.bt.css";
import "@arc-ui/fonts";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "../styles/globals.css";
import SideNavbar from "../components/SideNavbar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Base>
      <Header />
      <div className="app__layout__container">
        <div>
          <SideNavbar />
        </div>
        <div>
          <Component {...pageProps} />
        </div>
      </div>
      <VerticalSpace />
      <Footer />
    </Base>
  );
}

export default wrapper.withRedux(MyApp);

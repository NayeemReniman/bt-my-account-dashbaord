import { AppProps } from "next/app";
import { Base, BrandLogo, VerticalSpace } from "@arc-ui/components";
import { wrapper } from "../redux/store";
import "@arc-ui/components/dist/styles.css";
import "@arc-ui/components/dist/styles.bt.css";
import "@arc-ui/fonts";
import "../styles/globals.css";
import Footer from "../components/Footer";
import Header from "../components/Header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Base>
      <Header />
      <VerticalSpace />
      <Component {...pageProps} />
      <Footer />
    </Base>
  );
}

export default wrapper.withRedux(MyApp);

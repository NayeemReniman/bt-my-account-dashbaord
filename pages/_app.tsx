import { AppProps } from "next/app";

import "@arc-ui/components/dist/styles.css";
import "@arc-ui/components/dist/styles.bt.css";
import "@arc-ui/fonts";

import "../styles/globals.css";

import { Provider } from "react-redux";
import { store } from "../redux/store";
import { Base } from "@arc-ui/components";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Base>
        <Component {...pageProps} />
      </Base>
    </Provider>
  );
}

export default MyApp;

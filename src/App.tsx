import React, { FunctionComponent } from "react";
import "./styles.css";
import FakeAuthorization from "./components/FakeAuthorization";
import ClientDetailsCard from "./components/ClientDetailsCard";
import BillingSummaryCard from "./components/BillingSummaryCard";

interface AppProps {}

const App: FunctionComponent<AppProps> = () => {
  return (
    <div className="App">
      <FakeAuthorization></FakeAuthorization>
      <ClientDetailsCard></ClientDetailsCard>
      <BillingSummaryCard></BillingSummaryCard>
    </div>
  );
};

export default App;

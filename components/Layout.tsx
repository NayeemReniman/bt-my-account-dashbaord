import { VerticalSpace } from "@arc-ui/components";
import React, { FunctionComponent } from "react";
import ClientDetailsCard from "./ClientDetailsCard";
import FakeAuthorization from "./temp/FakeAuthorization";

interface LayoutProps {}

const Layout: FunctionComponent<LayoutProps> = () => {
  return (
    <>
      <ClientDetailsCard />
      <VerticalSpace />
      <FakeAuthorization />
    </>
  );
};

export default Layout;

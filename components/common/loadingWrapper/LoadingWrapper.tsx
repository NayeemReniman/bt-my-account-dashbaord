import { Heading } from "@arc-ui/components";
import { FunctionComponent } from "react";
import { DATA_FETCH_STATUS } from "../../../api";
import AppLoader from "../appLoader/AppLoader";
import styles from "./loadingWrapper.module.css";

export interface LoadingWrapperProps {
  dataFetchStatus: DATA_FETCH_STATUS;
  children: React.ReactNode;
  // rejectedComponent: React.ReactNode;
  loader?: React.ReactNode;
}

const LoadingWrapper: FunctionComponent<LoadingWrapperProps> = ({
  dataFetchStatus,
  loader = <AppLoader />,
  children,
}) => {
  return (
    <>
      {dataFetchStatus == "LOADING" && loader}
      {dataFetchStatus == "RESOLVED" && children}
    </>
  );
};

export default LoadingWrapper;

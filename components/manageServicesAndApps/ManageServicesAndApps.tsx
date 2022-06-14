import { VerticalSpace } from "@arc-ui/components";
import { FunctionComponent, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  getProductinventory,
  getProfileDetails,
  ProfileAndProductsState,
} from "../../redux/profileAndProductsSlice";
import { AccessTokenState } from "../../types/type.dashboard";
import ManagePanel from "./ManagePanel";

interface ManageServicesAndAppsProps {}

const ManageServicesAndApps: FunctionComponent<
  ManageServicesAndAppsProps
> = () => {
  const dispatch = useAppDispatch();
  const accessTokenState: AccessTokenState = useAppSelector(
    (state) => state.accessToken
  );

  const { manageServices, manageApps }: ProfileAndProductsState =
    useAppSelector((state) => state.profileAndProducts);

  useEffect(() => {
    dispatch(getProfileDetails(accessTokenState));
    dispatch(getProductinventory(accessTokenState));
  }, [accessTokenState]);

  return (
    <>
      <ManagePanel tilesConfig={manageServices} title="Manage Your Services" />
      {manageApps != undefined && (
        <>
          <VerticalSpace size="64" />
          <ManagePanel tilesConfig={manageApps} title="Get Mobile Apps" />
        </>
      )}
    </>
  );
};

export default ManageServicesAndApps;

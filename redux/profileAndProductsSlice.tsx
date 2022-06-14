import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AccessTokenState } from "../types/type.dashboard";
import {
  fetchProfileDetails,
  ProfileDetails,
  ProductInventory,
  fetchProductInventory,
} from "../api";
import { servicesConfig } from "../components/manageServicesAndApps/manageServices";
import { appsConfig } from "../components/manageServicesAndApps/manageApps";

export interface Service {
  [serviceCode: string]: {
    serviceName: string;
    externalLink: string;
    serviceDescription: string;
    buttonText: string;
    icon: string;
  };
}

export interface ProfileAndProductsState {
  profile: ProfileDetails;
  productInventory: ProductInventory;
  manageServices: Service;
  manageApps?: Service;
}

const initialState: ProfileAndProductsState = {
  profile: {
    queryOnlineClientProfileDetailsResponse: {
      identifierValue: "ryan.mosforth@btconnect.com",
      listOfClientServiceInstance: {
        clientServiceInstance: [],
      },
    },
  },
  productInventory: { productInventoryManagement: [], hrefLinks: [] },
  manageServices: {
    NON_BT_MOBILE: {
      serviceName: "Switching to non-BT Mobile service",
      serviceDescription: "Info on switching mobile service.",
      externalLink: "https://secure.business.bt.com/Account/PacRequestForm",
      buttonText: "Learn more",
      icon: "",
    },
  },
};

const slice = createSlice({
  name: "profileDetails",
  initialState,
  reducers: {
    addServicesAndAppsFromProfile(
      state,
      { payload }: PayloadAction<ProfileDetails>
    ) {
      const manageServices: Service = { ...state.manageServices };
      const manageApps: Service = { ...state.manageApps };
      payload.queryOnlineClientProfileDetailsResponse.listOfClientServiceInstance.clientServiceInstance
        .filter((serviceInstance) => serviceInstance.status === "ACTIVE")
        .forEach((serviceInstance) => {
          const { serviceCode } = serviceInstance;
          servicesConfig[serviceCode] != undefined &&
            extractAndSet(servicesConfig, manageServices, serviceCode);
          appsConfig[serviceCode] != undefined &&
            extractAndSet(appsConfig, manageApps, serviceCode);
        });
      return { ...state, ...{ manageServices }, ...{ manageApps } };
    },
    addServicesandAppsFromProductInventory(
      state,
      { payload }: PayloadAction<ProductInventory>
    ) {
      let hasEEReference = false;
      const serviceCode = "EE_REFERENCE";
      const manageApps: Service = { ...state.manageApps };
      const manageServices: Service = { ...state.manageServices };
      payload.productInventoryManagement.forEach((productInventory) => {
        !hasEEReference &&
          productInventory.ListOfLE.forEach((le) => {
            if (
              le.EEReference != undefined &&
              le.EEReference != null &&
              le.EEReference != "null"
            ) {
              hasEEReference = true;
            }
          });
      });
      if (hasEEReference) {
        servicesConfig[serviceCode] != undefined &&
          extractAndSet(servicesConfig, manageServices, serviceCode);
        appsConfig[serviceCode] != undefined &&
          extractAndSet(appsConfig, manageApps, serviceCode);
      }
      return { ...state, ...{ manageServices }, ...{ manageApps } };
    },
  },
});

export const {
  addServicesAndAppsFromProfile,
  addServicesandAppsFromProductInventory,
} = slice.actions;

const extractAndSet = (
  extractConfig: Service,
  setConfig: Service,
  key: string
): void => {
  const { buttonText, externalLink, serviceDescription, serviceName, icon } =
    extractConfig[key];
  setConfig[key] = {
    buttonText,
    externalLink,
    serviceDescription,
    serviceName,
    icon,
  };
};

export const getProfileDetails =
  (accessToken: AccessTokenState) =>
  async (
    dispatch: (arg0: { payload: ProfileDetails; type: string }) => void
  ) => {
    const response = await fetchProfileDetails(accessToken);
    dispatch(addServicesAndAppsFromProfile(response));
  };

export const getProductinventory =
  (accessToken: AccessTokenState) =>
  async (
    dispatch: (arg0: { payload: ProductInventory; type: string }) => void
  ) => {
    const response = await fetchProductInventory(accessToken);
    dispatch(addServicesandAppsFromProductInventory(response));
  };

export default slice.reducer;

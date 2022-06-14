import { AccessTokenState, UserDetailsResponse } from "./types/type.dashboard";

const axios = require("axios").default;

export type ServiceStatusCode = "ACTIVE" | "INACTIVE";

export interface ProfileService {
  serviceCode: string;
  key: string;
  status: ServiceStatusCode;
  listOfCharacteristic: {
    characteristic: { name: string; value: string }[];
  };
  listOfServiceRole: {
    serviceRole: {
      serviceRoleCode: string;
      serviceRoleStatus: ServiceStatusCode;
      serviceRoleKey: string;
      listOfClientIdentity: any;
      listOfChars: {
        chars: { name: string; value: string }[];
      };
    };
  };
  listOfServiceIdentity: {
    serviceIdentity: {
      value: string;
      domain: string;
    }[];
  };
}

export interface ProfileDetails {
  queryOnlineClientProfileDetailsResponse: {
    identifierValue: string;
    listOfClientServiceInstance: {
      clientServiceInstance: ProfileService[];
    };
  };
}
export interface LE {
  LEIntegrationId: string;
  LECode: string;
  EEReference: string;
}

export interface HrefLink {
  rel: string;
  href: string;
}
export interface Product {
  id: string;
  description: string;
  postCode: string;
  productName: null;
  productScode: string;
  productType: string;
  serviceLineType: string;
  networkUserId: string;
  status: string;
  date: string;
  hrefLinks: HrefLink[];
}
export interface ProductInventoryManagement {
  cugId: string;
  ListOfLE: LE[];
  billingAccounts: [
    {
      billingAccount: string;
      products: Product[];
    }
  ];
}
export interface ProductInventory {
  productInventoryManagement: ProductInventoryManagement[];
  hrefLinks: HrefLink[];
}

export const fetchUserDetails = async (
  accessTokenState: AccessTokenState
): Promise<UserDetailsResponse> => {
  const headers = {
    "APIGW-Client-Id": "10cbbbb7-eb4d-42c8-a61d-b79e19ba3e07",
    "APIGW-Tracking-Header": "45e13a30-bec9-472d-b999-b23e45199bb4",
    Authorization: `Bearer ${accessTokenState.accessToken}`,
    "Content-Type": "application/json",
    UDID: `${accessTokenState.deviceID}`,
  };
  const response = await axios({
    method: "GET",
    url: "https://api.business.bt.com/bt-business/v1/myaccount/user-details",
    headers,
  });
  console.log(response);
  return response.data as UserDetailsResponse;
};

export const fetchProfileDetails = async (
  accessTokenState: AccessTokenState,
  domain: string = "BTCOM"
): Promise<ProfileDetails> => {
  const headers = {
    "APIGW-Client-Id": "10cbbbb7-eb4d-42c8-a61d-b79e19ba3e07",
    "APIGW-Tracking-Header": "45e13a30-bec9-472d-b999-b23e45199bb4",
    Authorization: `Bearer ${accessTokenState.accessToken}`,
    "Content-Type": "application/json",
    UDID: `${accessTokenState.deviceID}`,
  };
  const response = await axios({
    method: "GET",
    url: `https://api.business.bt.com/bt-business/v1/myaccount/dashboard/client-profile-details?domain=${domain}`,
    headers,
  });
  console.log(response);
  return response.data as ProfileDetails;
};

export const fetchProductInventory = async (
  accessTokenState: AccessTokenState,
  serviceCategory: string = "Broadband"
): Promise<ProductInventory> => {
  const headers = {
    "APIGW-Client-Id": "10cbbbb7-eb4d-42c8-a61d-b79e19ba3e07",
    "APIGW-Tracking-Header": "45e13a30-bec9-472d-b999-b23e45199bb4",
    Authorization: `Bearer ${accessTokenState.accessToken}`,
    "Content-Type": "application/json",
    UDID: `${accessTokenState.deviceID}`,
  };
  const response = await axios({
    method: "GET",
    url: `https://api.ee.co.uk/bt-business-auth/v1/product-inventory-management/product?serviceCategory=${serviceCategory}`,
    headers,
  });
  console.log(response);
  return response.data as ProductInventory;
};

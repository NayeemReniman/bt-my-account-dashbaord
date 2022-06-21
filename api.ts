import { AccessTokenState } from "./redux/accessTokenSlice";

const axios = require("axios").default;

export type DATA_FETCH_STATUS = "LOADING" | "RESOLVED" | "REJECTED";
export type CommonResponse = {
  isSuccess: boolean;
  code: number;
  errorMessage: string;
};

export type UserGroup = {
  Name: string;
  RoleId: number;
  Key: string;
  CugId: string;
  ContactId: string;
};

export type UserDetails = {
  Title: string;
  FirstName: string;
  LastName: string;
  LastLoggedIn: string;
  Groups: UserGroup[];
  Intercepts: [];
  MobileNumber: string;
  LandlineNumber: string;
  PrimaryEmailAddress: string;
  AlternativeEmailAddress: string;
  Order: string;
  Interfaces: string;
  ContactId: string;
  ConsentList: string[];
};

export type UserDetailsResponse = CommonResponse & {
  result: UserDetails;
};

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

export type BillingAccount = {
  AccountNumber: string;
  Name: string;
  Roles: string;
  RoleStatus: string;
  RoleToShow: string;
};

export type BillingAccountsResponse = CommonResponse & {
  result: BillingAccount[];
};

export type BillingSummary = {
  BillSummary: {
    BillDate: string;
    PaymentDueDate: string;
    NextBillDate: string;
    Status: string;
    StatusDesc: string;
    IsPaid: boolean;
    BillRef: string;
    BillType: string;
    AccountName: string;
    BillingNameAndAddress: string;
    BillVersionNumber: number;
    BillingAccountSystem: string;
    PaymentMethod: string;
  };
  BillCharges: {
    RegularCharges: number;
    UsageCharges: number;
    OneOffCharges: number;
    DiscountCharges: number;
    Adjustments: number;
    TotalNotIncVat: number;
    TotalVat: number;
    TotalIncVat: number;
  };
  Products: any[];
};

export type BillingSummaryResponse = CommonResponse & {
  result: BillingSummary;
};

export type TabId = "1" | "2";
export type Fault = {
  ProductName: string;
  ServiceId: string;
  ReportedOn: string;
  FaultReference: string;
  Status: string;
  isOpen: boolean;
};

export type FaultsDetails = {
  PageIndex: number;
  TotalSize: number;
  PageSize: number;
  Faults: Fault[];
};
export type FaultsResponse = CommonResponse & {
  result: FaultsDetails;
};

export type Order = {
  "<OrderDate>k__BackingField": string;
  "<OrderIdentifier>k__BackingField": string;
  "<Description>k__BackingField": string;
  "<OrderStatus>k__BackingField": boolean;
  "<LongDescription>k__BackingField": string;
  "<PlacedOnDate>k__BackingField": string;
  "<CompletionDate>k__BackingField": string;
  "<CompleteOrderStatus>k__BackingField": string;
  "<Type>k__BackingField": number;
  "<Postcode>k__BackingField": string;
  "<ProductOrderItems>k__BackingField": string[];
};

export type OrdersDetails = {
  PageIndex: number;
  TotalSize: number;
  PageSize: number;
  Orders: Order[];
};
export type OrdersResponse = CommonResponse & {
  result: OrdersDetails;
};

export type Notification = {
  NotificationId: number;
  NotificationCategory: string;
  NotificationSubject: string;
  NotificationBody: string;
  NotificationDate: string;
  NotificationMedium: number;
  DisplayNotificationMedium: string;
  NotificationStatus: number;
  IsDeletable: boolean;
  NotificationLetterUri: string;
  NotificationKciMessageId: string;
  EnquiryReferenceNumber: number;
  NotificationKciProductCode: string;
  NotificationTemplateName: string;
};

export type NotificationsResponse = CommonResponse & {
  result: Notification[];
};

const fetchUsingAxios = async (
  accessTokenState: AccessTokenState,
  url: string,
  reqHeaders: any = {}
): Promise<any> => {
  const headers = {
    ...reqHeaders,
    ...{
      "APIGW-Client-Id": "10cbbbb7-eb4d-42c8-a61d-b79e19ba3e07",
      "APIGW-Tracking-Header": "45e13a30-bec9-472d-b999-b23e45199bb4",
      Authorization: `Bearer ${accessTokenState.accessToken}`,
      "Content-Type": "application/json",
      UDID: `${accessTokenState.deviceID}`,
    },
  };
  const response = await axios({
    method: "GET",
    url,
    headers,
  });
  console.log(`response resolved for url ${url} ${response}`);
  return response.data;
};

export const fetchUserDetails = async (
  accessTokenState: AccessTokenState
): Promise<UserDetailsResponse> => {
  return (await fetchUsingAxios(
    accessTokenState,
    `https://api.business.bt.com/bt-business/v1/myaccount/user-details`
  )) as UserDetailsResponse;
};

export const fetchProfileDetails = async (
  accessTokenState: AccessTokenState,
  domain: string = "BTCOM"
): Promise<ProfileDetails> => {
  return (await fetchUsingAxios(
    accessTokenState,
    `https://api.business.bt.com/bt-business/v1/myaccount/dashboard/client-profile-details?domain=${domain}`
  )) as ProfileDetails;
};

export const fetchProductInventory = async (
  accessTokenState: AccessTokenState,
  serviceCategory: string = "Broadband"
): Promise<ProductInventory> => {
  return (await fetchUsingAxios(
    accessTokenState,
    `https://api.ee.co.uk/bt-business-auth/v1/product-inventory-management/product?serviceCategory=${serviceCategory}`
  )) as ProductInventory;
};

export const fetchBillingAccounts = async (
  accessTokenState: AccessTokenState,
  groupKey: string
): Promise<BillingAccountsResponse> => {
  return (await fetchUsingAxios(
    accessTokenState,
    `https://api.ee.co.uk/bt-business-auth/v1/users/${groupKey}/billing-accounts`
  )) as BillingAccountsResponse;
};

export const fetchBillingAccountSummary = async (
  accessTokenState: AccessTokenState,
  accountNumber: string,
  groupKey: string
): Promise<BillingSummaryResponse> => {
  return (await fetchUsingAxios(
    accessTokenState,
    `https://api.ee.co.uk/bt-business-auth/v1/bills/${accountNumber}/summary`,
    { _authKey: groupKey }
  )) as BillingSummaryResponse;
};

export const fetchFaults = async (
  accessTokenState: AccessTokenState,
  groupKey: string,
  tabId: TabId
): Promise<FaultsResponse> => {
  return (await fetchUsingAxios(
    accessTokenState,
    `https://api.ee.co.uk/bt-business-auth/v1/faults/${groupKey}?pageSize=5&index=1&tabId=${tabId}`
  )) as FaultsResponse;
};

export const fetchOrders = async (
  accessTokenState: AccessTokenState,
  groupKey: string,
  tabId: TabId
): Promise<OrdersResponse> => {
  return (await fetchUsingAxios(
    accessTokenState,
    `https://api.ee.co.uk/bt-business-auth/v1/group-orders/${groupKey}?pageSize=5&index=1&tabId=${tabId}`
  )) as OrdersResponse;
};

export const fetchNotifications = async (
  accessTokenState: AccessTokenState,
  groupKey: string
): Promise<NotificationsResponse> => {
  return (await fetchUsingAxios(
    accessTokenState,
    `https://api.ee.co.uk/bt-business-auth/v1/notifications`,
    { _authKey: groupKey }
  )) as NotificationsResponse;
};

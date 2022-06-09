export type AccessToken = {
  accessToken: string;
  deviceID: string;
  masterContactID: string;
  userID: string;
  contactID: string;
  isLoggedIn: boolean;
};

export type UserGroups = {
  Name: string;
  RoleId: number;
  Key: string;
  CugId: string;
  ContactId: string;
};

export type CommonResponse = {
  isSuccess: boolean;
  code: number;
  errorMessage: string;
};

export type UserDetails = {
  Title: string;
  FirstName: string;
  LastName: string;
  LastLoggedIn: string;
  Groups: UserGroups[];
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

export type BillingAccount = {
  AccountNumber: string;
  Name: string;
  Roles: string;
  RoleStatus: string;
  RoleToShow: string;
};

export type BillingAccounts = CommonResponse & {
  result: BillingAccount[];
};

export type AppState = {
  auth: AccessToken;
  userDetails: UserDetailsResponse["result"];
};

export type AuthorizationAction = {
  type: string;
  payload: AccessToken;
};

export type DispatchType = (args: AuthorizationAction) => AuthorizationAction;

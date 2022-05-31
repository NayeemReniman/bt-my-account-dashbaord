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
export type UserDetails = CommonResponse & {
  result: {
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
  userDetails: UserDetails["result"];
};

export type AuthorizationAction = {
  type: string;
  payload: AccessToken;
};

export type DispatchType = (args: AuthorizationAction) => AuthorizationAction;

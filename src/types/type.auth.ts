export type AccessToken = {
  accessToken: string;
  deviceID: string;
  masterContactID: string;
  userID: string;
  contactID: string;
  isLoggedIn: boolean;
};

export type AppState = { auth: AccessToken; userDetails: { name: string } };

export type AuthorizationAction = {
  type: string;
  payload: AccessToken;
};

export type DispatchType = (args: AuthorizationAction) => AuthorizationAction;

export type bilingGroups = {
  Name: string;
  RoleId: number;
  Key: string;
  CugId: string;
  ContactId: string;
};

export type commonResponse = {
  isSuccess: boolean;
  code: number;
  errorMessage: string;
};
export type userDetails = commonResponse & {
  result: {
    Title: string;
    FirstName: string;
    LastName: string;
    LastLoggedIn: string;
    Groups: bilingGroups[];
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

export type billingAccount = {
  AccountNumber: string;
  Name: string;
  Roles: string;
  RoleStatus: string;
  RoleToShow: string;
};

export type billingAccounts = commonResponse & {
  result: billingAccount[];
};

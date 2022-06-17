import {
  Align as div,
  Button,
  VerticalSpace,
  TextInput,
  FormControl,
  Columns,
  Align,
} from "@arc-ui/components";
import { DashboardCard } from "@nayeemreniman/bt-my-account-react-components";
import React from "react";
import { FunctionComponent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { AccessTokenState, addAccessToken } from "../../redux/accessTokenSlice";


import styles from "./fakeAuthorization.module.css";

interface FakeAuthorizationProps {}

const FakeAuthorization: FunctionComponent<FakeAuthorizationProps> = () => {
  const dispatch = useAppDispatch();

  const accessTokenInitialState: AccessTokenState = useAppSelector(
    (state) => state.accessToken
  );

  const saveAcessToken = (accessToken: AccessTokenState) => {
    dispatch(addAccessToken(accessToken));
  };

  const [accessToken, setaccessToken] = useState<string>(
    accessTokenInitialState.accessToken
  );
  const [deviceID, setdeviceID] = useState<string>(
    accessTokenInitialState.deviceID
  );
  const [masterContactID, setmasterContactID] = useState<string>(
    accessTokenInitialState.masterContactID
  );
  const [userID, setuserID] = useState<string>(accessTokenInitialState.userID);
  const [contactID, setcontactID] = useState<string>(
    accessTokenInitialState.contactID
  );

  const [isLoggedIn, setisLoggedIn] = useState<boolean>(
    accessTokenInitialState.isLoggedIn
  );

  const handleSubmit = (): void => {
    setisLoggedIn(true);
    console.log(accessToken);
    saveAcessToken({
      accessToken,
      deviceID,
      masterContactID,
      userID,
      contactID,
      isLoggedIn,
    });
  };

  return (
    <Align horizontal="center">
      <VerticalSpace size="12" />
      <DashboardCard
        buttonText="Set access token"
        buttonAction={() => handleSubmit()}
        headerText="Access Token Details"
        icon="btUser"
      >
        <form className={styles.form__container}>
          <div className={styles.form__element}>
            <TextInput
              id="accessToken"
              label="Access Token"
              onChange={(e) => setaccessToken(e.target.value)}
              value={accessToken}
              labelSize="s"
              isRequired={true}
            />
          </div>
          <div className={styles.form__element}>
            <TextInput
              id="deviceId"
              label="Device id"
              onChange={(e) => setdeviceID(e.target.value)}
              value={deviceID}
              labelSize="s"
              isRequired={true}
            />
          </div>
          <div className={styles.form__element}>
            <TextInput
              id="masterContactId"
              label="Master ContactID"
              onChange={(e) => setmasterContactID(e.target.value)}
              value={masterContactID}
              labelSize="s"
              isRequired={true}
            />
          </div>
          <div className={styles.form__element}>
            <TextInput
              id="userId"
              label="User ID"
              onChange={(e) => setuserID(e.target.value)}
              value={userID}
              labelSize="s"
              isRequired={true}
            />
          </div>
          <div className={styles.form__element}>
            <TextInput
              id="ContactID"
              label="ContactID"
              onChange={(e) => setcontactID(e.target.value)}
              value={contactID}
              labelSize="s"
              isRequired={true}
            />
          </div>
        </form>
      </DashboardCard>
      <VerticalSpace size="12" />
    </Align>
  );
};

export default FakeAuthorization;

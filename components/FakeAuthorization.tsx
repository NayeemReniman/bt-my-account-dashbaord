import {
  Align,
  Button,
  VerticalSpace,
  Text,
  TextInput,
} from "@arc-ui/components";
import React from "react";
import { Dispatch, FormEvent, FunctionComponent, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { addAcessToken } from "../redux/actions/main";
import { AccessToken, AppState } from "../types/type.auth";

interface FakeAuthorizationProps {}

const FakeAuthorization: FunctionComponent<FakeAuthorizationProps> = () => {
  const accessTokenInitialState: AccessToken = useSelector(
    (state: AppState) => state.auth,
    shallowEqual
  );
  const dispatch: Dispatch<any> = useDispatch();

  const saveAcessToken = React.useCallback(
    (accessToken: AccessToken) => dispatch(addAcessToken(accessToken)),
    [dispatch]
  );

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

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    setisLoggedIn(true);
    e.preventDefault();
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
    <section>
      {isLoggedIn ? (
        <section>
          <Button label="Re Login" onClick={() => setisLoggedIn(false)} />
        </section>
      ) : (
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <TextInput
              id="accessToken"
              label="Access Token"
              onChange={(e) => setaccessToken(e.target.value)}
              value={accessToken}
            />
          </div>
          <div>
            <label>DeviceId</label>
            <input
              name="deviceID"
              onChange={(e) => setdeviceID(e.target.value)}
              value={deviceID}
              placeholder="deviceId"
            />
          </div>
          <div>
            <label>Master ContactID</label>
            <input
              name="masterContactID"
              onChange={(e) => setmasterContactID(e.target.value)}
              value={masterContactID}
              placeholder="masterContactID"
            />
          </div>
          <div>
            <label>User ID</label>
            <input
              name="userID"
              onChange={(e) => setuserID(e.target.value)}
              value={userID}
              placeholder="userID"
            />
          </div>
          <div>
            <label>ContactID</label>
            <input
              name="contactID"
              onChange={(e) => setcontactID(e.target.value)}
              value={contactID}
              placeholder="contactID"
            />
          </div>
          <VerticalSpace />
          <Align horizontal="center">
            <Button label="submit" type="submit" />
          </Align>
        </form>
      )}
    </section>
  );
};

export default FakeAuthorization;

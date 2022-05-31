import {
  Align,
  Button,
  VerticalSpace,
  TextInput,
  FormControl,
  Columns,
} from "@arc-ui/components";
import React from "react";
import { Dispatch, FormEvent, FunctionComponent, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { addAcessToken } from "../../redux/actions/main";
import { AccessToken, AppState } from "../../types/type.auth";

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
    <section>
      {isLoggedIn ? (
        <Align horizontal="right">
          <Button
            icon="btRefresh"
            label="Re Login"
            fill="flat"
            iconPosition="iconOnly"
            onClick={() => setisLoggedIn(false)}
          />
        </Align>
      ) : (
        <Columns>
          <Columns.Col span={3}></Columns.Col>
          <Columns.Col span={6}>
            <form onSubmit={(e) => handleSubmit(e)}>
              <Align horizontal="center">
                <FormControl
                  elementType="fieldset"
                  label="Access Token Details"
                  requirementStatus="not-applicable"
                >
                  <VerticalSpace />
                  <TextInput
                    id="accessToken"
                    label="Access Token"
                    onChange={(e) => setaccessToken(e.target.value)}
                    value={accessToken}
                    labelSize="s"
                    isRequired={true}
                  />

                  <TextInput
                    id="deviceId"
                    label="Device id"
                    onChange={(e) => setdeviceID(e.target.value)}
                    value={deviceID}
                    labelSize="s"
                    isRequired={true}
                  />

                  <TextInput
                    id="masterContactId"
                    label="Master ContactID"
                    onChange={(e) => setmasterContactID(e.target.value)}
                    value={masterContactID}
                    labelSize="s"
                    isRequired={true}
                  />

                  <TextInput
                    id="userId"
                    label="User ID"
                    onChange={(e) => setuserID(e.target.value)}
                    value={userID}
                    labelSize="s"
                    isRequired={true}
                  />

                  <TextInput
                    id="ContactID"
                    label="ContactID"
                    onChange={(e) => setcontactID(e.target.value)}
                    value={contactID}
                    labelSize="s"
                    isRequired={true}
                  />
                </FormControl>
              </Align>
              <VerticalSpace />
              <Align horizontal="center">
                <Button label="submit" type="submit" />
              </Align>
            </form>
          </Columns.Col>
        </Columns>
      )}
    </section>
  );
};

export default FakeAuthorization;

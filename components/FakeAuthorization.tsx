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
    <div className="row__flex app_card">
      {isLoggedIn ? (
        <div className="form__element">
          <button type="button" onClick={(e) => setisLoggedIn(false)}>
            Re Login
          </button>
        </div>
      ) : (
        <form
          className="fakeauhtoization__form"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="form__element">
            <label className="form__label">Access Token</label>
            <input
              name="accessToken"
              onChange={(e) => setaccessToken(e.target.value)}
              value={accessToken}
              placeholder="accessToken"
            />
          </div>
          <div className="form__element">
            <label className="form__label">DeviceId</label>
            <input
              name="deviceID"
              onChange={(e) => setdeviceID(e.target.value)}
              value={deviceID}
              placeholder="deviceId"
            />
          </div>
          <div className="form__element">
            <label className="form__label">Master ContactID</label>
            <input
              name="masterContactID"
              onChange={(e) => setmasterContactID(e.target.value)}
              value={masterContactID}
              placeholder="masterContactID"
            />
          </div>
          <div className="form__element">
            <label className="form__label">User ID</label>
            <input
              name="userID"
              onChange={(e) => setuserID(e.target.value)}
              value={userID}
              placeholder="userID"
            />
          </div>
          <div className="form__element">
            <label className="form__label">ContactID</label>
            <input
              name="contactID"
              onChange={(e) => setcontactID(e.target.value)}
              value={contactID}
              placeholder="contactID"
            />
          </div>
          <div className="form__element">
            <button type="submit">submit</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default FakeAuthorization;

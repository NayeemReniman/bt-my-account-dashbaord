import { FunctionComponent, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  getUserDetails,
  setActiveUserGroup,
  UserDetailsState,
} from "../../redux/userDetailsSlice";
import { PageHeading } from "@nayeemreniman/bt-my-account-react-components";
import { AccessTokenState } from "../../redux/accessTokenSlice";
import LoadingWrapper from "../common/loadingWrapper/LoadingWrapper";

interface ClientDetailsCardProps {}

const ClientDetailsCard: FunctionComponent<ClientDetailsCardProps> = () => {
  const dispatch = useAppDispatch();
  const accessTokenState: AccessTokenState = useAppSelector(
    (state) => state.accessToken
  );

  const { userDetails, userDetailsFetchStatus }: UserDetailsState =
    useAppSelector((state) => state.userDetails);

  useEffect(() => {
    dispatch(getUserDetails(accessTokenState));
  }, [accessTokenState]);

  useEffect(() => {
    if (userDetailsFetchStatus == "RESOLVED")
      dispatch(setActiveUserGroup(userDetails.Groups[0]));
  }, [userDetails]);

  return (
    <>
      <LoadingWrapper dataFetchStatus={userDetailsFetchStatus}>
        <PageHeading
          heading={`Hi ${userDetails.FirstName}, welcome back to BT Business`}
          description="Thursday 05 May"
        />
      </LoadingWrapper>
    </>
  );
};

export default ClientDetailsCard;

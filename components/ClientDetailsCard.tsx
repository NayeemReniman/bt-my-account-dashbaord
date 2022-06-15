import { FunctionComponent, useEffect } from "react";

import { AccessTokenState, UserDetails } from "../types/type.dashboard";

import { useAppDispatch, useAppSelector } from "../hooks";
import { getUserDetails } from "../redux/userDetailsSlice";
import { PageHeading } from "@nayeemreniman/bt-my-account-react-components";

interface ClientDetailsCardProps {}

const ClientDetailsCard: FunctionComponent<ClientDetailsCardProps> = () => {
  const dispatch = useAppDispatch();
  const accessTokenState: AccessTokenState = useAppSelector(
    (state) => state.accessToken
  );

  const userDetails: UserDetails = useAppSelector((state) => state.userDetails);

  useEffect(() => {
    dispatch(getUserDetails(accessTokenState));
  }, [accessTokenState]);

  return (
    <>
      <PageHeading
        heading={`Hi ${userDetails?.FirstName}, welcome back to BT Business`}
        description="Thursday 05 May"
      />
    </>
  );
};

export default ClientDetailsCard;

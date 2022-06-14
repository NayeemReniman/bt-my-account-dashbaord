import { Heading, VerticalSpace, Text, Columns } from "@arc-ui/components";
import { FunctionComponent, useEffect, useState } from "react";

import { AccessTokenState, UserDetails } from "../types/type.dashboard";
import "../styles/sidenavbar.module.css";

import { useAppDispatch, useAppSelector } from "../hooks";
import { getUserDetails } from "../redux/userDetailsSlice";

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
      <section>
        <Heading size="m">
          Hi {userDetails?.FirstName}, welcome back to BT Business
        </Heading>
        <VerticalSpace size="12" />
        <Text size="m">Thursday 05 May</Text>
        <VerticalSpace size="12" />
        <Text size="m">
          Your latest bill for Home food cafe is now available.
        </Text>
      </section>
    </>
  );
};

export default ClientDetailsCard;

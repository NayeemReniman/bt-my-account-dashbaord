import { Heading, SiteHeader } from "@arc-ui/components";
import { AppFooter } from "@nayeemreniman/bt-my-account-react-components";
import Head from "next/head";
import { FunctionComponent } from "react";
import FakeAuthorization from "../components/fakeAuthorization/FakeAuthorization";
import Login from "../components/login/Login";
import { useAppSelector } from "../hooks";

interface LoginPageProps {}

const LoginPage: FunctionComponent<LoginPageProps> = () => {
  const { isLoggedIn } = useAppSelector((state) => state.accessToken);
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <SiteHeader hasLogin={false} />
      <Login />
      <AppFooter />
    </>
  );
};

export default LoginPage;

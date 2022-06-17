import { Align, VerticalSpace, TextInput } from "@arc-ui/components";
import { DashboardCard } from "@nayeemreniman/bt-my-account-react-components";
import { FunctionComponent, useState } from "react";
import styles from "./login.module.css";
interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
  const [username, setusername] = useState<string>("");
  const [password, setpassword] = useState<string>("");
  return (
    <Align horizontal="center">
      <VerticalSpace size="12" />
      <DashboardCard
        buttonText="Login"
        buttonAction={() => console.log("iam clicked from login page!!")}
        headerText="Login"
        icon="btLocked"
      >
        <form className={styles.form__container}>
          <div className={styles.form__element}>
            <TextInput
              id="username"
              label="Username"
              onChange={(e) => setusername(e.target.value)}
              value={username}
              labelSize="s"
              isRequired={true}
              type="email"
            />
          </div>
          <div className={styles.form__element}>
            <TextInput
              id="password"
              label="Password"
              onChange={(e) => setpassword(e.target.value)}
              value={password}
              labelSize="s"
              isRequired={true}
              type="password"
            />
          </div>
        </form>
      </DashboardCard>
      <VerticalSpace size="12" />
    </Align>
  );
};

export default Login;

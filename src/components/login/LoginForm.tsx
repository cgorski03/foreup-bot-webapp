import React, { useState, useContext } from "react";
import { signIn, fetchUserAttributes } from "aws-amplify/auth";
import LoginButton from "./inputFields/LoginButton";
import UsernameField from "./inputFields/UsernameField";
import PasswordField from "./inputFields/PasswordField";
import AuthorizationErrorMessage from "./message/AuthorizationErrorMessage";
import "./loginForm.css";
import { UserInformationContext } from "../../Contexts/UserContext";

type LoginFormProps = {
  onAuthentication: () => void;
};
const LoginForm = (props: LoginFormProps) => {
  const { onAuthentication } = props;
  const { setUserInfo } = useContext(UserInformationContext)
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoader] = useState<boolean>(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState<string>("");

  async function attemptLogin() {
    try {
      setLoader(true);
      await signIn({ username, password });
      setLoader(false);
      const userAttributes = await fetchUserAttributes();
      setUserInfo &&
        setUserInfo({
          name: userAttributes.name,
          email: userAttributes.email,
          email_verified: userAttributes.email_verified,
        });
      onAuthentication(); // call the parent callback function
      // testing const { accessToken, idToken } = (await fetchAuthSession()).tokens ?? {};
    } catch (error: any) {
      setLoader(false);
      setLoginErrorMessage(error.message);
    }
  }

  const handleUsernameChange = (newUsername: string) => {
    setUsername(newUsername);
  };
  const handlePasswordChange = (newPassword: string) => {
    setPassword(newPassword);
  };
  const handleLogin = () => {
    attemptLogin();
  };
  const handleEnterKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleLogin();
    } else {
      // rerender the error message blank if the user is typing
      if (loginErrorMessage !== "") {
        setLoginErrorMessage("");
      }
    }
  };

  return (
    <div className="textField" onKeyDown={handleEnterKey}>
      <img src="/images/golf_bot_image.jpeg" className="appImage" alt="" />
      <UsernameField onChange={handleUsernameChange} />

      <PasswordField onChange={handlePasswordChange} />
      <LoginButton onClick={handleLogin} loading={loading} />
      <AuthorizationErrorMessage error={loginErrorMessage} />
    </div>
  );
};

export default LoginForm;

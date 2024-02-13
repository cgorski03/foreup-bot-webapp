import React, { useState } from "react";
import { signIn } from "aws-amplify/auth";
import UsernameField from "./inputFields/UsernameField";
import PasswordField from "./inputFields/PasswordField";
import { AuthorizationErrorMessage } from "./message/ErrorMessage";
import OutlinedButtonLoader from "../buttons/OutlinedButtonLoader";
import "./loginForm.css";

type LoginFormProps = {
  onAuthentication: () => void;
};
export const LoginForm = (props: LoginFormProps) => {
  const { onAuthentication } = props;
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoader] = useState<boolean>(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState<string>("");

  async function attemptLogin() {
    try {
      setLoader(true);
      await signIn({ username, password });
      setLoader(false);
      onAuthentication(); // call the parent callback function
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
      <img src="/images/golf_bot_image.jpeg" className="appImage" alt="app" />
      <UsernameField onChange={handleUsernameChange} />
      <PasswordField onChange={handlePasswordChange} />
      <OutlinedButtonLoader
        onClick={handleLogin}
        buttonText="Login"
        loading={loading}
      />
      <AuthorizationErrorMessage error={loginErrorMessage} />
    </div>
  );
};

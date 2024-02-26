import React, { useState } from 'react';
import { signIn } from 'aws-amplify/auth';
import TextInputField from './inputFields/TextInputField';
import { AuthorizationErrorMessage } from './message/ErrorMessage';
import OutlinedButtonLoader from '../buttons/OutlinedButtonLoader';
import './loginForm.css';
import useSignIn from '../../utils/hooks/useSignIn';

type LoginFormProps = {
  onAuthentication: () => void;
};
function LoginForm(props: LoginFormProps) {
  const { onAuthentication } = props;
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoader] = useState<boolean>(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState<string>('');
  const { setAuthedContext } = useSignIn();
  async function attemptLogin() {
    try {
      setLoader(true);
      await signIn({ username, password });
      setLoader(false);
      await setAuthedContext();
      onAuthentication(); // call the parent callback function
    } catch (error: any) {
      setLoader(false);
      setLoginErrorMessage(error.message);
    }
  }
  const handleUsernameChange = (newUsername: string) => {
    setUsername(newUsername);
    setLoginErrorMessage('');
  };
  const handlePasswordChange = (newPassword: string) => {
    setLoginErrorMessage('');
    setPassword(newPassword);
  };
  const handleLogin = () => {
    attemptLogin();
  };

  return (
    <div className="textField">
      <img
        src="/images/golf_bot_image.jpeg"
        className="appImage"
        alt="app"
      />
      <TextInputField
        onChange={handleUsernameChange}
        placeholder="Username"
        loginPress={handleLogin}
      />
      <TextInputField
        onChange={handlePasswordChange}
        placeholder="Password"
        loginPress={handleLogin}
      />
      <OutlinedButtonLoader
        onClick={handleLogin}
        buttonText="Login"
        loading={loading}
      />
      <AuthorizationErrorMessage error={loginErrorMessage} />
    </div>
  );
}

export default LoginForm;

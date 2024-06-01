import React, { useState } from 'react';
import { confirmSignIn, signIn } from 'aws-amplify/auth';
import TextInputField from './inputFields/TextInputField';
import { AuthorizationErrorMessage } from './message/ErrorMessage';
import './loginForm.css';
// @ts-ignore
import { ReactComponent as Loader } from './spinner.svg';
import useSignIn from '../../utils/hooks/useAuthContext';

type LoginFormProps = {
  onAuthentication: () => void;
};

function LoginFormVerifyPassword(props: {
  username: string;
  hideVerificationForm: () => void;
  onAuthentication: () => void;
}) {
  const { username, hideVerificationForm, onAuthentication } = props;
  const [password1, setPassword1] = useState<string>('');
  const [password2, setPassword2] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { setAuthedContext } = useSignIn();

  const confirmPassword = async () => {
    if (password1 !== password2) {
      setErrorMessage('Passwords do not match');
      return;
    }
    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?& ]).{8,}$/.test(password1)) {
      setErrorMessage('Password does not meet requirements');
      return;
    }
    try {
      setLoading(true);
      const userAttributes = { name: username };
      const { nextStep } = await confirmSignIn({
        challengeResponse: password1,
        options: { userAttributes },
      });
      if (nextStep.signInStep === 'DONE') {
        const result = await setAuthedContext();
        if (result) {
          onAuthentication();
        }
      }
      setLoading(false);
      hideVerificationForm();
    } catch (error: any) {
      setLoading(false);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="textField">
      <div className="verify-password-instructions">
        <h2>Please create a new password to continue.</h2>
        <p>Your password must contain:</p>
        <ul>
          <li>8-character minimum length</li>
          <li>At least 1 number</li>
          <li>At least 1 lowercase letter</li>
          <li>At least 1 uppercase letter</li>
          <li>At least 1 special character</li>
        </ul>
      </div>
      <div className="loginInputContainer">
        <AuthorizationErrorMessage error={errorMessage} />
        <TextInputField
          setInput={setPassword1}
          placeholder="Password"
          loginPress={() => confirmPassword()}
        />
        <TextInputField
          setInput={setPassword2}
          placeholder="Confirm Password"
          loginPress={() => confirmPassword()}
        />
        <button
          className="d-button-style login-button"
          onClick={() => confirmPassword()}
          disabled={loading}
          type="submit"
        >
          {loading ? (
            <span className="seachIconLoaderWrapper">
              <Loader />
            </span>
          ) : (
            <span className="button-text-wrapper">
              <span className="button-text">Submit</span>
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
function LoginForm(props: LoginFormProps) {
  const { onAuthentication } = props;
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoader] = useState<boolean>(false);
  const [showVerifyPassword, setShowVerifyPassword] = useState<boolean>(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState<string>('');
  const { setAuthedContext } = useSignIn();

  async function attemptLogin() {
    try {
      setLoader(true);
      // Attempt the login
      const response = await signIn({ username, password });
      // If the nextStep is CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED
      // the user must provide a new password
      if (response.nextStep.signInStep === 'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED') {
        // Render the password verification form
        setShowVerifyPassword(true);
      }
      setLoader(false);
      const result = await setAuthedContext();
      if (result) {
        onAuthentication(); // call the parent callback function
      }
    } catch (error: any) {
      setLoader(false);
      setLoginErrorMessage(error.message);
    }
  }

  if (showVerifyPassword) {
    return (
      <LoginFormVerifyPassword
        username={username}
        hideVerificationForm={() => setShowVerifyPassword(false)}
        onAuthentication={onAuthentication}
      />
    );
  }
  return (
    <div className="textField">
      <img
        src="/golf_bot_image.jpeg"
        className="appImage"
        alt="app"
      />
      <div className="loginInputContainer">
        <AuthorizationErrorMessage error={loginErrorMessage} />
        <TextInputField
          setInput={setUsername}
          placeholder="Username"
          loginPress={() => attemptLogin()}
        />
        <TextInputField
          setInput={setPassword}
          placeholder="Password"
          loginPress={() => attemptLogin()}
        />
        <button
          className="d-button-style login-button"
          onClick={() => attemptLogin()}
          disabled={false}
          type="submit"
        >
          {loading ? (
            <span className="seachIconLoaderWrapper">
              <Loader />
            </span>
          ) : (
            <span className="button-text-wrapper">
              <span className="button-text">login</span>
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

export default LoginForm;

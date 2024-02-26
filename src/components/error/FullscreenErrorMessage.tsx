import React from 'react';
import './fullscreenError.css';
import useSignOut from '../../utils/hooks/useSignOut';
import OutlinedButtonLoader from '../buttons/OutlinedButtonLoader';

type FullscreenErrorMessageProps = {
  msg: string;
};
export default function FullscreenErrorMessage({ msg }: FullscreenErrorMessageProps) {
  const { logOut, signingOut } = useSignOut();
  const handleSignOut = () => {
    logOut();
  };
  return (
    <div className="fullscreenSignoutMessage">
      <div className="signoutMessageForm">
        <img
          src="/images/golf_bot_image.jpeg"
          className="appImage"
          alt="app"
        />
        <p>{msg}</p>
        <OutlinedButtonLoader
          onClick={handleSignOut}
          buttonText="Sign Out"
          classOverride="sessionTimeoutLogout"
          loading={signingOut}
        />
      </div>
    </div>
  );
}

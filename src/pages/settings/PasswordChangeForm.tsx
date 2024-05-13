import React from 'react';
import { FaPersonFallingBurst } from 'react-icons/fa6';

export default function PasswordChangeForm() {
  return (
    <div className="settingsFieldContainer">
      <span className="settingLabel">Password Change Coming Soon!</span>
      <div className="testMessageContainer">
        <button
          className="testMessageButton NagMeButton"
          onClick={() => console.log('Test')}
          type="submit"
        >
          <FaPersonFallingBurst className="settingValueIcon" />
          <span>
            Click Here to Nag Me - Especially if you&apos;re Aidan you probably really want
            a new password
          </span>
        </button>
      </div>
    </div>
  );
}

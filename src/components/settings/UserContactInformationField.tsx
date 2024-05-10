import React, { useContext, useState } from 'react';
import { FaDiscord } from 'react-icons/fa';
import { UserInformationContext } from '../../Contexts/UserContext';
import './userContactInformation.css';
import { useTestMessage } from '../../utils/api/requests';
import DiscordVerificationPopup from './DiscordVerificationPopup';

function UserContactInformationField() {
  const { userInfo } = useContext(UserInformationContext);
  const { sendTestMessage, testMessageLoading } = useTestMessage();
  const [showVerifyPopup, setShowVerifyPopup] = useState(false);

  const handleConnectDiscordButton = () => {
    setShowVerifyPopup(true);
  };

  const handleTestMessageButton = () => {
    sendTestMessage();
  };

  return userInfo?.channel_id ? (
    <div className="settingsFieldContainer">
      <span className="settingLabel"> Connected contact method:</span>
      <div className="testMessageContainer">
        <button
          className={`testMessageButton ${testMessageLoading ? 'loading' : ''}`}
          onClick={handleTestMessageButton}
          type="submit"
        >
          <FaDiscord className="settingValueIcon" /> <span>Test</span>
        </button>
      </div>
    </div>
  ) : (
    <div className="settingsFieldContainer">
      <span className="settingLabel"> Connected contact method:</span>
      <div className="settingValueContainer">
        <button
          className={`testMessageButton ${testMessageLoading ? 'loading' : ''}`}
          onClick={handleConnectDiscordButton}
          type="submit"
        >
          <FaDiscord className="settingValueIcon" /> <span>Connect Discord</span>
        </button>
        {showVerifyPopup && (
          <DiscordVerificationPopup closeWindow={() => setShowVerifyPopup(false)} />
        )}
      </div>
    </div>
  );
}

export default UserContactInformationField;

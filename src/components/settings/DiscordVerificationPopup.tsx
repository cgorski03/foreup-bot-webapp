import React from 'react';
import './discordVerificationPopup.css';
import { FaTimes } from 'react-icons/fa';
import IconLabeledButton from '../buttons/IconLabeledButton';

type DiscordVerificationPopupProps = {
  closeWindow: () => void;
};
export default function DiscordVerificationPopup({
  closeWindow,
}: DiscordVerificationPopupProps) {
  return (
    <div className="verificationWrapper">
      <div className="discordVerificationPopup">
        <IconLabeledButton
          onClick={closeWindow}
          icon={<FaTimes />}
          loading={false}
        />
        <div className="discordVerificationPopupContent">
          <h1>Discord Verification</h1>
          <p>
            To verify your Discord account, please follow the instructions in the message we
            sent you on Discord.
          </p>
          <p>
            If you did not receive a message, please make sure you have allowed messages
            from server members in your privacy settings.
          </p>
          <p>If you still have issues, please contact support.</p>
        </div>
      </div>
    </div>
  );
}

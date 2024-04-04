import React, { useEffect, useState } from 'react';
import './discordVerificationPopup.css';
import { FaTimes } from 'react-icons/fa';
import IconLabeledButton from '../buttons/IconLabeledButton';
import { useCreateVerificationCode } from '../../utils/api/requests';

type DiscordVerificationPopupProps = {
  closeWindow: () => void;
};
export default function DiscordVerificationPopup({
  closeWindow,
}: DiscordVerificationPopupProps) {
  const [displayedVerificationCode, setDisplayedVerificationCode] = useState('');
  const { createVerificationCode, verificationCode } = useCreateVerificationCode();
  const handleGenerateVerificationCode = () => {
    createVerificationCode();
  };
  // Watch and see if there is a verification code that appeads
  useEffect(() => {
    if (verificationCode) {
      setDisplayedVerificationCode(verificationCode.verificationCode);
    }
  }, [verificationCode]);
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
          <p>To verify your Discord account, please first join the server.</p>
          <a
            href="https://discord.gg/HcSbFT2tzM"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button type="button">Join</button>
          </a>
          <p>
            Then, send direct message to the bot using the /verify command with your
            verification code.
          </p>
          <button
            type="button"
            onClick={handleGenerateVerificationCode}
          >
            Generate Verification Code
          </button>
          <div className="verificationCode">
            <p>{displayedVerificationCode}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

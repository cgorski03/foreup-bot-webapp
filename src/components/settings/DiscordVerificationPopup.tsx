import React, { useEffect, useState } from 'react';
import './discordVerificationPopup.css';
import { FaTimes } from 'react-icons/fa';
import IconLabeledButton from '../buttons/IconLabeledButton';
import { useCreateVerificationCode } from '../../utils/api/requests';
import OutlinedButtonLoader from '../buttons/OutlinedButtonLoader';

function VerificationCodeChar(props: { char: string }) {
  const { char } = props;
  return (
    <div className="verificationCodeCharContainer">
      <p>{char}</p>
      <div className="verifyCharacterBase" />
    </div>
  );
}

type VerificationCodeDisplayProps = {
  verificationCode: string;
};

function VerificationCodeDisplay(props: VerificationCodeDisplayProps) {
  const { verificationCode } = props;
  // Create an array of 5 empty characters so it will show blank
  let codeArray: string[] = ['', '', '', '', ''];
  // Check if there is a verification code
  if (verificationCode.length !== 0) {
    // Split the verification code into an array of characters
    codeArray = verificationCode.split('');
  }
  return (
    <div className="verificationCodeContainer">
      {codeArray.map((char) => (
        <VerificationCodeChar
          key={Math.random()}
          char={char}
        />
      ))}
    </div>
  );
}

type DiscordVerificationPopupProps = {
  closeWindow: () => void;
};

export default function DiscordVerificationPopup({
  closeWindow,
}: DiscordVerificationPopupProps) {
  const [displayedVerificationCode, setDisplayedVerificationCode] = useState('');
  const { createVerificationCode, verificationCode, verificationCodeLoading } =
    useCreateVerificationCode();
  const handleGenerateVerificationCode = () => {
    createVerificationCode();
  };
  // Watch and see if there is a verification code that appeads
  useEffect(() => {
    if (verificationCode) {
      setDisplayedVerificationCode(verificationCode.verification_code);
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
            aria-label="Join Discord Server"
          >
            <OutlinedButtonLoader
              onClick={() => {}}
              loading={false}
              buttonText="Join"
              classOverride="connectDiscordButton"
            />
          </a>
          <p>
            Then, send direct message to the bot using the /verify command with your
            verification code.
          </p>
          <OutlinedButtonLoader
            onClick={handleGenerateVerificationCode}
            loading={verificationCodeLoading}
            buttonText="Generate Verification Code"
            classOverride="connectDiscordButton"
          />
          <VerificationCodeDisplay verificationCode={displayedVerificationCode} />
        </div>
      </div>
    </div>
  );
}

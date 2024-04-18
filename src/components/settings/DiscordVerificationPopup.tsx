import React, { useEffect, useState } from 'react';
import './discordVerificationPopup.css';
import { FaTimes, FaDiscord, FaCopy, FaCheck } from 'react-icons/fa';
import { CopyToClipboard } from 'react-copy-to-clipboard';
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
  let codeArray: string[] = ['', '', '', '', '', ''];
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
  const [displayedVerificationCode, setDisplayedVerificationCode] = useState<string>('');
  const { createVerificationCode, verificationCode, verificationCodeLoading } =
    useCreateVerificationCode();
  const [verificationCodeClipboard, setVerificationCodeClipboard] =
    useState<Boolean>(false);
  const handleVerificationCodeCopy = () => {
    setVerificationCodeClipboard(true);
  };
  const handleGenerateVerificationCode = () => {
    createVerificationCode();
  };
  // Watch and see if there is a verification code that appeads
  useEffect(() => {
    if (verificationCode) {
      setDisplayedVerificationCode(verificationCode.verification_code);
    }
    setVerificationCodeClipboard(false);
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
          <h1 className="discordIconHeaderFormatting">
            <FaDiscord />
          </h1>
          <h1 className="verifyInstructionsText">Join the server</h1>
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
          <h1 className="verifyInstructionsText">Direct message TTimeBot using /verify</h1>
          <div className="verificationCodeDisplayAndButtons">
            <VerificationCodeDisplay verificationCode={displayedVerificationCode} />
            <div className="generateAndCopyButtonContainer">
              <OutlinedButtonLoader
                onClick={handleGenerateVerificationCode}
                loading={verificationCodeLoading}
                buttonText="Generate Verification Code"
                classOverride="connectDiscordButton"
              />
              <CopyToClipboard text={displayedVerificationCode}>
                <OutlinedButtonLoader
                  onClick={handleVerificationCodeCopy}
                  loading={false}
                  // Want to show that the verificaiton code has been copied
                  buttonText={verificationCodeClipboard ? <FaCheck /> : <FaCopy />}
                  classOverride="connectDiscordButton"
                />
              </CopyToClipboard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

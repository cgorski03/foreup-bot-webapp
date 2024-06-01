import React, { useEffect, useState } from 'react';
import './discordVerificationPopup.css';
import { FaTimes, FaDiscord, FaCopy, FaCheck } from 'react-icons/fa';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import IconLabeledButton from '../buttons/IconLabeledButton';
import { useCreateVerificationCode } from '../../utils/api/requests';
// @ts-ignore
import { ReactComponent as Loader } from '../login/spinner.svg';

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
          <div className="flex-c">
            <h1 className="discordIconHeaderFormatting">
              <FaDiscord />
            </h1>
            <a
              href="https://github.com/cgorski03/foreup-bot-webapp/blob/main/instructions/connect_discord.md"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Join Discord Server"
              style={{}}
            >
              <p
                className="verifyInstructionsText"
                style={{ fontSize: 13 }}
              >
                Instructions can be found here
              </p>
            </a>
            <h1 className="verifyInstructionsText">Join the server</h1>
            <a
              href="https://discord.gg/HcSbFT2tzM"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Join Discord Server"
              style={{ textDecoration: 'none' }}
            >
              <button
                className="d-button-style discordPopupButtonStyles"
                onClick={() => {}}
                type="submit"
              >
                Join Server
              </button>
            </a>
          </div>
          <div className="verificationCodeDisplayAndButtons">
            <h1
              className="verifyInstructionsText"
              style={{ margin: 0 }}
            >
              Your Verification Code:
            </h1>
            <VerificationCodeDisplay verificationCode={displayedVerificationCode} />
            <div className="generateAndCopyButtonContainer">
              <button
                className="d-button-style discordPopupButtonStyles"
                onClick={handleGenerateVerificationCode}
                type="submit"
                style={{ flex: '1' }}
              >
                {verificationCodeLoading ? (
                  <span className="seachIconLoaderWrapper">
                    <Loader />
                  </span>
                ) : (
                  'Generate'
                )}
              </button>

              <CopyToClipboard text={displayedVerificationCode}>
                <button
                  className="d-button-style copyVerificationCodeButtonStyles"
                  onClick={handleVerificationCodeCopy}
                  type="submit"
                >
                  {verificationCodeClipboard ? <FaCheck /> : <FaCopy />}
                </button>
              </CopyToClipboard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

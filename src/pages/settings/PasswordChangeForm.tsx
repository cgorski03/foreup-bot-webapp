import React, { useState } from 'react';
import { FaPersonFallingBurst } from 'react-icons/fa6';

interface ButtonPosition {
  x: number;
  y: number;
}

export default function PasswordChangeForm() {
  const [buttonPosition, setButtonPosition] = useState<ButtonPosition | null>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const buttonWidth = 200; // Adjust this value based on your button's width
    const buttonHeight = 40; // Adjust this value based on your button's height

    const randomX = Math.floor(Math.random() * (viewportWidth - buttonWidth));
    const randomY = Math.floor(Math.random() * (viewportHeight - buttonHeight));

    setButtonPosition({ x: randomX, y: randomY });
  };

  return (
    <div className="settingsFieldContainer">
      <span className="settingLabel">Password Change Coming Soon!</span>
      <div className="testMessageContainer">
        <button
          className="testMessageButton NagMeButton"
          onClick={() => console.log('Test')}
          type="submit"
          onMouseEnter={handleMouseEnter}
          style={{
            position: isHovered ? 'absolute' : 'static',
            left: buttonPosition ? `${buttonPosition.x}px` : 'auto',
            top: buttonPosition ? `${buttonPosition.y}px` : 'auto',
          }}
        >
          <FaPersonFallingBurst className="settingValueIcon" />
          <span>Click Here to Nag Me</span>
        </button>
      </div>
    </div>
  );
}

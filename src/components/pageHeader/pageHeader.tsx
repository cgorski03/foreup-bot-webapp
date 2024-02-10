import React, { useState } from "react";
import { IoLogOut } from "react-icons/io5";
import "./pageHeader.css";
import { PageLabel } from "./pageLabel/PageLabel";
import { useNavigate } from "react-router-dom";
import { useSignOut } from "../../utils/hooks/useSignOut";

export const PageHeader = () => {
  const [selectedButton, setSelectedButton] = useState<number>(0);
  const { logOut } = useSignOut();
  const navigate = useNavigate()
  const handleNavButtonClick = (buttonValue: number) => {
    if (buttonValue === 3) {
      logOut().then((success) => {
        if (!success) {
          console.log("Error signing out");
        }
      });
    } else {
      // handle sign out action
      setSelectedButton(buttonValue);
      switch (buttonValue){
        case 0:
          navigate('/search');
          break;
        case 1:
          navigate('/dashboard');
          break;
        case 2:
          navigate('/settings');
          break;
        default:
          break;
      }
    }
  };

  return (
    <div className="pageHeaderContainer">
      <img src="/images/golf_bot_image.jpeg" className="headerLogo" alt="app" />
      <PageLabel
        buttonLabel="Search"
        buttonValue={0}
        handleButtonClick={handleNavButtonClick}
        isSelectedPage={selectedButton === 0}
      />
      <PageLabel
        buttonLabel="Dashboard"
        buttonValue={1}
        handleButtonClick={handleNavButtonClick}
        isSelectedPage={selectedButton === 1}
      />
      <PageLabel
        buttonLabel="Settings"
        buttonValue={2}
        handleButtonClick={handleNavButtonClick}
        isSelectedPage={selectedButton === 2}
      />
      <PageLabel
        buttonLabel={<IoLogOut />}
        buttonValue={3}
        handleButtonClick={handleNavButtonClick}
        isSelectedPage={selectedButton === 3}
      />
    </div>
  );
};

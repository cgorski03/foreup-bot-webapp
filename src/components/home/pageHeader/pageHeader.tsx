import React, { useState } from "react";
import { IoLogOut } from "react-icons/io5";
import "./pageHeader.css";
import { PageLabel } from "./pageLabel/PageLabel";
import { useNavigate } from "react-router-dom";
import { useSignOut } from "../../../utils/authFunctions/useSignOut";

export const PageHeader = () => {
  const [selectedButton, setSelectedButton] = useState<number>(0);
  const handleNavButtonClick = (buttonValue: number) => {
    setSelectedButton(buttonValue);
    if(buttonValue === 3){
      useSignOut().then((result) => {
        if(!result){
          console.log("Error signing out")
        }
      })
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

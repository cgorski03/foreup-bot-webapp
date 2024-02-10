import React, { useContext } from "react";
import { IoLogOut } from "react-icons/io5";
import "./pageHeader.css";
import { PageLabel } from "./pageLabel/PageLabel";
import { useNavigate, useLocation } from "react-router-dom";
import { useSignOut } from "../../utils/hooks/useSignOut";
import { UserInformationContext } from "../../Contexts/UserContext";

export const PageHeader = () => {
  const { userInfo }  = useContext(UserInformationContext);
  const { logOut } = useSignOut();
  const navigate = useNavigate();
  const location = useLocation();
  if(!userInfo){
    return null;
  }
  const handleNavButtonClick = (buttonValue: number) => {
    if (buttonValue === 3) {
      logOut().then((success) => {
        if (!success) {
          console.log("Error signing out");
        }
      });
    } else {
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
        isSelectedPage={location.pathname === "/search"}
      />
      <PageLabel
        buttonLabel="Dashboard"
        buttonValue={1}
        handleButtonClick={handleNavButtonClick}
        isSelectedPage={location.pathname === "/dashboard"}
      />
      <PageLabel
        buttonLabel="Settings"
        buttonValue={2}
        handleButtonClick={handleNavButtonClick}
        isSelectedPage={location.pathname === "/settings"}
      />
      <PageLabel
        buttonLabel={<IoLogOut />}
        buttonValue={3}
        handleButtonClick={handleNavButtonClick}
        isSelectedPage={location.pathname === ""}
      />
    </div>
  );
};

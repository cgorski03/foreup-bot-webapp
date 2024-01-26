import "./Navbar.css";
import React, { useContext } from "react";
import { IoMenu } from "react-icons/io5";
import { IoMdHome } from "react-icons/io";
import { IoIosSettings } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import { useState } from "react";
import { handleSignOut } from "../../../utils/authFunctions/handleSignOut";
import CollapsedButton from "./button-collapsed/CollapsedButton";
import { useNavigate } from "react-router-dom";
import { UserInformationContext } from "../../../Contexts/UserContext";

const Navbar = () => {
  const { setUserInfo } = useContext(UserInformationContext);
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const HandleExpandButtonClick = () => {
    setIsExpanded(!isExpanded);
  };
  const HandleHomeButtonClick = () => {
    navigate("/home");
  };
  const HandleSettingsButtonClick = () => {
    //The settings page does not exist yet
    // navigate('/settings');
    alert("The settings page has not been implemented yet");
  };

  const HandleSignOutButtonClick = () => {
    console.log("trying to sign out");
    handleSignOut();
    setUserInfo &&
      setUserInfo({
        name: undefined,
        email: undefined,
        email_verified: undefined,
      });
    window.location.reload();
  };

  return (
    <div
      id="leftApplicationNavigationBar"
      style={{ width: !isExpanded ? 85 : 300 }}>
      <CollapsedButton
        onClick={HandleExpandButtonClick}
        icon={<IoMenu />}
        content=""
        isExpanded={isExpanded}
      />
      <CollapsedButton
        onClick={HandleHomeButtonClick}
        icon={<IoMdHome />}
        content="Home"
        isExpanded={isExpanded}
      />
      <CollapsedButton
        onClick={HandleSettingsButtonClick}
        icon={<IoIosSettings />}
        content="Settings"
        isExpanded={isExpanded}
      />
      <CollapsedButton
        onClick={HandleSignOutButtonClick}
        icon={<IoLogOut />}
        content="Sign Out"
        isExpanded={isExpanded}
      />
    </div>
  );
};

export default Navbar;

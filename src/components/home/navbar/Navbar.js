import './Navbar.css'
import { IoMenu } from "react-icons/io5";
import { IoMdHome } from "react-icons/io";
import { IoIosSettings } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import { useState } from 'react';
import handleSignout from '../../../utils/authFunctions/handleSignOut';
import CollapsedButton from './button-collapsed/CollapsedButton';
import { useNavigate  } from 'react-router-dom';

const Navbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate(); 
  
  const HandleExpandButtonClick = () =>{
    setIsExpanded(!isExpanded);
  }
  const HandleHomeButtonClick = () =>{
    navigate('/home');
  }
  const HandleSettingsButtonClick = () =>{
    //The settings page does not exist yet
    // navigate('/settings');
    alert("The settings page has not been implemented yet")
  }
  
  const HandleSignOutButtonClick = () => {
    console.log("trying to sign out");
    handleSignout();
    window.location.reload(true);
  }

  return (
    <div id="leftApplicationNavigationBar" style={{width: !isExpanded ? 85 : 300}}>
      <CollapsedButton 
        onClick={HandleExpandButtonClick}
        content={[<IoMenu />, ""]}
        isExpanded={isExpanded}
        />
      <CollapsedButton 
        onClick={HandleHomeButtonClick}
        content={[<IoMdHome />, "Home"]}
        isExpanded={isExpanded}
        />
      <CollapsedButton 
        onClick={HandleSettingsButtonClick}
        content={[<IoIosSettings />, "Settings"]}
        isExpanded={isExpanded}
        />
      <CollapsedButton 
        onClick={HandleSignOutButtonClick}
        content={[<IoLogOut />, "Sign Out"]}
        isExpanded={isExpanded}
        />
    </div>
  )
}

export default Navbar
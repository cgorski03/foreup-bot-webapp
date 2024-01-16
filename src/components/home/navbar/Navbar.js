import './Navbar.css'
import { IoMenu } from "react-icons/io5";
import { IoMdHome } from "react-icons/io";
import {useState} from 'react';
import CollapsedButton from './button-collapsed/CollapsedButton';

const Navbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const HandleExpandButtonClick = () =>{
    setIsExpanded(!isExpanded);
  }
  const HandleHomeButtonClick = () =>{
    //This is temporary mock logic before real logic is implemented
    alert("You are being redirected to the home page!");
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
    </div>
  )
}

export default Navbar
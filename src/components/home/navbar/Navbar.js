import './Navbar.css'
import {FaAlignJustify} from 'react-icons/fa';
import CollapsedButton from './button-collapsed/CollapsedButton';
const HandleExpandButtonClick = () =>[
  //This is temporary mock logic before real logic is implemented
  console.log("Expansion trigger was pressed,")
]
const Navbar = () => {
  return (
    <div id="leftApplicationNavigationBar">
      <CollapsedButton 
        onClick={HandleExpandButtonClick}
        content={<FaAlignJustify />}
        />
    </div>
  )
}

export default Navbar
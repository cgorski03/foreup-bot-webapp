import React, { useState } from "react";
import { labelValuePair } from "../../../utils/types/labelValuePair";
import "./dropdownMenu.css";
type DropdownMenuProps = {
  options: labelValuePair[];
  onSelect: (selected: labelValuePair) => void;
};
const DropdownMenu = (props: DropdownMenuProps) => {
  const { options, onSelect } = props;
  const [selectedOption, setSelectedOption] = useState<labelValuePair | null>(
    options? options[0] : null
  );
  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const handleOptionClick = (option: labelValuePair) => {
    setSelectedOption(option);
    setDropdownOpen(false);
    onSelect(option);
  };

  return (
    <div className="dropdownContainer">
      <div
        className={"dropdownToggleBoxCollapsed " + (isDropdownOpen ? "dropdownExpandedState" : "")}
        onClick={() => setDropdownOpen(!isDropdownOpen)}>
        {selectedOption ? selectedOption.label : "Select an option"}
      </div>
      {isDropdownOpen && (
        <ul className="dropdownMenuExpanded">
          {options.map((option) => (
            <li
              className="dropdownOption"
              key={option.value}
              value={selectedOption ? selectedOption.value: ''}
              onClick={() => handleOptionClick(option)}>
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownMenu;

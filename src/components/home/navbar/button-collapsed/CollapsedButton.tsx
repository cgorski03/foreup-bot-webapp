import React from "react";
import "./CollapsedButton.css";

type CollapsedButtonProps = {
  onClick: () => void;
  icon: JSX.Element;
  content: string;
  isExpanded: boolean;
};

const CollapsedButton = (props: CollapsedButtonProps) => {
  const { onClick, icon, content, isExpanded } = props;

  return (
    <button id="navButtonClickable" onClick={onClick}>
      {!isExpanded ? (
        <div className="collapsedIconStyling">{icon}</div>
      ) : (
        <div className="expandedButtonStyling">
          <div className="expandedIconStyling">{icon}</div>
          <div className="expandedTextStyling">{content}</div>
        </div>
      )}
    </button>
  );
};

export default CollapsedButton;

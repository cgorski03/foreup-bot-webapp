import "./pageLabel.css";
import React from "react";

type PageLabelProps = {
  handleButtonClick: (value: number) => void;
  isSelectedPage: boolean;
  buttonLabel: string | JSX.Element;
  buttonValue: number;
};
export const PageLabel = (props: PageLabelProps) => {
  const { handleButtonClick, isSelectedPage, buttonLabel, buttonValue } = props;
  return (
    <div className="labelContainer">
      <button
        onClick={
          isSelectedPage ? () => {} : () => handleButtonClick(buttonValue)
        }
        className={"navHeaderButton"}>
        {buttonLabel}
      </button>
      <div
        className={
          "currentPageUnderline " +
          (isSelectedPage ? "selectedPageUnderline" : "")
        }
      />
    </div>
  );
};

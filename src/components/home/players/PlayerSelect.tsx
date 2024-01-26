import React, { useState } from "react";
import './playerSelect.css'

type PlayerSelectProps = {
  onPlayerSelectChange: (players: number) => void;
};
export const PlayerSelect = (props: PlayerSelectProps) => {
  const { onPlayerSelectChange } = props;
  const [selectedPlayerCount, setSelectedPlayerCount] = useState<number>(4);

  const handleButtonClick = (buttonId: number) => {
    setSelectedPlayerCount(buttonId);
    onPlayerSelectChange(buttonId);
  };
  return (
    <div className="playerCountSelectContainer">
      <div
        className={
          "playerCountButton " +
          (selectedPlayerCount === 1 ? "activePlayerCount" : "")
        }
        onClick={() => handleButtonClick(1)}>
        1
      </div>
      <div
        className={
          "playerCountButton " +
          (selectedPlayerCount === 2 ? "activePlayerCount" : "")
        }
        onClick={() => handleButtonClick(2)}>
        2
      </div>
      <div
        className={
          "playerCountButton " +
          (selectedPlayerCount === 3 ? "activePlayerCount" : "")
        }
        onClick={() => handleButtonClick(3)}>
        3
      </div>
      <div
        className={
          "playerCountButton " +
          (selectedPlayerCount === 4 ? "activePlayerCount" : "")
        }
        onClick={() => handleButtonClick(4)}>
        4
      </div>
    </div>
  );
};

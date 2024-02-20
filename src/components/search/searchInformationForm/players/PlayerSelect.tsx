import React, { useState } from 'react';
import './playerSelect.css';

type PlayerSelectProps = {
  onPlayerSelectChange: (players: number) => void;
};
function PlayerSelect(props: PlayerSelectProps) {
  const { onPlayerSelectChange } = props;
  const [selectedPlayerCount, setSelectedPlayerCount] = useState<number>(4);

  const handleButtonClick = (buttonId: number) => {
    setSelectedPlayerCount(buttonId);
    onPlayerSelectChange(buttonId);
  };
  return (
    <div className="playerSelectComponentContainer">
      <h1 className="inputFieldLabel">Available Spots:</h1>
      <div className="playerCountSelectContainer">
        <button
          className={`playerCountButton ${selectedPlayerCount === 1 ? 'activePlayerCount' : ''}`}
          type="button"
          onClick={() => handleButtonClick(1)}
        >
          1
        </button>
        <button
          className={`playerCountButton ${selectedPlayerCount === 2 ? 'activePlayerCount' : ''}`}
          type="button"
          onClick={() => handleButtonClick(2)}
        >
          2
        </button>
        <button
          className={`playerCountButton ${selectedPlayerCount === 3 ? 'activePlayerCount' : ''}`}
          type="button"
          onClick={() => handleButtonClick(3)}
        >
          3
        </button>
        <button
          className={`playerCountButton ${selectedPlayerCount === 4 ? 'activePlayerCount' : ''}`}
          type="button"
          onClick={() => handleButtonClick(4)}
        >
          4
        </button>
      </div>
    </div>
  );
}

export default PlayerSelect;

import React from 'react';
import './timePicker.css';

type TimePickerProps = {
  selectedStartTime: string;
  setSelectedStartTime: (time: string) => void;
  selectedEndTime: string;
  setSelectedEndTime: (time: string) => void;
};
function TimePicker(props: TimePickerProps) {
  const { selectedStartTime, setSelectedStartTime, selectedEndTime, setSelectedEndTime } =
    props;
  return (
    <div className="playerSelectComponentContainer">
      <h1 className="inputFieldLabel">Time Range:</h1>
      <div className="timePickerContainer">
        <input
          className="timePickerInput startTimeInputBox"
          type="time"
          value={selectedStartTime}
          onChange={(time: React.ChangeEvent<HTMLInputElement>) =>
            setSelectedStartTime(time.target.value)}
        />
        -
        <input
          className="timePickerInput endTimeInputBox"
          type="time"
          value={selectedEndTime}
          onChange={(time: React.ChangeEvent<HTMLInputElement>) =>
            setSelectedEndTime(time.target.value)}
        />
      </div>
    </div>
  );
}

export default TimePicker;

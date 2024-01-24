import React, { useState } from "react";
import "./timePicker.css";

type TimePickerProps = {
  onStartTimeChange: (time: string) => void;
  onEndTimeChange: (time: string) => void;
};
const TimePicker = (props: TimePickerProps) => {
  const {onStartTimeChange, onEndTimeChange } = props;
  const [selectedStartTime, setSelectedStartTime] = useState<string>('06:00');
  const [selectedEndTime, setSelectedEndTime] = useState<string>('22:00');

  const handleStartTimeSelection = (time:React.ChangeEvent<HTMLInputElement>):void => {
    //notify the parent component 
    //will prevent constant rerendering of dom by not having the state attached
    setSelectedStartTime(time.target.value);
    onStartTimeChange(time.target.value);
  }
  const handleEndTimeSelection = (time:React.ChangeEvent<HTMLInputElement>):void => {
    //notify the parent component 
    //will prevent constant rerendering of dom by not having the state attached
    setSelectedEndTime(time.target.value);
    onEndTimeChange(time.target.value);
  }

  return (
    <div className="timePickerContainer">
      <input 
        className="timePickerInput startTimeInputBox"
        type="time" 
        value={selectedStartTime}
        onChange={handleStartTimeSelection}
        />
      -
      <input 
        className="timePickerInput endTimeInputBox"
        type="time" 
        value={selectedEndTime}
        onChange={handleEndTimeSelection}
        />
    </div>
  );
};

export default TimePicker;

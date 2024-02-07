import React, { useState, useContext } from "react";
import Calendar from "../calendar/Calendar";
import { PlayerSelect } from "../players/PlayerSelect";
import TimePicker from "../timePicker/TimePicker";
import OutlinedButtonLoader from "../../buttons/OutlinedButtonLoader";
import "./searchInformationForm.css";
import { GolfCourse } from "../../../utils/api/types";

type SearchInfoFormProps = {
  course: GolfCourse | null;
};
export const SearchInfoForm = ({ course }: SearchInfoFormProps) => {
  //Initially blank, will have logic to show hide other info
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  //logic for the preset start time - based on sunrise? Might be overthinking that maybe just like 6 am haha
  const [selectedStartTime, setSelectedStartTime] = useState<string>("08:00");
  const [selectedEndTime, setSelectedEndTime] = useState<string>("22:00");
  const [selectedPlayerCount, setSelectedPlayerCount] = useState<number>(4);
  const [searchLoading, setSearchLoading] = useState<boolean>(false);

  const handleDateSelection = (date: Date): void => {
    setSelectedDate(date);
    console.log(date);
  };
  const handleTimeChange = (timeID: number, time: string): void => {
    //Mock logic with console.log
    timeID ? setSelectedEndTime(time) : setSelectedStartTime(time);
    console.log(time);
  };

  const handlePlayerSelectChange = (players: number): void => {
    //Mock logic with console.log
    setSelectedPlayerCount(players);
    console.log(players);
  };
  const handleSearchEvent = (): void => {
    console.log("The user wants to start a search");
  };
  return (
    <div id="searchDetailsContainer">
      <div className="halfWidthInfoBlock leftHalfInfoBlock">
        <Calendar
          onSelectedDateChange={handleDateSelection}
          courseEndDate={
            course
              ? new Date(
                  new Date().setDate(
                    new Date().getDate() + course.maxBookingDays
                  )
                )
              : null
          }
        />
      </div>
      <div className="halfWidthInfoBlock rightHalfInfoBlock">
        <div className="searchCriteriaContainer">
          <TimePicker onTimeChange={handleTimeChange} />
          <PlayerSelect onPlayerSelectChange={handlePlayerSelectChange} />
          <OutlinedButtonLoader
            classOverride="searchButtonHomePage"
            buttonText="Start Search"
            onClick={handleSearchEvent}
            loading={searchLoading}
          />
        </div>
      </div>
    </div>
  );
};

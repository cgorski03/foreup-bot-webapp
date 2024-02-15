import React, { useState } from "react";
import "./searchInformationForm.css";
import Calendar from "./calendar/Calendar";
import { PlayerSelect } from "./players/PlayerSelect";
import { TimePicker } from "./timePicker/TimePicker";
import OutlinedButtonLoader from "../../buttons/OutlinedButtonLoader";
import { GolfCourse, CreateSearchInput } from "../../../utils/api/types";
import { useCreateSearch } from "../../../utils/api/requests";
import { StartSearchErrorMessage } from "../../login/message/ErrorMessage";

type SearchInfoFormProps = {
  course: GolfCourse | null;
};
export const SearchInfoForm = ({ course }: SearchInfoFormProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedStartTime, setSelectedStartTime] = useState<string>("08:00");
  const [selectedEndTime, setSelectedEndTime] = useState<string>("22:00");
  const [selectedPlayerCount, setSelectedPlayerCount] = useState<number>(4);
  const [error, setError] = useState<string>("");
  const { createSearch, isLoading, response } = useCreateSearch();

  const handleDateSelection = (date: Date): void => {
    setSelectedDate(date);
  };
  const handleTimeChange = (timeID: number, time: string): void => {
    timeID ? setSelectedEndTime(time) : setSelectedStartTime(time);
  };

  const handlePlayerSelectChange = (players: number): void => {
    setSelectedPlayerCount(players);
  };
  const handleSearchEvent = async () => {
    if (course && selectedStartTime < selectedEndTime) {
      const search: CreateSearchInput = {
        course_id: course?.course_id,
        courseName: course?.courseName,
        date: selectedDate
          .toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })
          .replace(/\//g, "-"),
        players: selectedPlayerCount,
        startTime: selectedStartTime,
        endTime: selectedEndTime,
      };
      await createSearch(search);
      if (!response || Math.floor(response / 100) === 2) {
        //api request error case
        setError("requestError");
      }
    } else {
      !course ? setError("noCourse") : setError("startTooLate");
    }
  };
  return (
    <div
      id="searchDetailsContainer"
      onClick={() => (error ? setError("") : null)}>
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
          <StartSearchErrorMessage error={error} />
          <OutlinedButtonLoader
            classOverride="searchButtonHomePage"
            buttonText="Start Search"
            onClick={handleSearchEvent}
            loading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

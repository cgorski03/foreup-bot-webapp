import React, { useState, useContext } from 'react';
import './searchInformationForm.css';
import { FaSearch } from 'react-icons/fa';
import Calendar from './calendar/Calendar';
import PlayerSelect from './players/PlayerSelect';
import TimePicker from './timePicker/TimePicker';
// import OutlinedButtonLoader from '../../buttons/OutlinedButtonLoader';
import { GolfCourse, CreateSearchInput } from '../../../utils/api/types';
import { useCreateSearch } from '../../../utils/api/requests';
import { StartSearchResponseMessage } from '../../login/message/ErrorMessage';
import { UserInformationContext } from '../../../Contexts/UserContext';

type SearchInfoFormProps = {
  course: GolfCourse | null;
};

function SearchInfoForm({ course }: SearchInfoFormProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedStartTime, setSelectedStartTime] = useState<string>('08:00');
  const [selectedEndTime, setSelectedEndTime] = useState<string>('22:00');
  const [selectedPlayerCount, setSelectedPlayerCount] = useState<number>(4);
  const [responseMessage, setResponseMessage] = useState<string>('');
  const { createSearch, isLoading, responseCode } = useCreateSearch();
  const { userInfo } = useContext(UserInformationContext);
  const handleDateSelection = (date: Date): void => {
    setSelectedDate(date);
  };

  const handleTimeChange = (timeID: number, time: string): void => {
    // start time will have timeid of 0
    if (!timeID) {
      setSelectedStartTime(time);
    } else {
      setSelectedEndTime(time);
    }
  };

  const handlePlayerSelectChange = (players: number): void => {
    setSelectedPlayerCount(players);
  };

  const handleSearchEvent = async () => {
    console.log(userInfo);
    console.log(isLoading);
    if (!course || selectedStartTime > selectedEndTime) {
      // early return if not all conditions are complete
      if (!course) {
        setResponseMessage('noCourse');
      } else {
        setResponseMessage('startTooLate');
      }
      return;
    }
    const search: CreateSearchInput = {
      course_id: course?.course_id,
      courseName: course?.courseName,
      date: selectedDate
        .toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
        .replace(/\//g, '-'),
      players: selectedPlayerCount,
      startTime: selectedStartTime,
      endTime: selectedEndTime,
    };
    await createSearch(search);
    if (responseCode && Math.floor(responseCode / 100) !== 2) {
      // Check if it is because of too many searches
      setResponseMessage('requestError');
    } else {
      setResponseMessage('success');
    }
  };

  return (
    <div className="searchDetailsContainer">
      <div className="halfWidthInfoBlock leftHalfInfoBlock">
        <Calendar
          onSelectedDateChange={handleDateSelection}
          courseEndDate={
            course
              ? new Date(new Date().setDate(new Date().getDate() + course.maxBookingDays))
              : null
          }
        />
      </div>
      <div className="halfWidthInfoBlock rightHalfInfoBlock">
        <div className="searchCriteriaContainer">
          <TimePicker onTimeChange={handleTimeChange} />
          <PlayerSelect onPlayerSelectChange={handlePlayerSelectChange} />
          <StartSearchResponseMessage message={responseMessage} />
          <button
            className="start-search-button"
            onClick={handleSearchEvent}
            disabled={false}
            type="submit"
          >
            <span className="search-icon">
              <FaSearch />
            </span>
            <span className="button-text"> Search</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchInfoForm;

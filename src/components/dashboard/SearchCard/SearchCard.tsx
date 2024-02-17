import React from 'react';
import './searchTableLabel.css';
import { UserSearchInfo } from '../../../utils/api/types';
import { SearchCardHeader } from './SearchCardHeader/SearchCardHeader';
import {
  convertTo12Hour,
  expandDate,
} from '../../../utils/dateExpansion/datetimeFunctions';
import { FaCalendar, FaClock } from 'react-icons/fa';
import { MdPerson } from 'react-icons/md';
import { OutlinedButtonLoader } from '../../buttons/OutlinedButtonLoader';
import { useGetCourses } from '../../../utils/api/requests';

type SearchCardProps = {
  search: UserSearchInfo;
};
export const SearchCard = ({ search }: SearchCardProps) => {
  const { isLoading } = useGetCourses();
  const handleSeachCancel = (): void => {};
  return (
    <div className="searchCardContainer">
      <SearchCardHeader
        active={search.active}
        lastSearchCheck={search.lastSearchCheck}
        searchInitiated={search.searchInitiated}
        search_id={search.search_id}
      />
      <div className="searchCardBody">
        <div className="imageTitleContainer">
          <h1 className="searchTitle">{search.courseName}</h1>
          <img
            alt={search.courseName}
            src="https://golf-pass.brightspotcdn.com/84/d7/100e740f29027022c74a55eeb9f1/75692.jpg"
            className="golfCourseImagePreview"
          />
        </div>
        <div className="rightHalfCardBody">
          <div className="searchCardParameters">
            <div className="headerLabelContainer">
              <p>
                <FaCalendar className="labelIcon" /> DATE
              </p>
              <p>{expandDate({ date: search.date, dayOfWeek: true })}</p>
            </div>
            <div className="headerLabelContainer">
              <p>
                <FaClock className="labelIcon" />
                TIME RANGE
              </p>
              <p>
                {convertTo12Hour(search.startTime)} -{' '}
                {convertTo12Hour(search.endTime)}
              </p>
            </div>
            <div className="headerLabelContainer">
              <p>
                <MdPerson className="" />
                PLAYERS
              </p>
              <p>{search.players}</p>
            </div>
          </div>
          <div className="searchActionsContainer">
            <OutlinedButtonLoader
              classOverride="editSearchButton"
              buttonText="Edit"
              onClick={handleSeachCancel}
              loading={isLoading}
            />
            <OutlinedButtonLoader
              classOverride="cancelSearchButton"
              buttonText="Cancel"
              onClick={handleSeachCancel}
              loading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

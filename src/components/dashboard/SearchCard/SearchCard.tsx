import React from 'react';
import './searchTableLabel.css';
import { FaCalendar, FaClock } from 'react-icons/fa';
import { MdPerson } from 'react-icons/md';
import { UserSearchInfo } from '../../../utils/api/types';
import { SearchCardHeader } from './SearchCardHeader/SearchCardHeader';
import {
  convertTo12Hour,
  expandDate,
} from '../../../utils/dateExpansion/datetimeFunctions';
import OutlinedButtonLoader from '../../buttons/OutlinedButtonLoader';

type SearchCardProps = {
  search: UserSearchInfo;
  image: string;
};
function SearchCard({ search, image }: SearchCardProps) {
  // mock isLoading until the delete search functionality is actually implemented
  const isLoading: boolean = false;
  const handleSeachCancel = (): void => {};
  return (
    <div className="searchCardContainer">
      <SearchCardHeader
        active={search.active}
        lastSearchCheck={search.heartbeat}
        searchInitiated={search.searchInitiated}
        searchId={search.ID}
      />
      <div className="searchCardBody">
        <div className="imageTitleContainer">
          <h1 className="searchTitle">{search.courseName}</h1>
          <img
            alt={search.courseName}
            src={image}
            className="golfCourseImagePreview"
          />
        </div>
        <div className="rightHalfCardBody">
          <div className="searchCardParameters">
            <div className="headerLabelContainer">
              <p>
                <FaCalendar className="labelIcon" />
                DATE
              </p>
              <p>{expandDate({ date: search.date, dayOfWeek: true })}</p>
            </div>
            <div className="headerLabelContainer">
              <p>
                <FaClock className="labelIcon" />
                TIME RANGE
              </p>
              <p>
                {convertTo12Hour(search.start)}
                -
                {convertTo12Hour(search.end)}
              </p>
            </div>
            <div className="headerLabelContainer">
              <p>
                <MdPerson style={{ margin: '0' }} />
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
}

export default SearchCard;

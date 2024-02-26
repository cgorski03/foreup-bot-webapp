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
import { useCancelSearch, useDeleteSearch } from '../../../utils/api/requests';

type SearchCardProps = {
  search: UserSearchInfo;
  image: string;
  refreshSearches: () => void;
  refreshLoading: boolean;
};
function SearchCard({ search, image, refreshSearches, refreshLoading }: SearchCardProps) {
  // mock isLoading until the delete search functionality is actually implemented
  const isLoading: boolean = false;
  const { deleteSearch, deleteLoading, deleteResponse } = useDeleteSearch();
  const { cancelSearch, cancelLoading, cancelResponse } = useCancelSearch();
  const handleSearchKill = async (): Promise<void> => {
    // logic is different depending on if the search is active
    if (!search.active) {
      await deleteSearch({ search_id: search.ID });
      if (deleteResponse && deleteResponse !== 200) {
        console.log('There has been an error deleting the search');
      }
    } else {
      await cancelSearch({ search_id: search.ID });
      if (cancelResponse && cancelResponse !== 200) {
        console.log('There has been an error cancelling the search');
      }
    }
    refreshSearches();
  };
  return (
    <div className={`searchCardContainer ${refreshLoading ? 'cardRefreshLoading' : ''}`}>
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
                {convertTo12Hour(search.start)}-{convertTo12Hour(search.end)}
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
              onClick={handleSearchKill}
              loading={isLoading}
            />
            <OutlinedButtonLoader
              classOverride="cancelSearchButton"
              buttonText={search.active ? 'Cancel' : 'Delete'}
              onClick={handleSearchKill}
              loading={deleteLoading || cancelLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchCard;

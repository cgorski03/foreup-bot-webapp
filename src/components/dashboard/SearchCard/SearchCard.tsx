import React from 'react';
import './searchTableLabel.css';
import { FaCalendar, FaClock } from 'react-icons/fa';
import { MdPerson, MdEdit, MdDelete, MdStopCircle } from 'react-icons/md';
import { UserSearchInfo } from '../../../utils/api/types';
import { SearchCardHeader } from './SearchCardHeader';
import {
  convertTo12Hour,
  expandDate,
} from '../../../utils/dateExpansion/datetimeFunctions';
import { useCancelSearch, useDeleteSearch } from '../../../utils/api/requests';

type SearchCardProps = {
  search: UserSearchInfo;
  image: string;
  refreshSearches: () => void;
  refreshLoading: boolean;
};
type IconLabeledButtonProps = {
  icon: JSX.Element;
  loading: boolean;
  onClick: () => void;
};
function IconLabeledButton(props: IconLabeledButtonProps) {
  const { onClick, loading, icon } = props;
  return (
    <div>
      <button
        type="submit"
        onClick={onClick}
        className={`iconLabeledButton ${loading && 'loading'}`}
      >
        {icon}
      </button>
    </div>
  );
}

function SearchCard({ search, image, refreshSearches, refreshLoading }: SearchCardProps) {
  // If the search was successful, times.length > 0
  // TODO Loading states and animation
  // TOOD replace the ugly stop logo
  // Include times foudn
  const { deleteSearch, deleteLoading, deleteResponse } = useDeleteSearch();
  const { cancelSearch, cancelResponse } = useCancelSearch();
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
            <IconLabeledButton
              onClick={handleSearchKill}
              icon={<MdEdit />}
              loading={false}
            />
            {search.active ? (
              <IconLabeledButton
                onClick={handleSearchKill}
                icon={<MdStopCircle />}
                loading={deleteLoading}
              />
            ) : (
              <IconLabeledButton
                onClick={handleSearchKill}
                icon={<MdDelete />}
                loading={deleteLoading}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchCard;

import React, { useContext, useEffect, useState } from 'react';
import './searchTableLabel.css';
import { FaCalendar, FaClock } from 'react-icons/fa';
import { MdPerson, MdEdit, MdDelete } from 'react-icons/md';
import { IoStop } from 'react-icons/io5';
import { UserSearchInfo } from '../../../utils/api/types';
import { SearchCardHeader } from './SearchCardHeader';
import {
  convertTo12Hour,
  expandDate,
} from '../../../utils/dateExpansion/datetimeFunctions';
import { DashboardContext } from '../../../Contexts/DashboardContext';
import {
  useCancelSearch,
  useDeleteSearch,
  useGetSearches,
} from '../../../utils/api/requests';
import IconLabeledButton from '../../buttons/IconLabeledButton';

type SearchCardProps = {
  search: UserSearchInfo;
  image: string;
};

type FoundTimeIconsProps = {
  teeTimes: string[][];
  startIndex: number;
};
function FoundTimeIcons(props: FoundTimeIconsProps) {
  // Function renders 6 tee times starting at the nth index
  const { teeTimes, startIndex } = props;
  if (!teeTimes) {
    return null;
  }
  return (
    <div className="d-flex availableTimesContainer">
      {teeTimes.slice(startIndex, 6).map((teeTime) => (
        <button
          type="submit"
          className="availableTeeTime"
          key={teeTime[0]}
        >
          <p className="timeLabelTop">{convertTo12Hour(teeTime[0])}</p>
          <p className="playerLabelBottom">{teeTime[1]}</p>
        </button>
      ))}
    </div>
  );
}

function SearchCard(props: SearchCardProps) {
  const { search, image } = props;
  const { setSearches, refreshLoading } = useContext(DashboardContext);
  const { updateCache } = useGetSearches();
  const { deleteSearch, deleteLoading, deleteResponse, updatedSeaches } = useDeleteSearch();
  const { cancelSearch, cancelLoading, cancelResponse, cancelledSearches } =
    useCancelSearch();
  const [searchDying, setSearchDying] = useState(false);

  useEffect(() => {
    if (updatedSeaches != null) {
      setSearchDying(true);
      // Update the users cache with the new info
      updateCache(updatedSeaches);
      // Update the searches shown on the users screen
      setSearches(updatedSeaches);
    }
  }, [updatedSeaches]);

  useEffect(() => {
    if (cancelledSearches != null) {
      setSearchDying(true);
      // Update the users cache with the new info
      updateCache(cancelledSearches);
      // Update the searches shown on the users screen
      setSearches(cancelledSearches);
    }
  }, [cancelledSearches]);

  const handleSearchKill = async (): Promise<void> => {
    // logic is different depending on if the search is active
    // This cancel logic must be in this component in order to be able to cancel multiple
    if (!search.active) {
      await deleteSearch({ search_id: search.ID });
      if (deleteResponse && deleteResponse !== 200) {
        console.log('There has been an error deleting the search');
      }
    } else {
      await cancelSearch({ search_id: search.ID });
      if (cancelResponse && cancelResponse !== 200) {
        // TODO: Change cancel search response to be the updated search data
        console.log('There has been an error cancelling the search');
      }
    }
  };

  return (
    <div
      className={`searchCardContainer ${searchDying && 'fadeOut'} ${refreshLoading && 'cardRefreshLoading'}`}
    >
      <SearchCardHeader
        active={search.active}
        lastSearchCheck={search.heartbeat}
        searchInitiated={search.searchInitiated}
        searchId={search.ID}
        mobile={false}
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
            <FoundTimeIcons
              teeTimes={search.times}
              startIndex={0}
            />
            <div className="d-flex searchActionIcons">
              <IconLabeledButton
                onClick={handleSearchKill}
                icon={<MdEdit />}
                loading={false}
              />
              {search.active ? (
                <IconLabeledButton
                  onClick={handleSearchKill}
                  icon={<IoStop />}
                  loading={cancelLoading}
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
    </div>
  );
}

export default SearchCard;

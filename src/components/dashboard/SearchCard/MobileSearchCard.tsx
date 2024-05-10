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
import { useCancelSearch, useDeleteSearch } from '../../../utils/api/requests';
import IconLabeledButton from '../../buttons/IconLabeledButton';

type SearchCardProps = {
  search: UserSearchInfo;
};

function MobileSearchCard(props: SearchCardProps) {
  const { search } = props;
  // TS bs
  const { setSearches, refreshLoading } = useContext(DashboardContext);
  const { deleteSearch, deleteLoading, deleteResponse, updatedSeaches } = useDeleteSearch();
  const { cancelSearch, cancelLoading, cancelResponse, cancelledSearches } =
    useCancelSearch();
  const [searchDying, setSearchDying] = useState(false);

  useEffect(() => {
    if (updatedSeaches != null) {
      setSearchDying(true);
      setSearches(updatedSeaches);
    }
  }, [updatedSeaches]);

  useEffect(() => {
    if (cancelledSearches != null) {
      setSearchDying(true);
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
        mobile
      />
      <div className="searchCardBodyMobile">
        <h1 className="searchTitleMobile">{search.courseName}</h1>
        <div className="bottomHalfCardBodyMobile">
          <div className="searchCardParametersMobile">
            <div className="labelSearchInfoMobile">
              <p>
                <FaCalendar className="labelIcon" />{' '}
                {expandDate({ date: search.date, dayOfWeek: true })}
              </p>
            </div>
            <div className="labelSearchInfoMobile">
              <p>
                <FaClock className="labelIcon" /> {convertTo12Hour(search.start)}-
                {convertTo12Hour(search.end)}
              </p>
            </div>
            <div className="labelSearchInfoMobile">
              <p>
                <MdPerson style={{ margin: '0' }} /> {search.players}
              </p>
            </div>
          </div>
          <div className="searchActionsContainer">
            <div className="">
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

export default MobileSearchCard;

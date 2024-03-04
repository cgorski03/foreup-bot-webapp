import React, { useState, useContext } from 'react';
import './searchTable.css';
import { IoMdRefresh } from 'react-icons/io';
// @ts-ignore
import SearchCard from './SearchCard/SearchCard';
import { NoSearchesFound } from '../error/HandleFetchErrors';
import { GolfCourseCollection, UserSearchInfo } from '../../utils/api/types';
import { DashboardContext } from '../../Contexts/DashboardContext';

type FilterSearchesButtonProps = {
  buttonTitle: string;
  onButtonCick: (buttonTitle: string) => void;
  activeFilter: string;
};
type SearchesTableProps = {
  searches: UserSearchInfo[] | null;
  courses: GolfCourseCollection | null;
  loading: boolean;
};

function FilterSearchesButton(props: FilterSearchesButtonProps) {
  const { buttonTitle, onButtonCick, activeFilter } = props;
  return (
    <button
      type="submit"
      className={
        activeFilter === buttonTitle ? 'filterButtonActive' : 'filterButtonInactive'
      }
      onClick={() => onButtonCick(buttonTitle)}
    >
      {buttonTitle}
    </button>
  );
}
function SearchesTable(props: SearchesTableProps) {
  const { refreshSearches } = useContext(DashboardContext);
  const { searches, courses, loading } = props;
  const [searchFilter, setSearchFilter] = useState<string>('All');

  const handleFilterButtonClick = (buttonName: string) => {
    setSearchFilter(buttonName);
  };
  const renderSearchCards = () => {
    const searchFilterParsing = (searchActive: Boolean) => {
      switch (searchFilter) {
        case 'Active':
          return searchActive;
        case 'Inactive':
          return !searchActive;
        default:
          return true;
      }
    };
    // TS will throw an error if its null even though that will never happen
    if (courses && searches) {
      return searches.map(
        (search) =>
          searchFilterParsing(search.active) && (
            <SearchCard
              key={search.ID}
              search={search}
              image={courses[search.course_id].image}
            />
          ),
      );
    }
    return null;
  };
  if (loading && searches == null) {
    return (
      <div className="searchTableContainer">
        <div className="searchTableHeader">
          <button
            className="refreshSearchesButton"
            type="button"
            aria-label="Refresh searches"
            onClick={refreshSearches}
          >
            <IoMdRefresh />
          </button>
          <FilterSearchesButton
            onButtonCick={handleFilterButtonClick}
            buttonTitle="Active"
            activeFilter={searchFilter}
          />
        </div>
        <hr className="headerDividerLine" />
      </div>
    );
  }
  return (
    <div className="searchTableContainer">
      <div className="searchTableHeader">
        <button
          className="refreshSearchesButton"
          type="button"
          aria-label="Refresh searches"
          onClick={refreshSearches}
        >
          <IoMdRefresh />
        </button>
        <div>
          <FilterSearchesButton
            onButtonCick={handleFilterButtonClick}
            buttonTitle="All"
            activeFilter={searchFilter}
          />
          <FilterSearchesButton
            onButtonCick={handleFilterButtonClick}
            buttonTitle="Active"
            activeFilter={searchFilter}
          />
          <FilterSearchesButton
            onButtonCick={handleFilterButtonClick}
            buttonTitle="Inactive"
            activeFilter={searchFilter}
          />
        </div>
      </div>
      <hr className="headerDividerLine" />
      {searches && courses ? renderSearchCards() : <NoSearchesFound />}
    </div>
  );
}
export default SearchesTable;

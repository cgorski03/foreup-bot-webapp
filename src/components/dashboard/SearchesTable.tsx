import React, { useState, useContext } from 'react';
import './searchTable.css';
import { IoMdRefresh } from 'react-icons/io';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
// import SearchCard from './SearchCard/SearchCard';
import { NoSearchesFound } from '../error/HandleFetchErrors';
import { GolfCourseCollection, UserSearchInfo } from '../../utils/api/types';
import { DashboardContext } from '../../Contexts/DashboardContext';
import MobileSearchCard from './SearchCard/MobileSearchCard';
import useMediaQuery from '../../utils/hooks/useMediaQuery';
import SearchCard from './SearchCard/SearchCard';

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
  const [searchStartIndex, setSearchStartIndex] = useState<number>(0);
  const isMobile = useMediaQuery('(max-width: 768px)');
  let filteredSearches: UserSearchInfo[] = [];

  const handleFilterButtonClick = (buttonName: string) => {
    setSearchFilter(buttonName);
  };

  const handlePageButtonClick = (direction: string) => {
    // If there are no more searches to render on the next page, do nothing
    // Handle the next and previous page buttons
    if (direction === 'next') {
      if (searchStartIndex + 5 >= filteredSearches.length) return;
      setSearchStartIndex(searchStartIndex + 5);
    } else {
      if (searchStartIndex - 5 < 0) return;
      setSearchStartIndex(searchStartIndex - 5);
    }
  };
  const renderLoadingCards = (amount: number) => {
    const loadingCards = [];
    for (let i = 0; i < amount; i += 1) {
      loadingCards.push(
        <div className="searchTableLoading">
          <div className="searchCardHeader">
            <div className="skeleton-text skeleton-text-title" />
          </div>
          <div className="searchCardBody">
            <div className="loadingBodyItems">
              <div className="skeleton-image" />
              <div className="skeleton-text" />
              <div className="skeleton-text" />
              <div className="skeleton-text" />
              <div className="skeleton-text" />
            </div>
          </div>
        </div>,
      );
    }
    return loadingCards;
  };
  const renderSearchCards = (startIndex: number) => {
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
      // First, filter the searches based on the active filter
      filteredSearches = searches.filter((search) => searchFilterParsing(search.active));
      // Then, slice the array to only show 5 searches at a time
      return filteredSearches.slice(startIndex, startIndex + 5).map(
        (search) =>
          searchFilterParsing(search.active) &&
          (isMobile ? (
            <MobileSearchCard
              key={search.ID}
              search={search}
            />
          ) : (
            <SearchCard
              key={search.ID}
              search={search}
              image={courses[search.course_id].image}
            />
          )),
      );
    }
    return null;
  };
  if (loading) {
    return (
      <div className="searchTableContainer">
        <div className="searchTableHeader">
          <button
            className="dashboardHeaderButton"
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
        {renderLoadingCards(5)}
      </div>
    );
  }
  return (
    <div className="searchTableContainer">
      <div className="searchTableHeader">
        {/* Refresh Button */}
        <button
          className="dashboardHeaderButton"
          type="button"
          aria-label="Refresh searches"
          onClick={refreshSearches}
        >
          <IoMdRefresh />
        </button>
        <div className="searchFilterButtonContainer">
          {/* These are search filter icons */}
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
        <div className="navigationButtonContainer">
          {/* Back and next buttons */}
          <button
            className="dashboardHeaderButton"
            type="button"
            aria-label="Previous Page"
            onClick={() => handlePageButtonClick('previous')}
          >
            <MdNavigateBefore />
          </button>
          <p className="dashboardHeaderButton">{(searchStartIndex + 1) % 4}</p>
          <button
            className="dashboardHeaderButton"
            type="button"
            aria-label="Next Page"
            onClick={() => handlePageButtonClick('next')}
          >
            <MdNavigateNext />
          </button>
        </div>
      </div>
      <hr className="headerDividerLine" />
      {searches && courses && searches.length ? (
        renderSearchCards(searchStartIndex)
      ) : (
        <NoSearchesFound />
      )}
    </div>
  );
}
export default SearchesTable;

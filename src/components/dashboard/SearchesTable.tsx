import React, { useEffect, useState } from 'react';
import './searchTable.css';
import { IoMdRefresh } from 'react-icons/io';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { useGetSearches, useGetCourses } from '../../utils/api/requests';
// @ts-ignore
import SearchCard from './SearchCard/SearchCard';
import HandleAuthApiErrors from '../error/HandleAuthApiErrors';

type FilterSearchesButtonProps = {
  buttonTitle: string;
  onButtonCick: (buttonTitle: string) => void;
  activeFilter: string;
};
function NoSearchesFound() {
  return (
    <div className="noSearchesFoundContainer">
      <FaMagnifyingGlass className="noSearchesFoundIcon" />
      <h1>No searches found</h1>
      <p>It looks like you don&apos;t have any searches. Create one on the search page!</p>
    </div>
  );
}

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
function SearchesTable() {
  const { getSearches, forceSearches, searchesLoading, searches, responseCode } =
    useGetSearches();
  const { getCourses, coursesLoading, courses } = useGetCourses();
  const [searchFilter, setSearchFilter] = useState<string>('All');

  useEffect(() => {
    getCourses();
    getSearches();
  }, []);
  const handleSearchRefresh = () => {
    forceSearches();
  };
  const handleFilterButtonClick = (buttonName: string) => {
    setSearchFilter(buttonName);
  };
  const renderSearchCards = () => {
    // TODO: Lift this logic into the page element
    if (!searches || !courses) {
      return <h1>Error Loading Searches</h1>;
    }
    if (responseCode !== 200) {
      return <HandleAuthApiErrors responseCode={responseCode} />;
    }
    if (!searches.length) {
      // There are no searches for the user. Display stay search message
      return <NoSearchesFound />;
    }
    const searchFilterParsing = (searchActive: Boolean) => {
      console.log(searchFilter + searchActive);
      switch (searchFilter) {
        case 'Active':
          return searchActive;
        case 'Inactive':
          return !searchActive;
        default:
          return true;
      }
    };
    return searches.map(
      (search) =>
        searchFilterParsing(search.active) && (
          <SearchCard
            key={search.ID}
            search={search}
            image={courses[search.course_id].image}
            refreshSearches={handleSearchRefresh}
            refreshLoading={searchesLoading}
          />
        ),
    );
  };
  if ((searchesLoading || coursesLoading) && searches == null) {
    return (
      <div className="searchTableContainer">
        <div className="searchTableHeader">
          <button
            className="refreshSearchesButton"
            type="button"
            aria-label="Refresh searches"
            onClick={handleSearchRefresh}
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
          onClick={handleSearchRefresh}
        >
          <IoMdRefresh />
        </button>
        <div>
          <FilterSearchesButton
            onButtonCick={handleFilterButtonClick}
            buttonTitle="Active"
            activeFilter={searchFilter}
          />
        </div>
      </div>
      <hr className="headerDividerLine" />
      {renderSearchCards()}
    </div>
  );
}
export default SearchesTable;

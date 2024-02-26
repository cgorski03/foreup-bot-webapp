import React, { useEffect } from 'react';
import './searchTable.css';
import { IoMdRefresh } from 'react-icons/io';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { useGetSearches, useGetCourses } from '../../utils/api/requests';
// @ts-ignore
import SearchCard from './SearchCard/SearchCard';
import FullscreenErrorMessage from '../error/FullscreenErrorMessage';

function NoSearchesFound() {
  return (
    <div className="noSearchesFoundContainer">
      <FaMagnifyingGlass className="noSearchesFoundIcon" />
      <h1>No searches found</h1>
      <p>It looks like you don&apos;t have any searches. Create one on the search page!</p>
    </div>
  );
}
function SearchesTable() {
  const { getSearches, forceSearches, searchesLoading, searches, responseCode } = useGetSearches();
  const { getCourses, coursesLoading, courses } = useGetCourses();

  useEffect(() => {
    getCourses();
    getSearches();
  }, []);
  const handleSearchRefresh = () => {
    forceSearches();
  };
  const renderSearchCards = () => {
    if (!searches || !courses) {
      return <h1>Error Loading Searches</h1>;
    }
    if (responseCode === 402) {
      // User's token has expired
      return <FullscreenErrorMessage msg="Your session has timed out." />;
    }
    if (!searches.length) {
      // There are no searches for the user. Display stay search message
      return <NoSearchesFound />;
    }
    return searches.map((search) => (
      <SearchCard
        key={search.ID}
        search={search}
        image={courses[search.course_id].image}
        refreshSearches={handleSearchRefresh}
        refreshLoading={searchesLoading}
      />
    ));
  };
  if ((searchesLoading || coursesLoading) && searches == null) {
    return (
      <div className="searchTableContainer">
        <div className="searchTableHeader">
          <button
            type="button"
            aria-label="Refresh searches"
            onClick={handleSearchRefresh}
          >
            <IoMdRefresh />
          </button>
        </div>
        <hr className="headerDividerLine" />
      </div>
    );
  }
  return (
    <div className="searchTableContainer">
      <div className="searchTableHeader">
        <button
          type="button"
          aria-label="Refresh searches"
          onClick={handleSearchRefresh}
        >
          <IoMdRefresh />
        </button>
      </div>
      <hr className="headerDividerLine" />
      {renderSearchCards()}
    </div>
  );
}
export default SearchesTable;

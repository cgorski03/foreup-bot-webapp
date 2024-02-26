import React, { useEffect } from 'react';
import './searchTable.css';
import { IoMdRefresh } from 'react-icons/io';
import { useGetSearches, useGetCourses } from '../../utils/api/requests';
// @ts-ignore
import SearchCard from './SearchCard/SearchCard';

function SearchesTable() {
  const { getSearches, forceSearches, searchesLoading, searches } = useGetSearches();
  const { getCourses, coursesLoading, courses } = useGetCourses();
  // const [filter, setFilter] = useState<string>('active');

  useEffect(() => {
    getCourses();
    getSearches();
  }, []);
  const handleSearchRefresh = () => {
    forceSearches();
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
      {searches && courses ? (
        searches.map((search) => (
          <SearchCard
            key={search.ID}
            search={search}
            image={courses[search.course_id].image}
            refreshSearches={handleSearchRefresh}
            refreshLoading={searchesLoading}
          />
        ))
      ) : (
        <h1>Error Loading </h1>
      )}
    </div>
  );
}
export default SearchesTable;

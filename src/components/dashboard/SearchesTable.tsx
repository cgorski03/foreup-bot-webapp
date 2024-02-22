import React, { useEffect } from 'react';
import './searchTable.css';
import { useGetSearches, useGetCourses } from '../../utils/api/requests';
// @ts-ignore
import { ReactComponent as Loader } from '../login/inputFields/loader.svg';
import SearchCard from './SearchCard/SearchCard';

function SearchesTable() {
  const { getSearches, searchesLoading, searches } = useGetSearches();
  const { getCourses, coursesLoading, courses } = useGetCourses();

  useEffect(() => {
    getCourses();
    getSearches();
  }, []);

  if (searchesLoading || coursesLoading) {
    return (
      <div>
        <Loader className="spinner" />
      </div>
    );
  }
  return (
    <div className="searchTableContainer">
      {searches && courses ? (
        searches.map((search) => (
          <SearchCard
            key={search.course_id}
            search={search}
            image={courses[search.course_id].image}
          />
        ))
      ) : (
        <h1>Error Loading </h1>
      )}
    </div>
  );
}
export default SearchesTable;

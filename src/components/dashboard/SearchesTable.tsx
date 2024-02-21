import React from 'react';
import './searchTable.css';
import { useGetSearches, useGetCourses } from '../../utils/api/requests';
// @ts-ignore
import { ReactComponent as Loader } from '../login/inputFields/loader.svg';

function SearchesTable() {
  // Mock logic, will be an API call
  const { getSearches, searchesLoading, searches } = useGetSearches();
  const { courses } = useGetCourses();
  const renderSearchCards = (): JSX.Element => {
    console.log(courses);
    return <div>dfkslj</div>;
  };

  if (searchesLoading) {
    return (
      <div>
        <Loader className="spinner" />
      </div>
    );
  }
  return (
    <div className="searchTableContainer">
      {searches ? renderSearchCards() : (getSearches(), [])}
    </div>
  );
}
export default SearchesTable;

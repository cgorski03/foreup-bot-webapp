import React from 'react';
import './searchTable.css';
import SearchCard from './SearchCard/SearchCard';
import { useGetSearches } from '../../utils/api/requests';
// @ts-ignore
import { ReactComponent as Loader } from '../login/inputFields/loader.svg';

function SearchesTable() {
  // Mock logic, will be an API call
  const { getSearches, isLoading, data } = useGetSearches();

  if (isLoading) {
    return (
      <div>
        <Loader className="spinner" />
      </div>
    );
  }
  return (
    <div className="searchTableContainer">
      {data
        ? data.map((search) => <SearchCard search={search} />)
        : (getSearches(), [])}
    </div>
  );
}
export default SearchesTable;

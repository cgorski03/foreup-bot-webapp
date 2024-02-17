import React from 'react';
import { UserSearchInfo } from '../../utils/api/types';
import './searchTable.css';
import { SearchCard } from './SearchCard/SearchCard';
export const SearchesList = () => {
  //Mock logic, will be an API call
  const searches: UserSearchInfo[] = [
    {
      active: true,
      search_id: '1707440738566',
      courseName: 'H. Smith Richardson Golf Course',
      date: '2024-02-10',
      players: 4,
      startTime: '08:00',
      endTime: '22:00',
      searchInitiated: '2024-02-03T23:52:00',
      lastSearchCheck: '2024-02-17T13:28:00',
    },
  ];

  return (
    <div className="searchTableContainer">
      {searches.map((search) => (
        <SearchCard search={search} />
      ))}
    </div>
  );
};

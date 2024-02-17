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
      date: '2022-01-01',
      players: 4,
      startTime: '8:00 AM',
      endTime: '10:00 PM',
      searchInitiated: '2024-02-03T23:52:00',
      lastSearchCheck: '2024-02-09T10:52:00',
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

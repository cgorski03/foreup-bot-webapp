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
      startTime: '08:00',
      endTime: '10:00',
      runTime: 'February 16th, 2:54 PM',
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

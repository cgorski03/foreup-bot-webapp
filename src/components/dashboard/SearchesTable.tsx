import React from "react";
import { UserSearchInfo } from "../../utils/api/types";
import "./searchTable.css";
import { SearchTableLabel } from "./SearchTableLabel/SearchTableLabel";
export const SearchesTable = () => {
  //Mock logic, will be an API call
  const searches: UserSearchInfo[] = [
    {
      active: true,
      search_id: 1,
      courseName: "H. Smith Richardson",
      date: "2022-01-01",
      players: 4,
      startTime: "08:00",
      endTime: "10:00",
      runTime: "10h",
    },
    {
      active: false,
      search_id: 12,
      courseName: "Bethpage Black Golf Course",
      date: "2022-01-01",
      players: 4,
      startTime: "08:00",
      endTime: "10:00",
      runTime: "13h",
    },
  ];

  return (
    <div className="searchTableContainer">
      <table className="searchTable">
        <thead>
          <tr>
            <th></th>
            <th>Course Name</th>
            <th>Date</th>
            <th>Players</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Run Time</th>
          </tr>
        </thead>
        <tbody>
          {searches.map((search) => (
            <SearchTableLabel search={search} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

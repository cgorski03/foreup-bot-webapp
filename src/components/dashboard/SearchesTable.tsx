import React from "react";
import "./searchTable.css";
export const SearchesTable = () => {
  //Mock logic, will be an API call
  const searches = [
    {
      id: 1,
      courseName: "H. Smith Richardson",
      date: "2022-01-01",
      players: 4,
      startTime: "08:00",
      endTime: "10:00",
    },
  ];

  return (
    <div className="searchTableContainer">
      <h2 className="searchTableTitle">Search Dashboard</h2>
      <table className="searchTable">
        <thead>
          <tr>
            <th>ID</th>
            <th>Course Name</th>
            <th>Date</th>
            <th>Players</th>
            <th>Start Time</th>
            <th>End Time</th>
          </tr>
        </thead>
        <tbody>
          {searches.map((search) => (
            <tr key={search.id}>
              <td>{search.id}</td>
              <td>{search.courseName}</td>
              <td>{search.date}</td>
              <td>{search.players}</td>
              <td>{search.startTime}</td>
              <td>{search.endTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

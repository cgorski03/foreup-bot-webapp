import React from "react";
import "./searchTableLabel.css";
import { UserSearchInfo } from "../../../utils/api/types";

type SearchTableLabelProps = {
  search: UserSearchInfo;
};
export const SearchTableLabel = ({ search }: SearchTableLabelProps) => {
  return (
    <tr className="teeTimeSearch" key={search.search_id}>
      <td>
        <div
          className={`searchIndicator ${
            search.active ? "activeSearch" : "inactiveSearch"
          }`}></div>
      </td>
      <td>{search.courseName}</td>
      <td>{search.date}</td>
      <td>{search.players}</td>
      <td>{search.startTime}</td>
      <td>{search.endTime}</td>
      <td>{search.runTime}</td>
    </tr>
  );
};

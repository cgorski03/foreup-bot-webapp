import React from "react";
import { UserSearchInfo } from "../../../utils/api/types";

type SearchTableLabelProps = {
  search: UserSearchInfo;
};
export const SearchTableLabel = ({ search }: SearchTableLabelProps) => {
  return (
    <tr key={search.search_id}>
      <td>{search.active}</td>
      <td>{search.courseName}</td>
      <td>{search.date}</td>
      <td>{search.players}</td>
      <td>{search.startTime}</td>
      <td>{search.endTime}</td>
      <td>{search.runTime}</td>
    </tr>
  );
};

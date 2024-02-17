import React from 'react';
import {
  expandDate,
  getElapsedTime,
} from '../../../../utils/dateExpansion/datetimeFunctions';
import '../searchTableLabel.css';
type SearchHeaderProps = {
  active: boolean;
  lastSearchCheck: string;
  searchInitiated: string;
  search_id: string;
};
export const SearchCardHeader = (props: SearchHeaderProps) => {
  const { active, lastSearchCheck, searchInitiated, search_id } = props;
  return (
    <div className="searchCardHeader">
      <div className="headerLabelContainer">
        <p>{active ? 'LAST ACTIVE' : 'SEARCH CONCLUDED'}</p>
        <p>
          <span className="activeDot" />
          {active
            ? getElapsedTime(lastSearchCheck)
            : expandDate({ date: lastSearchCheck, time: true })}
        </p>
      </div>
      <div className="headerRightJustified">
        <div className="headerLabelContainer">
          <p>SEARCH INITIATED</p>
          <p>{expandDate({ date: searchInitiated, time: true })}</p>
        </div>
        <div className="headerLabelContainer">
          <p>ID #</p>
          <p>{search_id}</p>
        </div>
      </div>
    </div>
  );
};

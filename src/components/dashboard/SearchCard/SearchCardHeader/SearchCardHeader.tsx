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
  searchId: string;
};

export function SearchCardHeader(props: SearchHeaderProps) {
  const { active, lastSearchCheck, searchInitiated, searchId } = props;
  return (
    <div className="searchCardHeader">
      <div className="headerLabelContainer">
        <p>{active ? 'LAST ACTIVE' : 'SEARCH CONCLUDED'}</p>
        <p>
          {/* ensures a red dot for an inactive search */}
          <span className={`activeDot ${active ? '' : 'inactiveSearch'}`} />
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
          <p>{searchId}</p>
        </div>
      </div>
    </div>
  );
}

export default SearchCardHeader;

import React from 'react';
import './searchTableLabel.css';
import { UserSearchInfo } from '../../../utils/api/types';

type SearchCardProps = {
  search: UserSearchInfo;
};
export const SearchCard = ({ search }: SearchCardProps) => {
  return (
    <div className="searchCardContainer">
      <div className="searchCardHeader">
        <h1 className="searchTitle">{search.courseName}</h1>
        <div className="headerDetailsContainer">
          <div className="headerLabelContainer">
            <p>SEARCH INITIATED</p>
            <p>{search.runTime}</p>
          </div>
          <div className="headerLabelContainer">
            <p>ID #</p>
            <p>{search.search_id}</p>
          </div>
        </div>
      </div>
      <div className="searchCardBody">
        <img
          src="https://golf-pass.brightspotcdn.com/84/d7/100e740f29027022c74a55eeb9f1/75692.jpg"
          className="golfCourseImagePreview"
        />
      </div>
    </div>
  );
};

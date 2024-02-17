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
        <div className="headerLabelContainer">
          <p>LAST ACTIVE</p>
          <p>
            <span className="activeDot" />2 minutes ago
          </p>
        </div>
        <div className="headerRightJustified">
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
        <div className="imageTitleContainer">
          <h1 className="searchTitle">{search.courseName}</h1>
          <img
            alt="decorative image of the golf course"
            src="https://golf-pass.brightspotcdn.com/84/d7/100e740f29027022c74a55eeb9f1/75692.jpg"
            className="golfCourseImagePreview"
          />
        </div>
        <div className="searchCardParameters">
          <div className="headerLabelContainer">
            <p>DATE</p>
            <p>{search.date}</p>
          </div>
          <div className="headerLabelContainer">
            <p>TIME RANGE</p>
            <p>
              {search.startTime} - {search.endTime}
            </p>
          </div>
          <div className="headerLabelContainer">
            <p>PLAYERS</p>
            <p>{search.players}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

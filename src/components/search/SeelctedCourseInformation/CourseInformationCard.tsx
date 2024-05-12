import React from 'react';
import { GolfCourse } from '../../../utils/api/types';
import './selectedCourseInformation.css';

type CourseInformationCardProps = {
  isSelected: boolean;
  displayedCourse: GolfCourse | null;
};

export default function CourseInformationCard(props: CourseInformationCardProps) {
  const { isSelected, displayedCourse } = props;
  // If we have not loaded the courses yet, we want to return the placeholder object
  if (displayedCourse === null) {
    return <div className="courseInformationCardContainer" />;
  }
  return (
    <div
      className={`courseInformationCardContainer ${isSelected ? 'selectedCourseContainer' : 'notSelectedCourseContainer'}`}
    >
      <div className="course-details">
        <h2>{displayedCourse?.courseName}</h2>
        <p className="course-location">{displayedCourse?.courseLocation}</p>
        <p className="course-stats">
          Length: 7000yds | Par: 71 | Rating: 72.1 | Slope: 130
        </p>
      </div>
      <div className="course-image-container">
        <img
          src={displayedCourse?.image}
          alt={displayedCourse?.courseName}
        />
      </div>
    </div>
  );
}

import React from 'react';
import { GolfCourse } from '../../../utils/api/types';
import './selectedCourseInformation.css';

type CourseInformationCardProps = {
  isSelected: boolean;
  displayedCourse: GolfCourse | null;
  setSelectedCourse: (course: GolfCourse | null) => void;
};

function CourseInformationCardSkeleton() {
  return (
    <div className="courseInformationCardContainer">
      <div className="course-details">
        <div className="skeleton-text skeleton-text-title" />
        <div className="skeleton-text skeleton-text-subtitle" />
        <div className="skeleton-text skeleton-text-stats" />
      </div>
      <div className="course-image-container">
        <div className="skeleton-image" />
      </div>
    </div>
  );
}

function CourseInformationCard(props: CourseInformationCardProps) {
  const { isSelected, displayedCourse, setSelectedCourse } = props;
  // If we have not loaded the courses yet, we want to return the placeholder object
  if (displayedCourse === null) {
    return <CourseInformationCardSkeleton />;
  }
  return (
    <button
      className="noStyleButtonWrapper"
      type="submit"
      onClick={() => setSelectedCourse(displayedCourse)}
    >
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
    </button>
  );
}

export default CourseInformationCard;

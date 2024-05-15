import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { GolfCourse } from '../../../utils/api/types';
import './selectedCourseInformation.css';

type CourseInformationCardProps = {
  isSelected: boolean;
  displayedCourse: GolfCourse | null;
  courseSearches: number;
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
  const { isSelected, displayedCourse, setSelectedCourse, courseSearches } = props;
  // If we have not loaded the courses yet, we want to return the placeholder object
  if (displayedCourse === null) {
    return <CourseInformationCardSkeleton />;
  }
  const handleSelectCourse = () => {
    // TODO Add something to nullify when yoiu select the course that is already selected
    setSelectedCourse(displayedCourse);
  };
  return (
    <button
      className="noStyleButtonWrapper"
      type="submit"
      onClick={handleSelectCourse}
    >
      <div
        className={`courseInformationCardContainer ${isSelected ? 'selectedCourseContainer' : 'notSelectedCourseContainer'}`}
      >
        <div className="course-details">
          <h2>{displayedCourse?.courseName}</h2>
          <p className="course-location">{displayedCourse?.courseLocation}</p>
          <div>
            <div className="course-stats-container">
              <div className="stat-row">
                <div className="stat-value">{displayedCourse?.par}</div>
                <div className="stat-label">PAR</div>
              </div>
              <div className="stat-row">
                <div className="stat-value">{displayedCourse?.yardage}</div>
                <div className="stat-label">YARDS</div>
              </div>
              <div className="stat-row">
                <div className="stat-value">{displayedCourse?.rating}</div>
                <div className="stat-label">RATING</div>
              </div>
              <div className="stat-row">
                <div className="stat-value">{displayedCourse?.slope}</div>
                <div className="stat-label">SLOPE</div>
              </div>
            </div>
            <div className="searches-container">
              <FaSearch className="searchIcon" />
              <span className="searches-label">
                <span style={{ fontWeight: 'bold' }}>{courseSearches} </span> search
                {courseSearches !== 1 && 'es'} here
              </span>
            </div>
          </div>
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
